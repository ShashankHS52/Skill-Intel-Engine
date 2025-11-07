
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
  TrendingUp,
  AlertTriangle,
  Loader2,
  Download,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { jobSectorPrediction, JobSectorPredictionOutput } from '@/app/actions/job-sector-prediction';


const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

const formSchema = z.object({
  industry: z.string().min(2, { message: 'Industry is required.' }),
  timeHorizon: z.string().min(2, { message: 'Time horizon is required.' }),
});

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
                <SidebarMenuButton tooltip="Projects" className="justify-between">
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
                <SidebarMenuButton tooltip="Awareness" className="justify-between" isActive>
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
                  <Link href="/awareness/job-sector-prediction">
                    <SidebarMenuSubButton isActive>
                      <TrendingUp className="mr-2" />
                      Job Sector Prediction
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/awareness/job-risk-awareness">
                    <SidebarMenuSubButton>
                      <AlertTriangle className="mr-2" />
                      Job Risk Awareness
                    </SidebarMenuSubButton>
                  </Link>
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

export default function JobSectorPredictionPage() {
  const [analysisResult, setAnalysisResult] = useState<JobSectorPredictionOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: 'All',
      timeHorizon: 'Long-term',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setAnalysisResult(null);
    try {
      const result = await jobSectorPrediction(values);
      setAnalysisResult(result);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error predicting job sectors:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDownload = () => {
    if (analysisResult) {
      const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'job-sector-prediction.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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
              <div>
                <h1 className="font-semibold text-xl md:text-2xl">Job Sector Prediction</h1>
                <p className="text-sm text-muted-foreground">Use AI to predict emerging job sectors and required skills.</p>
              </div>
            </div>
            
            <Card className="max-w-2xl mx-auto w-full">
                <CardHeader>
                    <CardTitle>Predict Future Job Sectors</CardTitle>
                    <CardDescription>Select an industry and time horizon to get AI-powered predictions on emerging job sectors and skills.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                             <FormField
                                control={form.control}
                                name="industry"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry</FormLabel>
                                    <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="All">All Industries</SelectItem>
                                        <SelectItem value="Technology">Technology</SelectItem>
                                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                        <SelectItem value="Retail">Retail</SelectItem>
                                    </SelectContent>
                                    </Select>
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
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Predicting...' : 'Predict Now'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

          </main>
        </SidebarInset>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-7 w-7 text-primary" />
                Job Sector Prediction Analysis
              </DialogTitle>
            </DialogHeader>
            {analysisResult && (
              <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1 pr-4">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-primary" /> Emerging Job Sectors
                    </h3>
                    <div className="flex flex-wrap gap-2 pl-7">
                        {analysisResult.emergingSectors.map((sector, index) => (
                        <span key={index} className="text-sm bg-primary/10 text-primary-foreground/80 px-3 py-1 rounded-full">{sector}</span>
                        ))}
                    </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                     <Lightbulb className="h-5 w-5 text-primary" /> In-Demand Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 pl-7">
                    {analysisResult.inDemandSkills.map((skill, index) => (
                      <span key={index} className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-primary" /> Preparedness Recommendations
                  </h3>
                  <ul className="list-disc pl-12 space-y-1 text-sm text-foreground">
                    {analysisResult.preparednessRecommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
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
    </SidebarProvider>
  );
}
