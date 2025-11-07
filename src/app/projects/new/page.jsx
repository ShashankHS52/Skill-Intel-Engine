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
  MapPin,
  Users,
  CircleDollarSign,
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
import { analyzeProject } from '@/app/actions/project-analyzer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

const upcomingProjects = [
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
                    <SidebarMenuSubButton isActive>
                      <Briefcase className="mr-2" />
                      New Projects
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    <FileText className="mr-2" />
                    Tender
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    <Lightbulb className="mr-2" />
                    New Schemes
                  </SidebarMenuSubButton>
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

export default function NewProjectsPage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingProjectId, setLoadingProjectId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnalyzeClick = async (project) => {
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
          </main>
        </SidebarInset>
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
      </div>
    </SidebarProvider>
  );
}
