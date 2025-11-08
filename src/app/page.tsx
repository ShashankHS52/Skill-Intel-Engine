
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
