import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const mapImage = PlaceHolderImages.find(p => p.id === 'heatmap-bg');

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
            <Select defaultValue="unemployment">
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
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="north">North District</SelectItem>
                <SelectItem value="south">South District</SelectItem>
                <SelectItem value="east">East District</SelectItem>
                <SelectItem value="west">West District</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border">
          {mapImage && (
            <Image
                src={mapImage.imageUrl}
                alt="Geographical Heatmap"
                fill
                style={{ objectFit: 'cover' }}
                className="opacity-50"
                data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground font-semibold bg-background/80 px-4 py-2 rounded-lg">
              Heatmap visualization
            </p>
          </div>
          {/* Mock heatmap points */}
          <div className="absolute top-[20%] left-[30%] w-8 h-8 bg-red-500/50 rounded-full animate-pulse"></div>
          <div className="absolute top-[50%] left-[50%] w-12 h-12 bg-red-600/60 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-[60%] left-[70%] w-6 h-6 bg-yellow-500/50 rounded-full animate-pulse delay-100"></div>
          <div className="absolute top-[35%] left-[65%] w-4 h-4 bg-green-500/50 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-[75%] left-[25%] w-10 h-10 bg-orange-600/60 rounded-full animate-pulse delay-400"></div>
        </div>
      </CardContent>
    </Card>
  );
}
