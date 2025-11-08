'use client';

import { ReactNode, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BarChart3, Eye, MapPin } from 'lucide-react';
import { KPIData, ChartData } from '@/lib/kpi-types';
import { SimpleKPIConfig } from '@/lib/mock-kpi-api-fixed';
import { getIcon } from '@/lib/icon-utils';
import ChartModal from './chart-modal';

interface MicroKPICardProps {
  config: SimpleKPIConfig;
  data: KPIData;
}

export function MicroKPICard({ config, data }: MicroKPICardProps) {
  const [showChart, setShowChart] = useState(false);

  const mockChartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: config.title,
      data: [65, 68, 67, 69, 68, 70],
      backgroundColor: config.color,
      borderColor: config.color,
    }]
  };

  return (
    <>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{config.title}</CardTitle>
          <div className="flex items-center gap-1">
            {config.hasChart && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChart(true)}
                className="h-6 w-6 p-0"
              >
                <BarChart3 className="h-3 w-3" />
              </Button>
            )}
            {getIcon(config.iconName)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" style={{ color: config.color }}>
            {data.value}
          </div>
          {data.change && (
            <p className="text-xs text-muted-foreground">
              <span
                className={cn(
                  'font-semibold',
                  data.changeType === 'positive' ? 'text-green-600' : 
                  data.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                )}
              >
                {data.change}
              </span>{' '}
              {data.description}
            </p>
          )}
        </CardContent>
      </Card>

      {config.hasChart && (
        <ChartModal
          isOpen={showChart}
          onClose={() => setShowChart(false)}
          title={config.title}
          data={mockChartData}
          config={{
            type: 'line',
            title: config.title,
            xAxisLabel: 'Period',
            yAxisLabel: 'Value',
            colors: [config.color],
            showLegend: false
          }}
        />
      )}
    </>
  );
}