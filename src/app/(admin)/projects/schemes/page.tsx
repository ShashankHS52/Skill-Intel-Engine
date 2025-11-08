
'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  Target,
  Users,
  Wrench,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateScheme } from '@/app/actions/scheme-generator';
import type { SchemeGeneratorOutput, SuggestedScheme } from '@/ai/flows/scheme-generator-types';
import { upcomingProjects } from '../new/page';
import { upcomingTenders } from '../tender/page';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';


export default function NewSchemesPage() {
  const [analysisResult, setAnalysisResult] = useState<SchemeGeneratorOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<SuggestedScheme | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    setAnalysisResult(null);
    try {
      const result = await generateScheme({
        projects: upcomingProjects.map(p => ({ name: p.name, description: p.description })),
        tenders: upcomingTenders.map(t => ({ name: t.name, description: t.description })),
      });
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error generating schemes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewScheme = (scheme: SuggestedScheme) => {
    setSelectedScheme(scheme);
    setIsDialogOpen(true);
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
          <h1 className="font-semibold text-xl md:text-2xl">AI-Powered Scheme Suggester</h1>
          <p className="text-sm text-muted-foreground">Get AI-driven suggestions for new upskilling schemes based on active projects and tenders.</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto text-center w-full">
        <CardHeader>
            <CardTitle>Generate New Scheme Suggestions</CardTitle>
            <CardDescription>
                Click the button below to have AI analyze all current projects and tenders to suggest new upskilling schemes.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handleGenerateClick} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Analyzing & Generating...' : 'Suggest Schemes with AI'}
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading && Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}

        {analysisResult && analysisResult.suggestedSchemes.map((scheme, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle className="flex items-start gap-2">
                  <span className="mt-1"><Sparkles className="h-5 w-5 text-primary" /></span>
                  {scheme.schemeName}
              </CardTitle>
              <CardDescription>{scheme.schemeDescription}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full" onClick={() => handleViewScheme(scheme)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  View Full Scheme
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-7 w-7 text-primary" />
              {selectedScheme?.schemeName}
            </DialogTitle>
          </DialogHeader>
          {selectedScheme && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1 pr-4">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <GraduationCap className="h-5 w-5 text-primary" /> Scheme Description
                  </h3>
                  <p className="text-sm text-foreground pl-7">{selectedScheme.schemeDescription}</p>
                </div>
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-primary" /> Objectives
                    </h3>
                    <ul className="list-disc pl-12 space-y-1 text-sm text-foreground">
                        {selectedScheme.objectives.map((objective, index) => (
                            <li key={index}>{objective}</li>
                        ))}
                    </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <Wrench className="h-5 w-5 text-primary" /> Predicted Skill Gaps
                  </h3>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {selectedScheme.predictedSkillGaps.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
                 <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-primary" /> Upskilling Strategy
                  </h3>
                  <p className="text-sm text-foreground pl-7">{selectedScheme.upskillingStrategy}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-primary" /> Target Beneficiaries
                  </h3>
                  <p className="text-sm text-foreground pl-7">{selectedScheme.targetBeneficiaries}</p>
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
