
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Download, TrendingUp, ShieldCheck } from 'lucide-react';

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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { simulateEconomicImpact } from '@/app/actions/scenario-testing';
import type { ScenarioTestingOutput } from '@/ai/flows/scenario-testing';
import { Skeleton } from '../ui/skeleton';

const formSchema = z.object({
  factoryLocation: z.string().min(2, { message: 'Location is required.' }),
  laborTypesRequired: z.string().min(2, { message: 'Labor types are required.' }),
  additionalContext: z.string().optional(),
});

export default function ScenarioTesting() {
  const [result, setResult] = useState<ScenarioTestingOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      factoryLocation: 'Pune, Maharashtra',
      laborTypesRequired: 'Automobile engineers, supply chain specialists, robotics technicians',
      additionalContext: 'A new electric vehicle (EV) manufacturing plant is being set up as part of the Make in India initiative.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const response = await simulateEconomicImpact(values);
      setResult(response);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error simulating economic impact:', error);
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
      a.download = 'scenario-testing-analysis.json';
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
            name="factoryLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Development Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Pune, Maharashtra" {...field} />
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
                  <Input placeholder="e.g., Automobile engineers" {...field} />
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
            <DialogTitle>Scenario Simulation Result</DialogTitle>
          </DialogHeader>
          {result && (
             <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
              <div>
                <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Projected Skill Demand Changes</h3>
                <p className="text-sm text-foreground mt-2 pl-7">{result.projectedSkillDemandChanges}</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Policy Recommendations</h3>
                <p className="text-sm text-foreground mt-2 pl-7">{result.policyRecommendations}</p>
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
