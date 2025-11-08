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
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary-foreground rounded-lg p-1.5 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary"
                  >
                    <path
                      d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.219L19.531 8.5V15.5L12 19.781L4.469 15.5V8.5L12 4.219ZM12 9C10.343 9 9 10.343 9 12C9 13.657 10.343 15 12 15C13.657 15 15 13.657 15 12C15 10.343 13.657 9 12 9Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold">Skill Intel Engine</h1>
              </div>
            </div>
          </header>

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
