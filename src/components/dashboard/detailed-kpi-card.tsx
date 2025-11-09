'use client';

import { ReactNode, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { BarChart3, Users, MapPin } from 'lucide-react';
import ChartModal from './chart-modal';
import { KPIData, ChartData } from '@/lib/kpi-types';
import { SimpleKPIConfig } from '@/lib/mock-kpi-api-fixed';
import { getIcon } from '@/lib/icon-utils';

interface DetailedKPICardProps {
  config: SimpleKPIConfig;
  data: KPIData;
}

export function DetailedKPICard({ config, data }: DetailedKPICardProps) {
  const [showChart, setShowChart] = useState(false);
  const [showGeographic, setShowGeographic] = useState(false);

  // Prepare chart data - use trend data if available, otherwise use breakdowns
  const chartDataSource = data.trend || data.breakdowns;
  
  const mockChartData: ChartData = {
    labels: data.trend 
      ? data.trend.map(t => t.period) 
      : (data.breakdowns?.map(b => b.label) || []),
    datasets: [{
      label: config.title,
      data: data.trend 
        ? data.trend.map(t => t.value) 
        : (data.breakdowns?.map(b => b.value) || []),
      backgroundColor: data.trend 
        ? Array(data.trend.length).fill(config.color)
        : (data.breakdowns?.map(b => b.color || config.color) || []),
      borderColor: config.color,
    }]
  };

  const mockGeographicData: ChartData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [{
      label: 'Regional Distribution',
      data: [78.2, 65.4, 72.1, 68.5, 70.3],
      backgroundColor: [
        '#008080', '#00A693', '#4DCCCC', '#006666', '#FF7F50'
      ],
    }]
  };

  return (
    <>
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-base font-medium">{config.title}</CardTitle>
            {config.description && (
              <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {config.hasGeography && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowGeographic(true)}
                className="h-8 w-8 p-0"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            )}
            {config.hasChart && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChart(true)}
                className="h-8 w-8 p-0"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            )}
            {getIcon(config.iconName)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold" style={{ color: config.color }}>
              {data.value}
            </div>
            {data.change && (
              <Badge 
                variant={data.changeType === 'positive' ? 'default' : 'destructive'}
                className="ml-2"
              >
                {data.change}
              </Badge>
            )}
          </div>

          {data.breakdowns && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Breakdown:</h4>
              {data.breakdowns.map((breakdown, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{breakdown.label}</span>
                    <span className="font-medium">{breakdown.value}%</span>
                  </div>
                  <Progress 
                    value={breakdown.percentage || breakdown.value} 
                    className="h-2"
                    style={{ 
                      '--progress-background': breakdown.color || config.color 
                    } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {data.description}
          </p>
        </CardContent>
      </Card>

      {config.hasChart && (
        <ChartModal
          isOpen={showChart}
          onClose={() => setShowChart(false)}
          title={`${config.title} - ${data.trend ? 'Trend Analysis' : 'Breakdown Analysis'}`}
          data={mockChartData}
          config={{
            type: data.trend ? 'line' : 'bar',
            title: config.title,
            xAxisLabel: data.trend ? 'Period' : 'Category',
            yAxisLabel: data.trend ? 'Value' : 'Percentage',
            colors: data.trend 
              ? [config.color]
              : (data.breakdowns?.map(b => b.color || config.color) || [config.color]),
            showLegend: true
          }}
        />
      )}

      {config.hasGeography && (
        <ChartModal
          isOpen={showGeographic}
          onClose={() => setShowGeographic(false)}
          title={`${config.title} - Regional Distribution`}
          data={mockGeographicData}
          config={{
            type: 'pie',
            title: 'Regional Distribution',
            colors: ['#008080', '#00A693', '#4DCCCC', '#006666', '#FF7F50'],
            showLegend: true
          }}
        />
      )}
    </>
  );
}