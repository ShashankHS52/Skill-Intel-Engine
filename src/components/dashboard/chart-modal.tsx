'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartModalProps, ChartData } from '@/lib/kpi-types';

export default function ChartModal({ isOpen, onClose, title, data, config }: ChartModalProps) {
  // Transform data for recharts format
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0]?.data[index] || 0,
    ...data.datasets.reduce((acc, dataset, datasetIndex) => ({
      ...acc,
      [`dataset${datasetIndex}`]: dataset.data[index] || 0
    }), {})
  }));

  const renderChart = () => {
    const colors = config.colors || ['#008080', '#00A693', '#FF7F50', '#4DCCCC', '#E5673D'];

    switch (config.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {data.datasets.map((dataset, index) => (
                <Bar 
                  key={index}
                  dataKey={`dataset${index}`} 
                  fill={colors[index % colors.length]}
                  name={dataset.label}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {data.datasets.map((dataset, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={`dataset${index}`} 
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  name={dataset.label}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case 'doughnut':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={config.type === 'doughnut' ? 60 : 0}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="flex items-center justify-center h-400">Chart type not supported</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ChartContainer
            config={{
              value: {
                label: config.yAxisLabel || "Value",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[400px]"
          >
            {renderChart()}
          </ChartContainer>
          {config.showLegend && (
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              {data.datasets.map((dataset, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: config.colors?.[index] || '#008080' }}
                  />
                  <span className="text-sm">{dataset.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}