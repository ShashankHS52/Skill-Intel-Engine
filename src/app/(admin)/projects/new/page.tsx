
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Users,
  CircleDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { analyzeProject } from '@/app/actions/project-analyzer';
import { ProjectAnalyzerOutput } from '@/ai/flows/project-analyzer';

export const upcomingProjects = [
  {
    id: 'proj-001',
    name: 'National Digital Health Mission',
    description: 'To develop the backbone necessary to support the integrated digital health infrastructure of the country.',
    agency: 'Ministry of Health and Family Welfare',
  },
  {
    id: 'proj-002',
    name: 'Smart Cities Mission 2.0',
    description: 'Expansion of the Smart Cities Mission to cover 100 new cities, focusing on sustainable and inclusive development.',
    agency: 'Ministry of Housing and Urban Affairs',
  },
  {
    id: 'proj-003',
    name: 'Gaganyaan Programme',
    description: 'An Indian crewed orbital spacecraft mission to demonstrate indigenous capability to undertake human space flight.',
    agency: 'Indian Space Research Organisation (ISRO)',
  },
  {
    id: 'proj-004',
    name: 'National River Linking Project',
    description: 'A large-scale engineering project to link Indian rivers by a network of reservoirs and canals to reduce floods and water shortage.',
    agency: 'Ministry of Jal Shakti',
  },
];

export default function NewProjectsPage() {
  const [analysisResult, setAnalysisResult] = useState<ProjectAnalyzerOutput | null>(null);
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnalyzeClick = async (project: { name: string; description: string; id: string }) => {
    setLoadingProjectId(project.id);
    setAnalysisResult(null);
    try {
      const result = await analyzeProject({
        projectName: project.name,
        projectDescription: project.description,
      });
      setAnalysisResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error analyzing project:", error);
    } finally {
      setLoadingProjectId(null);
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
        <h1 className="font-semibold text-xl md:text-2xl">Upcoming Government Projects</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {upcomingProjects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.agency}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleAnalyzeClick(project)}
                disabled={loadingProjectId === project.id}
              >
                {loadingProjectId === project.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loadingProjectId === project.id ? 'Analyzing...' : 'Use AI to Analyze'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Project Analysis</DialogTitle>
          </DialogHeader>
          {analysisResult && (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Best Region
                </h3>
                <p className="text-sm text-foreground mt-2 pl-7">{analysisResult.bestRegion}</p>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> Qualified Employees
                </h3>
                <ul className="list-disc pl-12 mt-2 space-y-1 text-sm text-foreground">
                  {analysisResult.qualifiedEmployees.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-primary" /> Cost Effectiveness
                </h3>
                <p className="text-sm text-foreground mt-2 pl-7">{analysisResult.costEffectiveness}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
