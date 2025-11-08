
'use client';

import {
  BookCheck,
  LayoutDashboard,
  ChevronDown,
  Briefcase,
  FileText,
  Lightbulb,
  Search,
  Settings,
  Target,
  Users,
  PieChart,
  User,
  FolderKanban,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import Image from 'next/image';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

function AppSidebar() {
  const pathname = usePathname();
  const { open, setOpen, toggleSidebar, state } = useSidebar();
  
  const isProjectRoute = pathname.startsWith('/projects');
  const isAwarenessRoute = pathname.startsWith('/awareness');

  return (
    <Sidebar collapsible="icon" onOpenChange={setOpen} open={open}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <button onClick={toggleSidebar} className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-primary-foreground rounded-lg p-1.5 flex items-center justify-center">
             <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 490 490" xmlSpace="preserve" className="text-primary h-6 w-6">
<g>
	<path d="M462.5,385.4H235.2c-2.3,0-4.4,1.4-5.2,3.5l-20.1,49.1c-0.6,1.4-0.1,3,1.2,3.9c0.7,0.5,1.5,0.7,2.3,0.7h13.2
		c2.8,0,5.1,2.3,5.1,5.1s-2.3,5.1-5.1,5.1H113.1c-2.8,0-5.1-2.3-5.1-5.1c0-2.8,2.3-5.1,5.1-5.1h15.4c2.1,0,4-1.2,4.8-3.1l20-48.2
		c0.6-1.4,0.1-3-1.2-3.9c-0.7-0.5-1.5-0.7-2.3-0.7H27.5C12.3,385.4,0,373,0,357.8v-255C0,87.3,12.3,75,27.5,75h14.7
		c2.8,0,5.1,2.3,5.1,5.1c0,2.8-2.3,5.1-5.1,5.1H27.5c-9.6,0-17.3,7.7-17.3,17.3v255c0,9.6,7.7,17.3,17.3,17.3h105.1
		c1.5,0,2.9-0.7,3.9-1.8l20.4-23.9c1.5-1.8,1.2-4.4-0.6-5.8c-1.8-1.5-4.4-1.2-5.8,0.6l-19.2,22.5c-0.2,0.2-0.5,0.4-0.8,0.4H27.5
		c-9.6,0-17.3-7.7-17.3-17.3V102.5c0-9.6,7.7-17.3,17.3-17.3h435c9.6,0,17.5,7.7,17.5,17.3v255.3c0,9.6-7.7,17.3-17.5,17.3H462.5
		z"/>
	<path d="M208.5,102.5h-31.8V70.7h31.8V102.5z M186.9,92.3h11.4V80.9h-11.4V92.3z"/>
	<path d="M263,102.5h-31.8V70.7H263V102.5z M241.4,92.3H253V80.9h-11.6V92.3z"/>
	<path d="M317.5,102.5h-31.8V70.7h31.8V102.5z M295.9,92.3h11.4V80.9h-11.4V92.3z"/>
	<path d="M366.9,219.1c-25.8,0-46.7,21-46.7,46.7c0,25.8,21,46.7,46.7,46.7s46.7-21,46.7-46.7c0-25.8-21-46.7-46.7-46.7z M366.9,302.3
		c-20.2,0-36.5-16.3-36.5-36.5s16.3-36.5,36.5-36.5s36.5,16.3,36.5,36.5S387.1,302.3,366.9,302.3z"/>
	<path d="M259.5,219.1c-25.8,0-46.7,21-46.7,46.7c0,25.8,21,46.7,46.7,46.7s46.7-21,46.7-46.7C306.2,239.9,285.3,219.1,259.5,219.1z
		 M259.5,302.3c-20.2,0-36.5-16.3-36.5-36.5s16.3-36.5,36.5-36.5s36.5,16.3,36.5,36.5S279.7,302.3,259.5,302.3z"/>
	<path d="M313.2,323.5c-25.8,0-46.7,21-46.7,46.7s21,46.7,46.7,46.7s46.7-21,46.7-46.7S339,323.5,313.2,323.5z M313.2,406.7
		c-20.2,0-36.5-16.3-36.5-36.5s16.3-36.5,36.5-36.5s36.5,16.3,36.5,36.5S333.4,406.7,313.2,406.7z"/>
	<path d="M245,69.5c-35.9,0-65-29.2-65-65.1h10.2c0,30.2,24.6,54.9,54.8,54.9s54.8-24.6,54.8-54.9h10.2C310,40.4,280.8,69.5,245,69.5z
		"/>
	<path d="M245,160.2c-41.3,0-74.8-33.5-74.8-74.8h-10.2c0,46.9,38.1,85,85,85s85-38.1,85-85h-10.2
		C319.8,126.7,286.3,160.2,245,160.2z"/>
</g>
</svg>
            </div>
            {state === 'expanded' && (
              <h1 className="text-xl font-semibold text-sidebar-foreground">
                Skill Intel
              </h1>
            )}
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard">
              <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <Collapsible open={isProjectRoute} onOpenChange={(isOpen) => isProjectRoute || setOpen(isOpen)}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Projects" className="justify-between" isActive={isProjectRoute}>
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
                    <SidebarMenuSubButton isActive={pathname === '/projects/new'}>
                      <Briefcase className="mr-2" />
                      New Projects
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/projects/tender">
                    <SidebarMenuSubButton isActive={pathname === '/projects/tender'}>
                      <FileText className="mr-2" />
                      Tender
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/projects/schemes">
                    <SidebarMenuSubButton isActive={pathname === '/projects/schemes'}>
                      <Lightbulb className="mr-2" />
                      New Schemes
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible open={isAwarenessRoute} onOpenChange={(isOpen) => isAwarenessRoute || setOpen(isOpen)}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Awareness" className="justify-between" isActive={isAwarenessRoute}>
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
                    <SidebarMenuSubButton isActive={pathname === '/awareness/job-sector-prediction'}>
                      <TrendingUp className="mr-2" />
                      Job Sector Prediction
                    </SidebarMenuSubButton>
                  </Link>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <Link href="/awareness/job-risk-awareness">
                    <SidebarMenuSubButton isActive={pathname === '/awareness/job-risk-awareness'}>
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
      <SidebarTrigger className="flex md:hidden" />
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
