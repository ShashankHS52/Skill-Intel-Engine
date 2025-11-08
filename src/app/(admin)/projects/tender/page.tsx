
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  Users,
  Building,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeTender } from '@/app/actions/tender-analyzer';
import { TenderAnalyzerOutput } from '@/ai/flows/tender-analyzer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';


export const upcomingTenders = [
  {
    id: 'ten-001',
    name: 'Construction of Rural Roads under PMGSY',
    description: 'Tender for the construction and maintenance of all-weather rural roads in the state of Uttar Pradesh.',
    field: 'Construction',
    location: 'Uttar Pradesh',
  },
  {
    id: 'ten-002',
    name: 'IT Infrastructure Upgrade for Municipal Corporations',
    description: 'Supply, installation, and maintenance of IT hardware and networking solutions for municipal offices in Mandya.',
    field: 'IT & Networking',
    location: 'Mandya',
  },
  {
    id: 'ten-003',
    name: 'Healthcare Waste Management Services',
    description: 'A tender for the collection, transportation, treatment, and disposal of biomedical waste from government hospitals in Kerala.',
    field: 'Healthcare & Waste Management',
    location: 'Kerala',
  },
  {
    id: 'ten-004',
    name: 'Solar Power Plant Installation in Rajasthan',
    description: 'Tender for the setup of a 50 MW solar power plant, including land acquisition, installation, and commissioning.',
    field: 'Renewable Energy',
    location: 'Rajasthan',
  },
];



export default function TenderPage() {
  const [analysisResult, setAnalysisResult] = useState<TenderAnalyzerOutput | null>(null);
  const [loadingTenderId, setLoadingTenderId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnalyzeClick = async (tender: { id: string; field: string; location: string }) => {
    setLoadingTenderId(tender.id);
    setAnalysisResult(null);
    try {
      const result = await analyzeTender({
        tenderField: tender.field,
        location: tender.location,
      });
      setAnalysisResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error analyzing tender:", error);
    } finally {
      setLoadingTenderId(null);
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
        <h1 className="font-semibold text-xl md:text-2xl">Government Tenders</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingTenders.map(tender => (
          <Card key={tender.id}>
            <CardHeader>
              <CardTitle>{tender.name}</CardTitle>
              <CardDescription>{tender.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{tender.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleAnalyzeClick(tender)}
                disabled={loadingTenderId === tender.id}
              >
                {loadingTenderId === tender.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loadingTenderId === tender.id ? 'Analyzing...' : 'Use AI to Analyze'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
