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
                className="object-contain"
                data-ai-hint={mapImage.imageHint}
            />
          )}
          {/* Mock heatmap points for skill gaps in India */}
          <div className="absolute top-[28%] left-[43%]" title="Delhi: High demand for AI/ML skills">
            <div className="w-5 h-5 bg-red-500/50 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute top-[75%] left-[45%]" title="Bangalore: Critical shortage of Data Scientists">
            <div className="w-8 h-8 bg-red-600/60 rounded-full animate-pulse delay-200"></div>
          </div>
          <div className="absolute top-[55%] left-[30%]" title="Mumbai: Need for financial analysts">
            <div className="w-7 h-7 bg-orange-600/60 rounded-full animate-pulse delay-400"></div>
          </div>
          <div className="absolute top-[48%] left-[68%]" title="Kolkata: Growing need for digital marketing skills">
            <div className="w-4 h-4 bg-yellow-500/50 rounded-full animate-pulse delay-100"></div>
          </div>
          <div className="absolute top-[85%] left-[48%]" title="Chennai: Surplus of IT support staff">
            <div className="w-5 h-5 bg-green-500/50 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}