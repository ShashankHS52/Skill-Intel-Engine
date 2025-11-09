
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  Loader2,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { jobRiskAwareness, JobRiskAwarenessOutput } from '@/app/actions/job-risk-awareness';
import { Progress } from '@/components/ui/progress';



const formSchema = z.object({
  sector: z.string().min(2, { message: 'Sector is required.' }),
  timeHorizon: z.string().min(2, { message: 'Time horizon is required.' }),
});


export default function JobRiskAwarenessPage() {
  const [analysisResult, setAnalysisResult] = useState<JobRiskAwarenessOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: 'Retail',
      timeHorizon: 'Mid-term',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAnalysisResult(null);
    setError(null);
    try {
      const result = await jobRiskAwareness(values);
      setAnalysisResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error analyzing job risk:", error);
      setError("Failed to analyze job risk. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = () => {
    if (analysisResult) {
      const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'job-risk-analysis.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-xl md:text-2xl">Job Risk Awareness</h1>
          <p className="text-sm text-muted-foreground">Identify at-risk job sectors and get AI-powered mitigation strategies.</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Analyze Job Risk</CardTitle>
          <CardDescription>Select a sector and time horizon to analyze potential risks from automation and economic shifts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Economic Sector</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="IT Services">IT Services</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeHorizon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Horizon</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a horizon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Short-term">Short-term (1-3 years)</SelectItem>
                        <SelectItem value="Mid-term">Mid-term (3-5 years)</SelectItem>
                        <SelectItem value="Long-term">Long-term (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Analyzing...' : 'Analyze Job Risk'}
              </Button>
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Job Risk Analysis Results
            </DialogTitle>
          </DialogHeader>
          
          {analysisResult && (
            <div className="space-y-6">
              {/* Risk Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-red-500" />
                    Risk Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {analysisResult.riskSummary}
                  </p>
                </CardContent>
              </Card>

              {/* At-Risk Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    At-Risk Job Roles ({analysisResult.atRiskJobs?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {analysisResult.atRiskJobs?.length > 0 ? (
                      analysisResult.atRiskJobs.map((job, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg border border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                          <span className="text-sm">{job}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No at-risk jobs identified</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Mitigation Strategies */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    Mitigation Strategies ({analysisResult.mitigationStrategies?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {analysisResult.mitigationStrategies?.length > 0 ? (
                      analysisResult.mitigationStrategies.map((strategy, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                          <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">{strategy}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No mitigation strategies available</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleDownload} disabled={!analysisResult}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
