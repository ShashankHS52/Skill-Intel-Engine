
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Briefcase, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CitizenHomePage() {
  return (
    <>
      <header className="bg-primary text-primary-foreground p-4 -mx-4 md:-mx-6 mb-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary-foreground rounded-lg p-1.5 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path d="M9 17C9 19.2091 10.7909 21 13 21C15.2091 21 17 19.2091 17 17C17 14.7909 15.2091 13 13 13C10.7909 13 9 14.7909 9 17Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 6L12 3L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17.8285 5.17157C19.2427 6.58579 20 8.53553 20 10.5858C20 11.857 19.5639 13.0454 18.8285 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6.17157 5.17157C4.75736 6.58579 4 8.53553 4 10.5858C4 11.857 4.43612 13.0454 5.17157 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
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
