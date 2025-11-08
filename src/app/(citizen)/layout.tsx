
'use client';

import {
  LayoutDashboard,
  ChevronDown,
  Search,
  Settings,
  User,
  List,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
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
  useSidebar
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');


function AppSidebar() {
  const pathname = usePathname();
  const { open, setOpen, toggleSidebar, state } = useSidebar();

  return (
    <Sidebar collapsible="icon" onOpenChange={setOpen} open={open}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <button onClick={toggleSidebar} className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-primary-foreground rounded-lg p-1 flex items-center justify-center">
             <Image src="/logo.svg" alt="Skill Intel Engine Logo" width={58} height={58} />
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
            <Link href="/citizen-dashboard">
              <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/citizen-dashboard'}>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Link href="/skill-profiling">
              <SidebarMenuButton tooltip="Skill Profile" isActive={pathname === '/skill-profiling'}>
                <List />
                Skill Profile
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 p-2 cursor-pointer">
                    <Avatar className="cursor-pointer h-9 w-9">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User" data-ai-hint={userAvatar.imageHint} />}
                        <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                     {state === 'expanded' && (
                        <div>
                            <p className="text-sm font-semibold text-sidebar-foreground">Priya Sharma</p>
                            <p className="text-xs text-sidebar-foreground/70">View Profile</p>
                        </div>
                     )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="flex md:hidden" />
      <div className="w-full flex-1">
        {/* Header content can go here if needed */}
      </div>
       <Link href="/admin/login">
            <p className="text-sm text-muted-foreground hover:text-foreground">
                Admin Portal
            </p>
        </Link>
    </header>
  );
}


export default function CitizenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/register/identity' || pathname === '/';

  if (isAuthPage) {
    return (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 container mx-auto p-4 md:p-6">
            {children}
          </main>
        </div>
    );
  }

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
