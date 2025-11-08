

'use client';
import {
  BookCheck,
  Briefcase,
  Target,
  Users,
  PieChart,
  User,
} from 'lucide-react';

import KpiCard from '@/components/dashboard/kpi-card';
import GeographicalHeatmap from '@/components/dashboard/geographical-heatmap';
import StateWiseGeographicalInsights from '@/components/dashboard/state-wise-geographical-insights';
import TrainingProgramManagement from '@/components/dashboard/training-program-management';
import DataQualityMonitoring from '@/components/dashboard/data-quality-monitoring';
import AnalysisTools from '@/components/dashboard/analysis-tools';

// Import new enhanced KPI components
import { MicroKPICard } from '@/components/dashboard/micro-kpi-card';
import { DetailedKPICard } from '@/components/dashboard/detailed-kpi-card';
import { RegionalKPICard } from '@/components/dashboard/regional-kpi-card';

// Import dummy data
import { kpiConfigs, kpiData } from '@/lib/mock-kpi-api-fixed';

export default function Dashboard() {
  // Filter KPIs by category and priority
  const employmentKPIs = kpiConfigs.filter(k => k.category === 'employment');
  const skillKPIs = kpiConfigs.filter(k => k.category === 'skills');
  const demographicsKPIs = kpiConfigs.filter(k => k.category === 'demographics');

  return (
    <>
      {/* Original KPIs */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <KpiCard
          title="Male Count (India)"
          value="7.2M"
          change="+5.5%"
          icon={<User className="h-5 w-5 text-muted-foreground" />}
          description="from last month"
        />
        <KpiCard
          title="Female Count (India)"
          value="6.1M"
          change="+15.2%"
          icon={<User className="h-5 w-5 text-muted-foreground" />}
          description="from last month"
        />
        <KpiCard
          title="Total Employment (India)"
          value="85%"
          change="+2.8%"
          icon={<Briefcase className="h-5 w-5 text-muted-foreground" />}
          description="from last month"
        />
        <KpiCard
          title="Unemployment Ratio (India)"
          value="7.6%"
          change="-0.5%"
          icon={<PieChart className="h-5 w-5 text-muted-foreground" />}
          description="from last month"
          changeType="negative"
        />
      </div>

      {/* Employment & Demographics KPIs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: '#008080' }}>
              Employment & Demographics
            </h2>
            <p className="text-muted-foreground">
              Comprehensive workforce participation and demographic analysis
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:gap-8 lg:grid-cols-6">
          {/* Working Age Population - Detailed KPI */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'working-age-population')!}
            data={kpiData['working-age-population']}
          />
          
          {/* NEET Rate - Detailed KPI */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'neet-rate')!}
            data={kpiData['neet-rate']}
          />

          {/* Labour Force Participation Rate - Detailed KPI */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'lfpr')!}
            data={kpiData['lfpr']}
          />
        </div>

        {/* Employment Rate - Regional KPI */}
        <RegionalKPICard 
          config={kpiConfigs.find(k => k.id === 'employment-rate')!}
          data={kpiData['employment-rate']}
        />
      </div>

      {/* Skills KPIs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: '#00A693' }}>
              Skills & Workforce Development
            </h2>
            <p className="text-muted-foreground">
              Digital skills, certifications, and multi-skilled workforce analysis
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:gap-8 lg:grid-cols-6">
          {/* Certified Workforce - Detailed KPI */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'certified-workforce')!}
            data={kpiData['certified-workforce']}
          />

          {/* Digital Skills - Detailed KPI */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'digital-skills')!}
            data={kpiData['digital-skills']}
          />

          {/* Multi-Skilled Workforce - Detailed KPI */}
          <DetailedKPICard 
            config={kpiConfigs.find(k => k.id === 'multi-skilled-workforce')!}
            data={kpiData['multi-skilled-workforce']}
          />
        </div>

        {/* Skill Density by Region - Regional KPI */}
        <RegionalKPICard 
          config={kpiConfigs.find(k => k.id === 'skill-density')!}
          data={kpiData['skill-density']}
        />
      </div>

      {/* Original sections */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <KpiCard
          title="Total Registered Users"
          value="1.2M"
          change="+12.5%"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          description="from last month"
        />
        <KpiCard
          title="Critical Skill Gaps"
          value="4,281"
          change="-3.2%"
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
          description="from last month"
          changeType="negative"
        />
        <KpiCard
          title="Aligned Training Programs"
          value="347"
          change="+21"
          icon={<BookCheck className="h-5 w-5 text-muted-foreground" />}
          description="new programs this quarter"
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-4 md:gap-8 lg:grid-cols-5">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
          <StateWiseGeographicalInsights />
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
