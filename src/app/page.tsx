
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
                <path d="M32 4C24.8286 4 18.0645 7.97143 14.1257 14.1143C14.1257 12.0001 12 10 10 10C8 10 5.87429 12.0001 5.87429 14.1143C4.69714 17.0286 4 20.3429 4 24C4 26.1143 5.87429 28.1143 5.87429 30.2286C4.69714 33.1429 4 36.4571 4 40C4 47.1714 7.97143 53.9355 14.1143 57.8743C12.0001 57.8743 10 60 10 62C10 64 12.0001 66.1257 14.1143 66.1257C17.0286 67.3029 20.3429 68 24 68C26.1143 68 28.1143 66.1257 30.2286 66.1257C33.1429 67.3029 36.4571 68 40 68C47.1714 68 53.9355 64.0286 57.8743 57.8857C57.8743 60.0001 60 62 62 62C64 62 66.1257 60.0001 66.1257 57.8857C67.3029 54.9714 68 51.6571 68 48C68 45.8857 66.1257 43.8857 66.1257 41.7714C67.3029 38.8571 68 35.5429 68 32C68 24.8286 64.0286 18.0645 57.8857 14.1257C60.0001 14.1257 62 12 62 10C62 8 60.0001 5.87429 57.8857 5.87429C54.9714 4.69714 51.6571 4 48 4C45.8857 4 43.8857 5.87429 41.7714 5.87429C38.8571 4.69714 35.5429 4 32 4Z" fill="url(#puzzle-gradient)"/>
                <path d="M24 49.5C24 48.6716 24.6716 48 25.5 48H38.5C39.3284 48 40 48.6716 40 49.5V50.5C40 51.3284 39.3284 52 38.5 52H25.5C24.6716 52 24 51.3284 24 50.5V49.5Z" fill="#D9534F"/>
                <path d="M24 55.5C24 54.6716 24.6716 54 25.5 54H38.5C39.3284 54 40 54.6716 40 55.5V56.5C40 57.3284 39.3284 58 38.5 58H25.5C24.6716 58 24 57.3284 24 56.5V55.5Z" fill="#D9534F"/>
                <path d="M27 61.5C27 60.6716 27.6716 60 28.5 60H35.5C36.3284 60 37 60.6716 37 61.5V62.5C37 63.3284 36.3284 64 35.5 64H28.5C27.6716 64 27 63.3284 27 62.5V61.5Z" fill="#D9534F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 4C24.8286 4 18.0645 7.97143 14.1257 14.1143C14.1257 12.0001 12 10 10 10C8 10 5.87429 12.0001 5.87429 14.1143C4.69714 17.0286 4 20.3429 4 24V32H32V4Z" fill="#F5F5F5"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 4C35.5429 4 38.8571 4.69714 41.7714 5.87429C43.8857 5.87429 45.8857 4 48 4C51.6571 4 54.9714 4.69714 57.8857 5.87429C60.0001 5.87429 62 8 62 10C62 12 60.0001 14.1257 57.8857 14.1257C64.0286 18.0645 68 24.8286 68 32H32V4Z" fill="#D9534F"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4 40C4 47.1714 7.97143 53.9355 14.1143 57.8743C12.0001 57.8743 10 60 10 62C10 64 12.0001 66.1257 14.1143 66.1257C17.0286 67.3029 20.3429 68 24 68C26.1143 68 28.1143 66.1257 30.2286 66.1257C30.2286 64.0414 32 62.1143 32 60V32H4V40Z" fill="#4285F4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M32 68C35.5429 68 38.8571 67.3029 41.7714 66.1257C43.8857 66.1257 45.8857 68 48 68C51.6571 68 54.9714 67.3029 57.8857 66.1257C60.0001 66.1257 62 64 62 62C62 60 60.0001 57.8743 57.8857 57.8743C64.0286 53.9355 68 47.1714 68 40V32H32V68Z" fill="#F4B400"/>

                <defs>
                    <radialGradient id="puzzle-gradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                    <stop offset="0%" stop-color="#FFFFFF"/>
                    <stop offset="100%" stop-color="#E0E0E0"/>
                    </radialGradient>
                </defs>
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
