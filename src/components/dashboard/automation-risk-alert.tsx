
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
import { Progress } from '@/components/ui/progress';
import { automationRiskAlert } from '@/app/actions/automation-risk-alert';
import type { AutomationRiskAlertOutput } from '@/ai/flows/automation-risk-alert';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  economicSector: z.string().min(2, { message: 'Sector is required.' }),
  regionalFactors: z.string().optional(),
  timeHorizon: z.string().min(2, { message: 'Time horizon is required.' }),
});

export default function AutomationRiskAlert() {
  const [result, setResult] = useState<AutomationRiskAlertOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      economicSector: 'IT Services',
      regionalFactors: 'Bangalore-Hyderabad corridor',
      timeHorizon: 'Long-term',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await automationRiskAlert(values);
      setResult(response);
    } catch (error) {
      console.error('Error analyzing automation risk:', error);
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
            name="economicSector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Economic Sector</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., IT Services" {...field} />
                </FormControl>
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
          <FormField
            control={form.control}
            name="regionalFactors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regional Factors</FormLabel>
                <FormControl>
                  <Input placeholder="Optional: e.g., Bangalore-Hyderabad corridor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assess Automation Risk
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
            <CardTitle>Risk Analysis Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <h3 className="font-semibold text-sm">Affected Population</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Progress value={result.affectedPopulationPercentage} className="w-full h-2 bg-accent" />
                    <span className="font-bold text-sm text-accent-foreground/80">{result.affectedPopulationPercentage}%</span>
                </div>
            </div>
            <div>
              <h3 className="font-semibold">Sectors at Risk</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {result.sectorsAtRisk.map((sector, index) => (
                  <span key={index} className="text-xs bg-destructive/10 text-destructive-foreground/80 px-2 py-1 rounded-full">{sector}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Skills at Risk</h3>
               <div className="flex flex-wrap gap-1 mt-1">
                {result.skillsAtRisk.map((skill, index) => (
                  <span key={index} className="text-xs bg-destructive/10 text-destructive-foreground/80 px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Mitigation Strategies</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                {result.mitigationStrategies.map((rec, index) => (
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
