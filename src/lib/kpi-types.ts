import { ReactNode } from 'react';

// Geographic data structure
export interface RegionalData {
  national: number;
  regions: {
    north: number;
    south: number;
    east: number;
    west: number;
    central: number;
  };
  states?: Record<string, number>;
}

// Chart configuration
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  title: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
  showLegend?: boolean;
}

// KPI breakdown data
export interface KPIBreakdown {
  label: string;
  value: number;
  percentage?: number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

// Trend data for time series
export interface TrendData {
  period: string;
  value: number;
  target?: number;
}

// Enhanced KPI data structure
export interface KPIData {
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description: string;
  breakdowns?: KPIBreakdown[];
  geographic?: RegionalData;
  trend?: TrendData[];
  chartConfig?: ChartConfig;
  lastUpdated?: string;
}

// KPI configuration
export interface KPIConfig {
  id: string;
  category: 'employment' | 'skills' | 'demographics' | 'risk';
  type: 'micro' | 'standard' | 'detailed' | 'regional' | 'composite';
  title: string;
  description?: string;
  icon: ReactNode;
  hasGeography: boolean;
  hasBreakdowns: boolean;
  hasChart: boolean;
  priority: 'high' | 'medium' | 'low';
  color: string;
}

// Chart data structure for visualization
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Modal chart view props
export interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: ChartData;
  config: ChartConfig;
}