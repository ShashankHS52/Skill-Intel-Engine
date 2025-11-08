
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
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path d="M22.2 6.4C22.2 6.4 21.4 6 21 6.4C20.6 6.8 20.6 7.6 20.6 7.6L22.2 6.4ZM24.6 20.6C25.4 20.6 25.8 19.8 25.4 19.4C25 19 24.2 19 24.2 19L24.6 20.6ZM8.2 16.6C8.2 16.6 7.8 16.2 7.4 16.6C7 17 7 17.8 7 17.8L8.2 16.6ZM13.8 31.4C14.6 31.4 15 30.6 14.6 30.2C14.2 29.8 13.4 29.8 13.4 29.8L13.8 31.4Z" fill="#FBBF24" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M48.2733 13.2754C49.1983 13.593 50.053 14.2415 50.6402 15.0841C51.2273 15.9267 51.5226 16.9202 51.4932 17.925C51.4637 18.9298 51.1099 19.8973 50.4828 20.6771C49.8557 21.457 49.001 22.0086 48.076 22.327L48.2733 13.2754Z" fill="#FBBF24"/>
                <path d="M37.5 45.4C37.5 45.4 37.9 45.8 37.5 46.2C37.1 46.6 36.3 46.6 36.3 46.6L37.5 45.4ZM49.9 35.8C50.3 35.8 50.7 35 50.3 34.6C49.9 34.2 49.1 34.2 49.1 34.2L49.9 35.8ZM28.3 57.8C28.3 57.8 27.9 58.2 28.3 58.6C28.7 59 29.5 59 29.5 59L28.3 57.8Z" fill="#FBBF24" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32.0001 29.091L40.2345 23.9092L46.0001 32L37.7657 37.1818L32.0001 29.091Z" fill="#818CF8" stroke="#334155" strokeWidth="2.5"/>
                <path d="M40.2345 23.9092L46.0001 32L54.2345 26.8182L48.4689 18.7274L40.2345 23.9092Z" fill="#34D399" stroke="#334155" strokeWidth="2.5"/>
                <path d="M36,21.5a5.5,5.5 0 1,0 11,0a5.5,5.5 0 1,0 -11,0" fill="#FBBF24" stroke="#334155" strokeWidth="2.5"/>
                <path d="M51.5 40.5A5.5 5.5 0 1 0 40.5 40.5A5.5 5.5 0 1 0 51.5 40.5z" fill="#FBBF24" stroke="#334155" strokeWidth="2.5"/>
                <path d="M33.4244 33.7275L30.591 30.3638L24.8254 35.5456L33.0598 40.7275L38.8254 35.5456L33.4244 33.7275Z" fill="white" stroke="#334155" strokeWidth="2.5"/>
                <path d="M30.591 30.3638L33.4244 33.7275L33.0598 40.7275L24.8254 35.5456L30.591 30.3638Z" fill="#F3F4F6" stroke="#334155" strokeWidth="2.5"/>
                <path d="M48.076 22.327C48.076 22.327 48.076 22.327 48.076 22.327L48.2733 13.2754L48.4689 18.7274L48.076 22.327Z" fill="#FBBF24"/>
                <path d="M22.5834 51.75C19.9167 47.75 22.4167 43.5833 22.75 42.25C26.0833 42.4167 29.0833 44.75 30.25 45.4167C30.25 47.0833 29.0833 49.5833 28.5833 50.25C26.5833 52.4167 24.25 53.0833 22.5833 51.75Z" fill="#818CF8" stroke="#334155" strokeWidth="2.5"/>
                <path d="M23,6.5A14.5,14.5 0,1,1 8.5,21,14.5,14.5 0,0,1 23,6.5" fill="#FBBF24" stroke="#334155" strokeWidth="2.5"/>
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
