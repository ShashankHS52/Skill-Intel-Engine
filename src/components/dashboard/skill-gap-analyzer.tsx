'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Download, Lightbulb, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
import { analyzeSkillGaps } from '@/app/actions/analyze-skill-gaps';
import type { SkillGapOutput } from '@/ai/flows/skill-gap-analyzer';
import { Skeleton } from '../ui/skeleton';
import { karnatakaDistrictData } from '@/lib/karnataka-data';

const formSchema = z.object({
  sector: z.string().min(2, { message: 'Sector is required.' }),
  region: z.string().min(2, { message: 'District is required.' }),
  proficiencyLevel: z.string().min(2, { message: 'Proficiency is required.' }),
  specificConsiderations: z.string().optional(),
});

// Get sorted district list
const districtOptions = Object.values(karnatakaDistrictData)
  .map(district => ({ id: district.id, name: district.name }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function SkillGapAnalyzer() {
  const [result, setResult] = useState<SkillGapOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: 'Technology',
      region: 'Mandya',
      proficiencyLevel: 'Mid-level',
      specificConsiderations: 'Focus on AI and ML skills shortage in the fintech sub-sector.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await analyzeSkillGaps(values);
      setResult(response);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error analyzing skill gaps:', error);
    } finally {
      setLoading(false);
    }
  }
  
  const handleDownload = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'skill-gap-analysis.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a district" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {districtOptions.map((district) => (
                      <SelectItem key={district.id} value={district.name}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proficiencyLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proficiency Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Entry-level">Entry-level</SelectItem>
                    <SelectItem value="Mid-level">Mid-level</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specificConsiderations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Considerations</FormLabel>
                <FormControl>
                  <Input placeholder="Optional: e.g., focus on AI skills" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Skill Gaps
          </Button>
        </form>
      </Form>

      {loading && (
        <div className="space-y-4 mt-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Skill Gap Analysis Result</DialogTitle>
          </DialogHeader>
          {result && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
              <div>
                <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="h-5 w-5 text-primary" /> Summary</h3>
                <p className="text-sm text-foreground mt-2 pl-7">{result.analysisSummary}</p>
              </div>
              <div>
                <h3 className="font-semibold">Policy Recommendations</h3>
                <ul className="mt-2 space-y-2 text-sm text-foreground">
                  {result.policyRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{rec}</span>
                    </li>
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
    </div>
  );
}
