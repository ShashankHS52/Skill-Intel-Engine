
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function AppFooter() {
    return (
      <footer className="w-full border-t  mt-auto">
        <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Skill Intel Engine. All rights reserved.
        </div>
      </footer>
    );
  }

export default function CitizenHomePage() {
  return (
    <>
<header className="bg-primary text-primary-foreground pt-2 px-2 pb-2 mb-2"> <div className="container mx-auto flex items-center justify-start h-full"> <div className="flex items-center gap-2"> <div> <Image src="/logo.svg" alt="Skill Intel Engine Logo" width={58} height={58} /> </div> <h1 className="text-xl font-semibold">Skill Intel Engine</h1> </div> </div> </header>


      <div className="container pt-8 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <section className="w-full max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
              Unlock Your Potential. Build Your Future.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
              The Skill Intel Engine helps you map your skills, understand your value, and find the best opportunities to grow your career.
            </p>
            <div className="mt-8">
              <Link href="/register/identity">
                <Button size="lg">
                  Start Your Skill Profile
                </Button>
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">It's fast, free, and secure.</p>
            </div>
          </section>

          <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card>
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Map Your Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Easily document all your skills, from formal qualifications to on-the-job experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Get Personalized Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Discover which of your skills are in high demand in your area and which are at risk from automation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Find Upskilling Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Receive a clear roadmap with links to courses and resources to help you gain in-demand skills.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <AppFooter />
    </>
  );
}
