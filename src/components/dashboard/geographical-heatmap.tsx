'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BarChart3, MapPin, TrendingUp, Users, Briefcase } from 'lucide-react';
import ChartModal from './chart-modal';
import { ChartData } from '@/lib/kpi-types';

// Enhanced regional data with multiple metrics
const regionalData = {
  north: {
    skillGap: 'high',
    unemployment: 6.8,
    employmentRate: 87.2,
    skillDensity: 3.1,
    workingPopulation: 210,
    coordinates: { x: 337, y: 180 } // Approximate coordinates on your SVG
  },
  south: {
    skillGap: 'medium',
    unemployment: 4.2,
    employmentRate: 84.1,
    skillDensity: 3.8,
    workingPopulation: 185,
    coordinates: { x: 400, y: 520 }
  },
  east: {
    skillGap: 'low',
    unemployment: 8.1,
    employmentRate: 82.3,
    skillDensity: 2.9,
    workingPopulation: 165,
    coordinates: { x: 520, y: 350 }
  },
  west: {
    skillGap: 'high',
    unemployment: 5.5,
    employmentRate: 88.4,
    skillDensity: 3.4,
    workingPopulation: 195,
    coordinates: { x: 220, y: 320 }
  },
  central: {
    skillGap: 'medium',
    unemployment: 7.2,
    employmentRate: 85.0,
    skillDensity: 2.8,
    workingPopulation: 135,
    coordinates: { x: 380, y: 300 }
  }
};

type MetricType = 'skill_shortage' | 'unemployment' | 'employment_rate' | 'skill_density';
type RegionKey = keyof typeof regionalData;

const getMetricValue = (region: RegionKey, metric: MetricType) => {
  const data = regionalData[region];
  switch (metric) {
    case 'skill_shortage':
      return data.skillGap === 'high' ? 85 : data.skillGap === 'medium' ? 60 : 35;
    case 'unemployment':
      return data.unemployment;
    case 'employment_rate':
      return data.employmentRate;
    case 'skill_density':
      return data.skillDensity;
    default:
      return 0;
  }
};

const getRegionColor = (region: RegionKey, metric: MetricType) => {
  const value = getMetricValue(region, metric);
  
  switch (metric) {
    case 'skill_shortage':
      if (value >= 80) return '#FF7F50'; // High - Coral (blueprint accent)
      if (value >= 50) return '#FFB399'; // Medium - Light coral
      return '#00A693'; // Low - Teal-green
    case 'unemployment':
      if (value >= 7) return '#FF7F50'; // High unemployment - Red
      if (value >= 5) return '#FFB399'; // Medium unemployment - Orange
      return '#00A693'; // Low unemployment - Green
    case 'employment_rate':
      if (value >= 85) return '#00A693'; // High employment - Green
      if (value >= 80) return '#FFB399'; // Medium employment - Orange
      return '#FF7F50'; // Low employment - Red
    case 'skill_density':
      if (value >= 3.5) return '#00A693'; // High density - Green
      if (value >= 3.0) return '#FFB399'; // Medium density - Orange
      return '#FF7F50'; // Low density - Red
    default:
      return '#008080';
  }
};

const getMetricLabel = (metric: MetricType) => {
  switch (metric) {
    case 'skill_shortage': return 'Skill Shortage';
    case 'unemployment': return 'Unemployment Rate';
    case 'employment_rate': return 'Employment Rate';
    case 'skill_density': return 'Skill Density';
    default: return 'Unknown';
  }
};

export default function GeographicalHeatmap() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('skill_shortage');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null);
  const [showChart, setShowChart] = useState(false);

  const chartData: ChartData = {
    labels: Object.keys(regionalData).map(region => 
      region.charAt(0).toUpperCase() + region.slice(1)
    ),
    datasets: [{
      label: getMetricLabel(selectedMetric),
      data: Object.keys(regionalData).map(region => 
        getMetricValue(region as RegionKey, selectedMetric)
      ),
      backgroundColor: Object.keys(regionalData).map(region => 
        getRegionColor(region as RegionKey, selectedMetric)
      ),
    }]
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Geographical Insights</CardTitle>
              <CardDescription>
                Interactive workforce analytics across Indian regions
              </CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Select 
                value={selectedMetric} 
                onValueChange={(value) => setSelectedMetric(value as MetricType)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skill_shortage">Skill Shortage</SelectItem>
                  <SelectItem value="unemployment">Unemployment</SelectItem>
                  <SelectItem value="employment_rate">Employment Rate</SelectItem>
                  <SelectItem value="skill_density">Skill Density</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChart(true)}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Chart
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Custom SVG India Map */}
            <svg 
              width="675" 
              height="754" 
              viewBox="0 0 675 754" 
              className="w-full h-full max-w-md max-h-96"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* India outline - simplified path */}
              <path 
                d="M200 150 Q250 120 300 130 Q350 125 400 140 Q450 135 500 150 Q520 180 530 220 Q535 260 525 300 Q520 340 510 380 Q500 420 480 460 Q460 500 440 530 Q420 550 400 560 Q380 565 360 555 Q340 550 320 545 Q300 540 280 535 Q260 530 240 520 Q220 500 210 480 Q200 450 195 420 Q190 380 185 340 Q180 300 175 260 Q170 220 180 180 Q190 160 200 150 Z" 
                fill="#E0F8F8" 
                stroke="#008080" 
                strokeWidth="2"
                className="hover:fill-primary/10 transition-colors"
              />
              
              {/* Regional Pointers */}
              {Object.entries(regionalData).map(([regionKey, region]) => {
                const regionData = region as typeof regionalData.north;
                return (
                  <g key={regionKey}>
                    {/* Pointer Circle */}
                    <circle
                      cx={regionData.coordinates.x}
                      cy={regionData.coordinates.y}
                      r="12"
                      fill={getRegionColor(regionKey as RegionKey, selectedMetric)}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
                      onClick={() => setSelectedRegion(regionKey as RegionKey)}
                    />
                    
                    {/* Pointer Icon */}
                    <foreignObject
                      x={regionData.coordinates.x - 6}
                      y={regionData.coordinates.y - 6}
                      width="12"
                      height="12"
                      className="pointer-events-none"
                    >
                      <MapPin className="w-3 h-3 text-white" />
                    </foreignObject>
                    
                    {/* Region Label */}
                    <text
                      x={regionData.coordinates.x}
                      y={regionData.coordinates.y + 25}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#008080"
                      fontWeight="600"
                      className="pointer-events-none"
                    >
                      {regionKey.charAt(0).toUpperCase() + regionKey.slice(1)}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Selected Region Details */}
            {selectedRegion && (
              <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg capitalize" style={{ color: '#008080' }}>
                    {selectedRegion} Region
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRegion(null)}
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Unemployment:</span>
                    <Badge variant="secondary">
                      {regionalData[selectedRegion].unemployment}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Employment Rate:</span>
                    <Badge variant="secondary">
                      {regionalData[selectedRegion].employmentRate}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Skill Density:</span>
                    <Badge variant="secondary">
                      {regionalData[selectedRegion].skillDensity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Working Population:</span>
                    <Badge variant="secondary">
                      {regionalData[selectedRegion].workingPopulation}M
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-4 text-xs">
            <div className="flex items-center space-x-2">
              <div 
                className="h-4 w-4 rounded-full" 
                style={{ backgroundColor: getRegionColor('north', selectedMetric) }}
              />
              <span>High {getMetricLabel(selectedMetric)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="h-4 w-4 rounded-full" 
                style={{ backgroundColor: '#FFB399' }}
              />
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div 
                className="h-4 w-4 rounded-full" 
                style={{ backgroundColor: '#00A693' }}
              />
              <span>Low</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold" style={{ color: '#008080' }}>890M</div>
              <div className="text-xs text-muted-foreground">Total Population</div>
            </div>
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold" style={{ color: '#008080' }}>68.5%</div>
              <div className="text-xs text-muted-foreground">Avg LFPR</div>
            </div>
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <Briefcase className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold" style={{ color: '#008080' }}>85.2%</div>
              <div className="text-xs text-muted-foreground">Employment Rate</div>
            </div>
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <BarChart3 className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-lg font-bold" style={{ color: '#008080' }}>3.2</div>
              <div className="text-xs text-muted-foreground">Skill Density</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChartModal
        isOpen={showChart}
        onClose={() => setShowChart(false)}
        title={`Regional ${getMetricLabel(selectedMetric)} Analysis`}
        data={chartData}
        config={{
          type: 'bar',
          title: `Regional ${getMetricLabel(selectedMetric)}`,
          xAxisLabel: 'Region',
          yAxisLabel: selectedMetric === 'unemployment' ? 'Percentage (%)' : 
                     selectedMetric === 'employment_rate' ? 'Percentage (%)' :
                     selectedMetric === 'skill_density' ? 'Density Score' : 'Shortage Level',
          colors: Object.keys(regionalData).map(region => 
            getRegionColor(region as RegionKey, selectedMetric)
          ),
          showLegend: true
        }}
      />
    </>
  );
}
