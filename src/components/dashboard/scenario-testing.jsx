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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { simulateEconomicImpact } from '@/app/actions/scenario-testing';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  factoryLocation: z.string().min(2, { message: 'Location is required.' }),
  laborTypesRequired: z.string().min(2, { message: 'Labor types are required.' }),
  additionalContext: z.string().optional(),
});

export default function ScenarioTesting() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      factoryLocation: 'Austin, Texas',
      laborTypesRequired: 'Semiconductor technicians, manufacturing engineers',
      additionalContext: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    setResult(null);
    try {
      const response = await simulateEconomicImpact(values);
      setResult(response);
    } catch (error) {
      console.error('Error simulating economic impact:', error);
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
            name="factoryLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Development Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Austin, Texas" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="laborTypesRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Labor Types Required</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Semiconductor technicians" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="additionalContext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Context</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional details about the scenario" {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simulate Impact
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
            <CardTitle>Scenario Simulation Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Projected Skill Demand Changes</h3>
              <p className="text-sm text-muted-foreground">{result.projectedSkillDemandChanges}</p>
            </div>
            <div>
              <h3 className="font-semibold">Policy Recommendations</h3>
              <p className="text-sm text-muted-foreground">{result.policyRecommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
