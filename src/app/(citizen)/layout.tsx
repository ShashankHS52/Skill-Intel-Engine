import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import '../globals.css';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Skill Intel Engine',
  description: 'Map your skills, find opportunities, and grow your career.',
};

export default function CitizenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', inter.variable)}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 container mx-auto p-4 md:p-6">
            {children}
          </main>
          
          <footer className="bg-muted text-muted-foreground p-4 mt-8">
            <div className="container mx-auto text-center text-sm">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <ShieldCheck className="h-4 w-4" />
                    <p>Your data is secure, private, and used only for policy and skill development.</p>
                </div>
                <p>&copy; 2024 Skill Intel Engine. All Rights Reserved.</p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
