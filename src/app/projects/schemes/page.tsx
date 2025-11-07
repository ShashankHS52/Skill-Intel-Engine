'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Briefcase,
  ChevronDown,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Lightbulb,
  Search,
  Settings,
  BookCheck,
  Loader2,
  Sparkles,
  Target,
  Users,
  Wrench,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { generateScheme } from '@/app/actions/scheme-generator';
import type { SchemeGeneratorOutput, SuggestedScheme } from '@/ai/flows/scheme-generator-types';
import { upcomingProjects } from '../new/page';
import { upcomingTenders } from '../tender/page';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';


const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.219L19.531 8.5V15.5L12 19.781L4.469 15.5V8.5L12 4.219ZM12 9C10.343 9 9 10.343 9 12C9 13.657 10.343 15 12 15C13.657 15 15 13.657 15 12C15 10.343 13.657 9 12 9Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-sidebar-foreground">
            Skill Intel
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <Collapsible>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Projects" className="justify-between" isActive>
                  <div className="flex items-center gap-2">
                    <FolderKanban />
                    Projects
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent asChild>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <Link href="/projects/new">
                    <SidebarMenuSubButton>
                      <Briefcase className="mr-2" />
                      New Projects
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/projects/tender">
                    <SidebarMenuSubButton>
                      <FileText className="mr-2" />
                      Tender
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/projects/schemes">
                    <SidebarMenuSubButton isActive>
                      <Lightbulb className="mr-2" />
                      New Schemes
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Programs">
              <BookCheck />
              Programs
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer h-9 w-9">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center gap-4">
              <Link href="/">
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
                        <Lightbulb className="mr-2 h-4 w-4" />
                        View Full Scheme
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </SidebarInset>
        
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
      </div>
    </SidebarProvider>
  );
}
