import {
  BookCheck,
  LayoutDashboard,
  LineChart,
  Search,
  Settings,
  Target,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import KpiCard from '@/components/dashboard/kpi-card';
import GeographicalHeatmap from '@/components/dashboard/geographical-heatmap';
import TrainingProgramManagement from '@/components/dashboard/training-program-management';
import DataQualityMonitoring from '@/components/dashboard/data-quality-monitoring';
import AnalysisTools from '@/components/dashboard/analysis-tools';
import {PlaceHolderImages} from '@/lib/placeholder-images';

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
            <SidebarMenuButton tooltip="Dashboard" isActive>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <LineChart />
              Analytics
            </SidebarMenuButton>
          </SidebarMenuItem>
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

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <KpiCard
                title="Total Registered Users"
                value="1.2M"
                change="+12.5%"
                icon={<Users className="h-5 w-5 text-muted-foreground" />}
                description="from last month"
              />
              <KpiCard
                title="Critical Skill Gaps"
                value="4,281"
                change="-3.2%"
                icon={<Target className="h-5 w-5 text-muted-foreground" />}
                description="from last month"
                changeType="negative"
              />
              <KpiCard
                title="Aligned Training Programs"
                value="347"
                change="+21"
                icon={<BookCheck className="h-5 w-5 text-muted-foreground" />}
                description="new programs this quarter"
              />
            </div>
            <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-5">
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
                <GeographicalHeatmap />
              </div>
              <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <AnalysisTools />
              </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-2">
                 <TrainingProgramManagement />
                 <DataQualityMonitoring />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
