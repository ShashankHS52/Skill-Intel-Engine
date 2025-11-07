
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
  Users,
  Building,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
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
import { analyzeTender } from '@/app/actions/tender-analyzer';
import { TenderAnalyzerOutput } from '@/ai/flows/tender-analyzer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

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
    description: 'Supply, installation, and maintenance of IT hardware and networking solutions for municipal offices in Maharashtra.',
    field: 'IT & Networking',
    location: 'Maharashtra',
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
                    <SidebarMenuSubButton isActive>
                      <FileText className="mr-2" />
                      Tender
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/projects/schemes">
                    <SidebarMenuSubButton>
                      <Lightbulb className="mr-2" />
                      New Schemes
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Awareness" className="justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp />
                    Awareness
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
            <CollapsibleContent asChild>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    <TrendingUp className="mr-2" />
                    Job Sector Prediction
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    <AlertTriangle className="mr-2" />
                    Job Risk Awareness
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
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
          </main>
        </SidebarInset>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Tender Analysis for Local Employment</DialogTitle>
            </DialogHeader>
            {analysisResult && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" /> Target Industries & Roles
                  </h3>
                  <ul className="list-disc pl-12 mt-2 space-y-1 text-sm text-foreground">
                    {analysisResult.targetIndustriesAndRoles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Potential Local Workforce
                  </h3>
                  <ul className="list-disc pl-12 mt-2 space-y-1 text-sm text-foreground">
                    {analysisResult.potentialLocalWorkforce.map((workforce, index) => (
                      <li key={index}>{workforce}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" /> Job Matching Strategy
                  </h3>
                  <p className="text-sm text-foreground mt-2 pl-7">{analysisResult.jobMatchingStrategy}</p>
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
