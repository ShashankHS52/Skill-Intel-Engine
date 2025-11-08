
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  Loader2,
  Download,
  Sparkles,
  CheckCircle,
  Lightbulb,
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
import { jobSectorPrediction, JobSectorPredictionOutput } from '@/app/actions/job-sector-prediction';



const formSchema = z.object({
  industry: z.string().min(2, { message: 'Industry is required.' }),
  timeHorizon: z.string().min(2, { message: 'Time horizon is required.' }),
});


export default function JobSectorPredictionPage() {
  const [analysisResult, setAnalysisResult] = useState<JobSectorPredictionOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: 'All',
      timeHorizon: 'Long-term',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAnalysisResult(null);
    try {
      const result = await jobSectorPrediction(values);
      setAnalysisResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error predicting job sectors:", error);
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
      a.download = 'job-sector-prediction.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="font-semibold text-xl md:text-2xl">Job Sector Prediction</h1>
          <p className="text-sm text-muted-foreground">Use AI to predict emerging job sectors and required skills.</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Predict Future Job Sectors</CardTitle>
          <CardDescription>Select an industry and time horizon to get AI-powered predictions on emerging job sectors and skills.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="All">All Industries</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
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
                {loading ? 'Predicting...' : 'Predict Now'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-7 w-7 text-primary" />
              Job Sector Prediction Analysis
            </DialogTitle>
          </DialogHeader>
          {analysisResult && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1 pr-4">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-primary" /> Emerging Job Sectors
                </h3>
                <div className="flex flex-wrap gap-2 pl-7">
                  {analysisResult.emergingSectors.map((sector, index) => (
                    <span key={index} className="text-sm bg-primary/10 text-primary-foreground/80 px-3 py-1 rounded-full">{sector}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-primary" /> In-Demand Skills
                </h3>
                <div className="flex flex-wrap gap-2 pl-7">
                  {analysisResult.inDemandSkills.map((skill, index) => (
                    <span key={index} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-primary" /> Preparedness Recommendations
                </h3>
                <ul className="list-disc pl-12 space-y-1 text-sm text-foreground">
                  {analysisResult.preparednessRecommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  );
}
