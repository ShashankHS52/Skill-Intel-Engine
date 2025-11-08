'use client';

import { ReactNode, createElement } from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Target, 
  BookCheck, 
  Zap, 
  Award, 
  Layers,
  PieChart,
  Activity,
  BarChart3,
  User
} from 'lucide-react';

// Icon mapping utility for dynamic icon rendering
export const getIcon = (iconName: string, className: string = 'h-4 w-4'): ReactNode => {
  const iconComponents = {
    'users': Users,
    'briefcase': Briefcase,
    'trending-up': TrendingUp,
    'target': Target,
    'book-check': BookCheck,
    'zap': Zap,
    'award': Award,
    'layers': Layers,
    'pie-chart': PieChart,
    'activity': Activity,
    'bar-chart': BarChart3,
    'user': User
  };
  
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || Activity;
  return createElement(IconComponent, { className });
};