'use client';

import { ReactNode, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BarChart3, Map, TrendingUp } from 'lucide-react';
import ChartModal from './chart-modal';
import { KPIData, ChartData } from '@/lib/kpi-types';
import { SimpleKPIConfig } from '@/lib/mock-kpi-api-fixed';
import { getIcon } from '@/lib/icon-utils';

interface RegionalKPICardProps {
  config: SimpleKPIConfig;
  data: KPIData;
}

export function RegionalKPICard({ config, data }: RegionalKPICardProps) {
  const [showChart, setShowChart] = useState(false);

  const mockRegionalData: ChartData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [{
      label: 'Regional Values',
      data: [
        data.geographic?.regions.north || 75,
        data.geographic?.regions.south || 68,
        data.geographic?.regions.east || 72,
        data.geographic?.regions.west || 79,
        data.geographic?.regions.central || 71
      ],
      backgroundColor: [
        '#008080', '#00A693', '#4DCCCC', '#006666', '#FF7F50'
      ],
    }]
  };

  const getRegionColor = (value: number) => {
    if (value >= 75) return 'bg-green-100 text-green-800';
    if (value >= 65) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <>
      <Card className="col-span-full lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-lg font-semibold">{config.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Regional breakdown and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowChart(true)}
              className="h-8 px-3"
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              View Chart
            </Button>
            {getIcon(config.iconName)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* National Average */}
            <div className="col-span-2 lg:col-span-1 text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold" style={{ color: config.color }}>
                {data.geographic?.national || data.value}
              </div>
              <div className="text-sm text-muted-foreground">National Avg</div>
              {data.change && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  {data.change}
                </Badge>
              )}
            </div>

            {/* Regional Data */}
            {data.geographic && Object.entries(data.geographic.regions).map(([region, value]) => (
              <div key={region} className="text-center p-3 rounded-lg border">
                <div className="text-lg font-semibold">{value}%</div>
                <div className="text-sm capitalize text-muted-foreground">{region}</div>
                <Badge 
                  className={cn("mt-1 text-xs", getRegionColor(value))}
                  variant="secondary"
                >
                  {value >= 75 ? 'High' : value >= 65 ? 'Medium' : 'Low'}
                </Badge>
              </div>
            ))}
          </div>

          {/* Regional Map Visualization */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <svg 
                viewBox="0 0 300 200" 
                className="w-full h-auto border rounded-lg bg-gray-50"
              >
                {/* Simplified India regions */}
                <rect x="120" y="20" width="60" height="40" fill="#008080" opacity="0.7" rx="4" />
                <text x="150" y="42" textAnchor="middle" fontSize="10" fill="white">North</text>
                
                <rect x="60" y="80" width="60" height="40" fill="#00A693" opacity="0.7" rx="4" />
                <text x="90" y="102" textAnchor="middle" fontSize="10" fill="white">West</text>
                
                <rect x="120" y="80" width="60" height="40" fill="#4DCCCC" opacity="0.7" rx="4" />
                <text x="150" y="102" textAnchor="middle" fontSize="10" fill="white">Central</text>
                
                <rect x="180" y="80" width="60" height="40" fill="#006666" opacity="0.7" rx="4" />
                <text x="210" y="102" textAnchor="middle" fontSize="10" fill="white">East</text>
                
                <rect x="120" y="140" width="60" height="40" fill="#FF7F50" opacity="0.7" rx="4" />
                <text x="150" y="162" textAnchor="middle" fontSize="10" fill="white">South</text>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChartModal
        isOpen={showChart}
        onClose={() => setShowChart(false)}
        title={`${config.title} - Regional Comparison`}
        data={mockRegionalData}
        config={{
          type: 'bar',
          title: 'Regional Distribution',
          xAxisLabel: 'Region',
          yAxisLabel: 'Percentage',
          colors: ['#008080', '#00A693', '#4DCCCC', '#006666', '#FF7F50'],
          showLegend: true
        }}
      />
    </>
  );
}