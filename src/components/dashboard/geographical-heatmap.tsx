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
          {mapImage && (
            <Image
                src={mapImage.imageUrl}
                alt="Geographical Heatmap of India"
                fill
                style={{ objectFit: 'contain' }}
                className="opacity-50"
                data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground font-semibold bg-background/80 px-4 py-2 rounded-lg">
              Skill Gap Heatmap
            </p>
          </div>
          {/* Mock heatmap points for skill gaps in India */}
          <div className="absolute top-[25%] left-[40%] w-8 h-8 bg-red-500/50 rounded-full animate-pulse" title="Delhi: High demand for AI/ML skills"></div>
          <div className="absolute top-[70%] left-[55%] w-12 h-12 bg-red-600/60 rounded-full animate-pulse delay-200" title="Bangalore: Critical shortage of Data Scientists"></div>
          <div className="absolute top-[50%] left-[20%] w-10 h-10 bg-orange-600/60 rounded-full animate-pulse delay-400" title="Mumbai: Need for financial analysts"></div>
          <div className="absolute top-[30%] left-[80%] w-6 h-6 bg-yellow-500/50 rounded-full animate-pulse delay-100" title="Kolkata: Growing need for digital marketing skills"></div>
          <div className="absolute top-[85%] left-[65%] w-7 h-7 bg-green-500/50 rounded-full animate-pulse delay-300" title="Chennai: Surplus of IT support staff"></div>
        </div>
      </CardContent>
    </Card>
  );
}
