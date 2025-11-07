import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndiaMap } from './india-map';

const skillGapData = {
  north: 'high',
  south: 'critical',
  west: 'medium',
  east: 'low',
  central: 'medium'
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
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
          <IndiaMap data={skillGapData} />
        </div>
         <div className="flex justify-end items-center gap-4 text-xs mt-2 text-muted-foreground">
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                <span>Low</span>
            </div>
             <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <span>Medium</span>
            </div>
             <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-600/70"></div>
                <span>High</span>
            </div>
             <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-600/70"></div>
                <span>Critical</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
