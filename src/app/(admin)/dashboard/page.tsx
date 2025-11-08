

'use client';
import {
  BookCheck,
  Briefcase,
  Target,
  Users,
  PieChart,
  User,
  MapPin,
  TrendingUp,
  Award,
  Building,
} from 'lucide-react';

import KpiCard from '@/components/dashboard/kpi-card';
import KarnatakaGeographicalInsights from '@/components/dashboard/karnataka-geographical-insights';
import TrainingProgramManagement from '@/components/dashboard/training-program-management';
import DataQualityMonitoring from '@/components/dashboard/data-quality-monitoring';
import AnalysisTools from '@/components/dashboard/analysis-tools';
import DistrictSVGViewer from '@/components/dashboard/district-svg-viewer';

// Import new enhanced KPI components
import { MicroKPICard } from '@/components/dashboard/micro-kpi-card';
import { DetailedKPICard } from '@/components/dashboard/detailed-kpi-card';
import { RegionalKPICard } from '@/components/dashboard/regional-kpi-card';

// Import dummy data and Karnataka data
import { kpiConfigs, kpiData } from '@/lib/mock-kpi-api-fixed';
import { karnatakaOverview } from '@/lib/karnataka-data';

export default function Dashboard() {
  // Filter KPIs by category and priority
  const employmentKPIs = kpiConfigs.filter(k => k.category === 'employment');
  const skillKPIs = kpiConfigs.filter(k => k.category === 'skills');
  const demographicsKPIs = kpiConfigs.filter(k => k.category === 'demographics');

  return (
    <>

      {/* Karnataka Overview KPIs */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <KpiCard
          title="Working Population"
          value={`${karnatakaOverview.totalWorkingPopulation}M`}
          change="+3.2%"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          description="from last quarter"
        />
        <KpiCard
          title="Employment Rate"
          value={`${karnatakaOverview.averageEmploymentRate}%`}
          change="+1.8%"
          icon={<Briefcase className="h-5 w-5 text-muted-foreground" />}
          description="state average"
        />
        <KpiCard
          title="Digital Skills Penetration"
          value={`${karnatakaOverview.averageDigitalSkills}%`}
          change="+5.1%"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
          description="above national average"
        />
        <KpiCard
          title="Unemployment Rate"
          value={`${karnatakaOverview.averageUnemployment}%`}
          change="-0.3%"
          icon={<PieChart className="h-5 w-5 text-muted-foreground" />}
          description="below national average"
          changeType="negative"
        />
      </div>

      {/* Employment & Demographics KPIs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: '#008080' }}>
              Karnataka Employment & Demographics
            </h2>
            <p className="text-muted-foreground">
              District-wise workforce participation and demographic analysis
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:gap-8 lg:grid-cols-6">
          {/* Working Age Population - Modified for Karnataka */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'working-age-population')!}
            data={{
              value: `${karnatakaOverview.totalWorkingPopulation}M`,
              change: '+3.2%',
              changeType: 'positive',
              description: 'Active workforce across all 31 districts',
              trend: [
                { period: 'Q1', value: 31.1 },
                { period: 'Q2', value: 31.5 },
                { period: 'Q3', value: 31.8 },
                { period: 'Q4', value: 32.4 }
              ]
            }}
          />
          
          {/* Urban Employment Rate */}
          <DetailedKPICard 
            config={{
              id: 'ka-urban-employment',
              title: 'Urban Employment Rate',
              description: 'Major cities like Bengaluru, Mysuru',
              category: 'employment',
              type: 'detailed',
              hasGeography: false,
              hasBreakdowns: false,
              hasChart: true,
              priority: 'high',
              color: '#008080',
              iconName: 'briefcase'
            }}
            data={{
              value: '92.3%',
              change: '+2.2%',
              changeType: 'positive',
              description: 'Major cities like Bengaluru, Mysuru',
              trend: [
                { period: 'Q1', value: 88.5 },
                { period: 'Q2', value: 89.2 },
                { period: 'Q3', value: 90.1 },
                { period: 'Q4', value: 92.3 }
              ]
            }}
          />

          {/* Rural Employment Rate */}
          <DetailedKPICard 
            config={{
              id: 'ka-rural-employment',
              title: 'Rural Employment Rate',
              description: 'Agricultural and rural districts',
              category: 'employment',
              type: 'detailed',
              hasGeography: false,
              hasBreakdowns: false,
              hasChart: true,
              priority: 'medium',
              color: '#008080',
              iconName: 'users'
            }}
            data={{
              value: '84.7%',
              change: '+1.5%',
              changeType: 'positive',
              description: 'Agricultural and rural districts',
              trend: [
                { period: 'Q1', value: 81.5 },
                { period: 'Q2', value: 82.1 },
                { period: 'Q3', value: 83.2 },
                { period: 'Q4', value: 84.7 }
              ]
            }}
          />
        </div>
      </div>

      {/* Skills KPIs Section - Karnataka Focus */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: '#00A693' }}>
              Karnataka Skills & Technology Hub
            </h2>
            <p className="text-muted-foreground">
              Digital transformation, IT skills, and emerging technology workforce
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:gap-8 lg:grid-cols-6">
          {/* IT Workforce */}
          <DetailedKPICard 
            config={{
              id: 'ka-it-workforce',
              title: 'IT Workforce',
              description: 'Software professionals in Karnataka',
              category: 'skills',
              type: 'detailed',
              hasGeography: false,
              hasBreakdowns: false,
              hasChart: true,
              priority: 'high',
              color: '#00A693',
              iconName: 'trending-up'
            }}
            data={{
              value: '1.85M',
              change: '+7.6%',
              changeType: 'positive',
              description: 'Software professionals in Karnataka',
              trend: [
                { period: 'Q1', value: 1520 },
                { period: 'Q2', value: 1620 },
                { period: 'Q3', value: 1720 },
                { period: 'Q4', value: 1850 }
              ]
            }}
          />

          {/* Certified Digital Skills */}
          <DetailedKPICard 
            config={{
              ...kpiConfigs.find(k => k.id === 'digital-skills')!,
              title: 'Certified Digital Skills',
              description: 'AI, ML, Cloud, and emerging tech skills'
            }}
            data={{
              value: `${karnatakaOverview.averageDigitalSkills}%`,
              change: '+5.1%',
              changeType: 'positive',
              description: 'AI, ML, Cloud, and emerging tech skills',
              trend: [
                { period: 'Q1', value: 64.2 },
                { period: 'Q2', value: 66.8 },
                { period: 'Q3', value: 68.1 },
                { period: 'Q4', value: 69.8 }
              ]
            }}
          />

          {/* Startup Ecosystem */}
          <DetailedKPICard 
            config={{
              id: 'ka-startup-ecosystem',
              title: 'Startup Employment',
              description: 'Jobs created by Karnataka startups',
              category: 'skills',
              type: 'detailed',
              hasGeography: false,
              hasBreakdowns: false,
              hasChart: true,
              priority: 'high',
              color: '#00A693',
              iconName: 'award'
            }}
            data={{
              value: '287K',
              change: '+17.1%',
              changeType: 'positive',
              description: 'Jobs created by Karnataka startups',
              trend: [
                { period: 'Q1', value: 195 },
                { period: 'Q2', value: 215 },
                { period: 'Q3', value: 245 },
                { period: 'Q4', value: 287 }
              ]
            }}
          />
        </div>
      </div>

      {/* Sector-specific KPIs */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <KpiCard
          title="Active IT Companies"
          value="12.8K"
          change="+8.5%"
          icon={<Building className="h-5 w-5 text-muted-foreground" />}
          description="registered in Karnataka"
        />
        <KpiCard
          title="Agriculture Modernization"
          value="68%"
          change="+12.3%"
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
          description="tech-enabled farming"
        />
        <KpiCard
          title="Skill Training Centers"
          value="2,847"
          change="+156"
          icon={<BookCheck className="h-5 w-5 text-muted-foreground" />}
          description="across all districts"
        />
      </div>

      {/* District SVG Viewer - New Component */}
      <div className="grid grid-cols-1">
        <DistrictSVGViewer />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-5">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <KarnatakaGeographicalInsights />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <AnalysisTools />
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-2">
           <TrainingProgramManagement />
           <DataQualityMonitoring />
      </div>
    </>
  );
}
