'use client';

import { cn } from '@/lib/utils';

type IndiaMapProps = {
  data: {
    [key: string]: 'critical' | 'high' | 'medium' | 'low' | undefined;
  };
};

export function IndiaMap({ data }: IndiaMapProps) {
  const getRegionClass = (region: string) => {
    switch (data?.[region]) {
      case 'critical':
        return 'fill-red-600/70 hover:fill-red-600';
      case 'high':
        return 'fill-orange-600/70 hover:fill-orange-600';
      case 'medium':
        return 'fill-yellow-500/70 hover:fill-yellow-500';
      case 'low':
        return 'fill-green-500/70 hover:fill-green-500';
      default:
        return 'fill-muted/50 hover:fill-muted';
    }
  };

  return (
    <svg
      viewBox="120 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full object-contain"
    >
      <g className="transition-all duration-300">
        <path
          id="north"
          title="North India"
          className={cn('stroke-background stroke-2', getRegionClass('north'))}
          d="M370 50 L400 120 L480 150 L520 80 L450 40 Z M400 120 L350 200 L450 250 L500 180 Z"
        />
        <path
          id="west"
          title="West India"
          className={cn('stroke-background stroke-2', getRegionClass('west'))}
          d="M250 200 L350 200 L380 350 L280 400 L230 250 Z"
        />
        <path
          id="central"
          title="Central India"
          className={cn('stroke-background stroke-2', getRegionClass('central'))}
          d="M350 250 L480 260 L500 400 L380 350 Z"
        />
        <path
          id="east"
          title="East India"
          className={cn('stroke-background stroke-2', getRegionClass('east'))}
          d="M480 150 L650 200 L600 350 L500 400 L500 180 Z"
        />
        <path
          id="south"
          title="South India"
          className={cn('stroke-background stroke-2', getRegionClass('south'))}
          d="M380 350 L500 400 L450 600 L350 550 Z"
        />
         <path
          id="north-east"
          title="North-East India"
          className={cn('stroke-background stroke-2', getRegionClass('east'))}
          d="M650 200 L720 220 L680 300 L600 350 Z"
        />
      </g>
    </svg>
  );
}
