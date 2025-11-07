'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const heatmapBg = PlaceHolderImages.find(p => p.id === 'heatmap-bg');

const skillGapData = {
  north: 'high',
  south: 'medium',
  east: 'low',
  west: 'high',
  central: 'medium'
};

const getRegionColor = (region: keyof typeof skillGapData) => {
  switch (skillGapData[region]) {
    case 'high':
      return 'bg-red-500/70';
    case 'medium':
      return 'bg-yellow-500/70';
    case 'low':
      return 'bg-green-500/70';
    default:
      return 'bg-gray-500/70';
  }
};

export default function GeographicalHeatmap() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Geographical Insights</CardTitle>
            <CardDescription>Unemployment rates and skill shortages across regions.</CardDescription>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Select defaultValue="skill_shortage">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unemployment">Unemployment</SelectItem>
                <SelectItem value="skill_shortage">Skill Shortage</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] flex items-center justify-center">
            {heatmapBg && (
                <Image
                src={heatmapBg.imageUrl}
                alt="India Map"
                layout="fill"
                objectFit="contain"
                data-ai-hint={heatmapBg.imageHint}
                />
            )}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-4">
                {/* North */}
                <div className={`relative col-start-2 row-start-1 flex items-center justify-center`}>
                    <div className={`h-8 w-8 rounded-full ${getRegionColor('north')}`}></div>
                </div>
                {/* West */}
                <div className="relative col-start-1 row-start-2 flex items-center justify-center">
                    <div className={`h-8 w-8 rounded-full ${getRegionColor('west')}`}></div>
                </div>
                {/* Central */}
                <div className="relative col-start-2 row-start-2 flex items-center justify-center">
                    <div className={`h-8 w-8 rounded-full ${getRegionColor('central')}`}></div>
                </div>
                {/* East */}
                <div className="relative col-start-3 row-start-2 flex items-center justify-center">
                    <div className={`h-8 w-8 rounded-full ${getRegionColor('east')}`}></div>
                </div>
                {/* South */}
                <div className="relative col-start-2 row-start-3 flex items-center justify-center">
                    <div className={`h-8 w-8 rounded-full ${getRegionColor('south')}`}></div>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-red-500/70"></div>
            <span>High Skill Gap</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-yellow-500/70"></div>
            <span>Medium Skill Gap</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-green-500/70"></div>
            <span>Low Skill Gap</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
