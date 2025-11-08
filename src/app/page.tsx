
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function CitizenHomePage() {
  return (
    <>
      <header className="bg-primary text-primary-foreground p-4 -mx-4 md:-mx-6 mb-8">
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
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-5l-3.75 3.75-1.42-1.42L9.58 10H4.5v-2h5.08l-4.25-4.25 1.42-1.42L10.5 6.08V1h2v5.08l3.75-3.75 1.42 1.42L13.42 8H18.5v2h-5.08l4.25 4.25-1.42 1.42L12.5 11.92V17h-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold">Skill Intel Engine</h1>
          </div>
        </div>
      </header>
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
    </>
  );
}
