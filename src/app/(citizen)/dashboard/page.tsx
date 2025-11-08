
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  ChevronRight,
  Lightbulb,
  Star,
  Target,
  TrendingUp,
  Video,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// --- Mock Data ---

const userProfile = {
  name: 'Priya Sharma',
  skillCompleteness: 75,
  skillValueScore: 82,
  skillsAtRisk: [
    {
      skill: 'Manual Data Entry',
      risk: 'High',
      reason: 'High potential for automation.',
    },
    {
      skill: 'Basic Customer Service',
      risk: 'Medium',
      reason: 'AI-powered chatbots are becoming more common.',
    },
  ],
};

const personalizedRoadmap = [
  {
    skill: 'Cloud Computing (AWS)',
    reason: 'High demand in the IT sector in your region.',
    paths: {
      courses: [
        {
          name: 'PMKVY - Cloud Practitioner',
          url: '#',
        },
        {
          name: 'NPTEL - Introduction to Cloud Computing',
          url: '#',
        },
      ],
      selfLearning: [
        {
          name: 'Official AWS Training Videos',
          url: '#',
          type: 'video',
        },
        {
          name: 'Digital India - Cloud Computing Guide',
          url: '#',
          type: 'guide',
        },
      ],
      mentorship: [
        {
          name: 'Local IT Hub Apprenticeship',
          url: '#',
        },
      ],
    },
  },
  {
    skill: 'Digital Marketing',
    reason:
      'Growing need for small and medium businesses to establish an online presence.',
    paths: {
      courses: [
        {
          name: 'eSkill India - Digital Marketing Certified Associate',
          url: '#',
        },
      ],
      selfLearning: [
        {
          name: 'Google Digital Garage - Fundamentals of Digital Marketing',
          url: '#',
          type: 'video',
        },
      ],
      mentorship: [],
    },
  },
  {
    skill: 'Advanced Excel & Data Visualization',
    reason: 'Core skill required across multiple sectors for data analysis.',
    paths: {
      courses: [],
      selfLearning: [
        {
          name: 'SWAYAM - Data Analysis with Excel',
          url: '#',
          type: 'guide',
        },
      ],
      mentorship: [
        {
          name: 'Internship at a Local Financial Firm',
          url: '#',
        },
      ],
    },
  },
];

const regionalDemand = [
  { skill: 'Cybersecurity', demand: 98 },
  { skill: 'AI/ML Engineering', demand: 95 },
  { skill: 'Cloud Computing', demand: 92 },
  { skill: 'Data Science', demand: 88 },
  { skill: 'Blockchain Development', demand: 81 },
];

// --- Components ---

function SkillValueCard() {
  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Star className="h-5 w-5" />
          My Skill Value Assessment
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-6xl font-bold">{userProfile.skillValueScore}</div>
        <p className="text-sm opacity-80">
          Based on demand for your skills in your region.
        </p>
      </CardContent>
    </Card>
  );
}

function ProfileCompletenessCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Profile Completeness
        </CardTitle>
        <CardDescription>
          A complete profile gets you better recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Progress
            value={userProfile.skillCompleteness}
            className="h-3 flex-1"
          />
          <span className="text-xl font-bold text-primary">
            {userProfile.skillCompleteness}%
          </span>
        </div>
        <Button variant="link" className="p-0 h-auto mt-2">
          Complete your profile <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function SkillsAtRiskCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          Skills at Risk
        </CardTitle>
        <CardDescription>
          Skills with decreasing demand due to automation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {userProfile.skillsAtRisk.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{item.skill}</p>
                <Badge
                  variant={
                    item.risk === 'High' ? 'destructive' : 'secondary'
                  }
                >
                  {item.risk} Risk
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RoadmapItem({
  skill,
  reason,
  paths,
}: {
  skill: string;
  reason: string;
  paths: any;
}) {
  return (
    <AccordionItem value={skill}>
      <AccordionTrigger className="font-semibold text-lg hover:no-underline">
        {skill}
      </AccordionTrigger>
      <AccordionContent className="pl-2">
        <p className="text-muted-foreground mb-4">{reason}</p>
        <div className="space-y-4">
          {paths.courses.length > 0 && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-primary" /> Accredited
                Courses
              </h4>
              <ul className="space-y-1 pl-7">
                {paths.courses.map((course: any, i: number) => (
                  <li key={i}>
                    <a
                      href={course.url}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      {course.name} <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {paths.selfLearning.length > 0 && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Video className="h-5 w-5 text-primary" /> Self-Learning
                Resources
              </h4>
              <ul className="space-y-1 pl-7">
                {paths.selfLearning.map((resource: any, i: number) => (
                  <li key={i}>
                    <a
                      href={resource.url}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      {resource.type === 'video' ? (
                        <Video className="h-4 w-4 mr-2" />
                      ) : (
                        <BookOpen className="h-4 w-4 mr-2" />
                      )}
                      {resource.name}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {paths.mentorship.length > 0 && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-primary" /> Mentorship &
                Apprenticeships
              </h4>
              <ul className="space-y-1 pl-7">
                {paths.mentorship.map((mentor: any, i: number) => (
                  <li key={i}>
                    <a
                      href={mentor.url}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      {mentor.name} <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function RegionalDemandChart() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Regional Demand Snapshot
          </CardTitle>
          <CardDescription>
            Top 5 most in-demand skills in your district.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalDemand} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="skill"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <p className="font-medium">{`${payload[0].payload.skill}`}</p>
                          <p className="text-sm text-muted-foreground">{`Demand Score: ${payload[0].value}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="demand" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }

export default function CitizenDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {userProfile.name}!
        </h1>
        <p className="text-muted-foreground">
          Here are your personalized insights and next steps for your career.
        </p>
      </div>

      {/* --- Section 1: My Skill Intel Score --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkillValueCard />
        <ProfileCompletenessCard />
        <SkillsAtRiskCard />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Section 2: Personalized Roadmap --- */}
        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary"/>
                        Your Personalized Roadmap
                    </CardTitle>
                    <CardDescription>
                        Acquire these top 3 skills to maximize your opportunities.
                    </CardDescription>
                 </CardHeader>
                 <CardContent>
                    <Accordion type="single" collapsible defaultValue={personalizedRoadmap[0].skill}>
                        {personalizedRoadmap.map((item, index) => (
                            <RoadmapItem key={index} {...item} />
                        ))}
                    </Accordion>
                 </CardContent>
            </Card>
        </div>

        {/* --- Section 3: Regional Demand Snapshot --- */}
        <div className="lg:col-span-1">
          <RegionalDemandChart />
        </div>
      </div>
    </div>
  );
}
