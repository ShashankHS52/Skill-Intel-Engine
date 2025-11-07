
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeSkillGaps } from '@/app/actions/analyze-skill-gaps';
import type { SkillGapOutput } from '@/ai/flows/skill-gap-analyzer';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  sector: z.string().min(2, { message: 'Sector is required.' }),
  region: z.string().min(2, { message: 'Region is required.' }),
  proficiencyLevel: z.string().min(2, { message: 'Proficiency is required.' }),
  specificConsiderations: z.string().optional(),
});

export default function SkillGapAnalyzer() {
  const [result, setResult] = useState<SkillGapOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: 'Technology',
      region: 'Maharashtra',
      proficiencyLevel: 'Mid-level',
      specificConsiderations: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await analyzeSkillGaps(values);
      setResult(response);
    } catch (error) {
      console.error('Error analyzing skill gaps:', error);
    } finally {
      setLoading(false);
    }
  }

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
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Maharashtra" {...field} />
                </FormControl>
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
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-10 w-full mt-4" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Summary</h3>
              <p className="text-sm text-muted-foreground">{result.analysisSummary}</p>
            </div>
            <div>
              <h3 className="font-semibold">Policy Recommendations</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                {result.policyRecommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
