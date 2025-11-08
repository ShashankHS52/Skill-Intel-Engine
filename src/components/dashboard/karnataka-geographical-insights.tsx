'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, MapPin, Info, TrendingUp, Users, Briefcase, Award, Star, AlertTriangle } from 'lucide-react';
import ChartModal from './chart-modal';
import { ChartData } from '@/lib/kpi-types';
import { 
  karnatakaDistrictData, 
  karnatakaOverview,
  DistrictData, 
  DistrictMetric, 
  getDistrictColor, 
  getDistrictMetricLabel, 
  getDistrictMetricValue 
} from '@/lib/karnataka-data';
import { KarnatakaSVGComponent } from '@/components/ui/karnataka-svg';

interface KarnatakaMapProps {
  selectedMetric: DistrictMetric;
  onDistrictHover: (districtId: string | null) => void;
  onDistrictClick: (districtId: string) => void;
  hoveredDistrict: string | null;
  selectedDistrict: string | null;
}

function KarnatakaMap({ 
  selectedMetric, 
  onDistrictHover, 
  onDistrictClick, 
  hoveredDistrict,
  selectedDistrict 
}: KarnatakaMapProps) {
  const getDistrictColorForMetric = (districtId: string) => {
    return getDistrictColor(districtId, selectedMetric);
  };
  
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden">
      {/* Karnataka State Info Header */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border-2 border-green-500 z-10">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <h3 className="font-bold text-lg text-green-800">Karnataka State</h3>
        </div>
        <div className="text-sm space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Capital:</span>
            <span className="font-medium text-green-800">{karnatakaOverview.capital}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Districts:</span>
            <span className="font-medium text-green-800">{karnatakaOverview.totalDistricts}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-600">Working Pop:</span>
            <span className="font-medium text-green-800">{karnatakaOverview.totalWorkingPopulation}M</span>
          </div>
        </div>
      </div>

      {/* Current Metric Info */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border z-10">
        <div className="text-center">
          <div className="text-sm font-semibold text-gray-800 mb-1">Current Metric</div>
          <div className="text-xs text-gray-600">{getDistrictMetricLabel(selectedMetric)}</div>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="flex items-center justify-center h-full pt-20 pb-4">
        <div className="relative">
          <KarnatakaSVGComponent
            onDistrictHover={onDistrictHover}
            onDistrictClick={onDistrictClick}
            hoveredDistrict={hoveredDistrict}
            selectedDistrict={selectedDistrict}
            getDistrictColor={getDistrictColorForMetric}
          />
          
          {/* Bengaluru Capital Star */}
          <div 
            className="absolute pointer-events-none animate-pulse"
            style={{ 
              left: `${(335 / 600) * 100}%`, 
              top: `${(405 / 500) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Star className="h-6 w-6 text-orange-500 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Performance Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-10">
        <div className="text-sm font-semibold mb-3 text-center">Performance Scale</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#00A693' }}></div>
            <span>Excellent</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#4DCCCC' }}></div>
            <span>Good</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#FFB399' }}></div>
            <span>Needs Improvement</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 rounded border" style={{ backgroundColor: '#FF7F50' }}></div>
            <span>Requires Attention</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Star className="h-3 w-3 text-orange-500" />
            <span>State Capital</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KarnatakaGeographicalInsights() {
  const [selectedMetric, setSelectedMetric] = useState<DistrictMetric>('unemployment');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>('bengaluru-urban');
  const [showChart, setShowChart] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');

  const handleDistrictHover = useCallback((districtId: string | null) => {
    setHoveredDistrict(districtId);
  }, []);

  const handleDistrictClick = useCallback((districtId: string) => {
    setSelectedDistrict(selectedDistrict === districtId ? null : districtId);
  }, [selectedDistrict]);

  // Prepare chart data
  const chartData: ChartData = {
    labels: Object.values(karnatakaDistrictData)
      .sort((a, b) => {
        const aValue = selectedMetric === 'unemployment' ? a.unemployment :
                      selectedMetric === 'employment_rate' ? a.employmentRate :
                      selectedMetric === 'skill_density' ? a.skillDensity :
                      selectedMetric === 'digital_skills' ? a.digitalSkills :
                      selectedMetric === 'certified_workforce' ? a.certifiedWorkforce : 0;
        const bValue = selectedMetric === 'unemployment' ? b.unemployment :
                      selectedMetric === 'employment_rate' ? b.employmentRate :
                      selectedMetric === 'skill_density' ? b.skillDensity :
                      selectedMetric === 'digital_skills' ? b.digitalSkills :
                      selectedMetric === 'certified_workforce' ? b.certifiedWorkforce : 0;
        return selectedMetric === 'unemployment' ? aValue - bValue : bValue - aValue;
      })
      .slice(0, 10)
      .map(district => district.name.length > 12 ? district.name.substring(0, 10) + '...' : district.name),
    datasets: [{
      label: getDistrictMetricLabel(selectedMetric),
      data: Object.values(karnatakaDistrictData)
        .sort((a, b) => {
          const aValue = selectedMetric === 'unemployment' ? a.unemployment :
                        selectedMetric === 'employment_rate' ? a.employmentRate :
                        selectedMetric === 'skill_density' ? a.skillDensity :
                        selectedMetric === 'digital_skills' ? a.digitalSkills :
                        selectedMetric === 'certified_workforce' ? a.certifiedWorkforce : 0;
          const bValue = selectedMetric === 'unemployment' ? b.unemployment :
                        selectedMetric === 'employment_rate' ? b.employmentRate :
                        selectedMetric === 'skill_density' ? b.skillDensity :
                        selectedMetric === 'digital_skills' ? b.digitalSkills :
                        selectedMetric === 'certified_workforce' ? b.certifiedWorkforce : 0;
          return selectedMetric === 'unemployment' ? aValue - bValue : bValue - aValue;
        })
        .slice(0, 10)
        .map(district => {
          return selectedMetric === 'unemployment' ? district.unemployment :
                 selectedMetric === 'employment_rate' ? district.employmentRate :
                 selectedMetric === 'skill_density' ? district.skillDensity :
                 selectedMetric === 'digital_skills' ? district.digitalSkills :
                 selectedMetric === 'certified_workforce' ? district.certifiedWorkforce : 0;
        }),
      backgroundColor: Object.values(karnatakaDistrictData)
        .sort((a, b) => {
          const aValue = selectedMetric === 'unemployment' ? a.unemployment :
                        selectedMetric === 'employment_rate' ? a.employmentRate :
                        selectedMetric === 'skill_density' ? a.skillDensity :
                        selectedMetric === 'digital_skills' ? a.digitalSkills :
                        selectedMetric === 'certified_workforce' ? a.certifiedWorkforce : 0;
          const bValue = selectedMetric === 'unemployment' ? b.unemployment :
                        selectedMetric === 'employment_rate' ? b.employmentRate :
                        selectedMetric === 'skill_density' ? b.skillDensity :
                        selectedMetric === 'digital_skills' ? b.digitalSkills :
                        selectedMetric === 'certified_workforce' ? b.certifiedWorkforce : 0;
          return selectedMetric === 'unemployment' ? aValue - bValue : bValue - aValue;
        })
        .slice(0, 10)
        .map(district => getDistrictColor(district.id, selectedMetric)),
    }]
  };

  // Get top and bottom performing districts
  const sortedDistricts = Object.values(karnatakaDistrictData).sort((a, b) => {
    const aValue = selectedMetric === 'unemployment' ? a.unemployment :
                  selectedMetric === 'employment_rate' ? a.employmentRate :
                  selectedMetric === 'skill_density' ? a.skillDensity :
                  selectedMetric === 'digital_skills' ? a.digitalSkills :
                  selectedMetric === 'certified_workforce' ? a.certifiedWorkforce : 0;
    const bValue = selectedMetric === 'unemployment' ? b.unemployment :
                  selectedMetric === 'employment_rate' ? b.employmentRate :
                  selectedMetric === 'skill_density' ? b.skillDensity :
                  selectedMetric === 'digital_skills' ? b.digitalSkills :
                  selectedMetric === 'certified_workforce' ? b.certifiedWorkforce : 0;
    return selectedMetric === 'unemployment' ? aValue - bValue : bValue - aValue;
  });

  const topDistricts = selectedMetric === 'unemployment' ? sortedDistricts.slice(0, 5) : sortedDistricts.slice(0, 5);
  const bottomDistricts = selectedMetric === 'unemployment' ? sortedDistricts.slice(-5).reverse() : sortedDistricts.slice(-5).reverse();

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" style={{ color: '#008080' }} />
                Karnataka District-wise Workforce Insights
              </CardTitle>
              <CardDescription>
                Comprehensive district-level workforce analytics across Karnataka
              </CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Select 
                value={selectedMetric} 
                onValueChange={(value) => setSelectedMetric(value as DistrictMetric)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unemployment">Unemployment Rate</SelectItem>
                  <SelectItem value="employment_rate">Employment Rate</SelectItem>
                  <SelectItem value="skill_density">Skill Density</SelectItem>
                  <SelectItem value="skill_gap">Skill Gap Level</SelectItem>
                  <SelectItem value="digital_skills">Digital Skills</SelectItem>
                  <SelectItem value="certified_workforce">Certified Workforce</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowChart(true)}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Chart
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
              <TabsTrigger value="insights">Karnataka Overview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="top-performers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Best Performing Districts ({getDistrictMetricLabel(selectedMetric)})
                  </h4>
                  <div className="space-y-2">
                    {topDistricts.map((district, index) => (
                      <div key={district.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span>{district.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {getDistrictMetricValue(district.id, selectedMetric)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-700 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Districts Needing Attention
                  </h4>
                  <div className="space-y-2">
                    {bottomDistricts.map((district, index) => (
                      <div key={district.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span>{district.name}</span>
                        </div>
                        <Badge variant="destructive">
                          {getDistrictMetricValue(district.id, selectedMetric)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              {/* Karnataka Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {karnatakaOverview.totalWorkingPopulation}M
                  </div>
                  <div className="text-sm text-muted-foreground">Working Population</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {karnatakaOverview.averageEmploymentRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Employment Rate</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Briefcase className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {karnatakaOverview.averageUnemployment}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Unemployment</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Award className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {karnatakaOverview.averageDigitalSkills}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Digital Skills</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Strengths */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-green-900 mb-2">Key Strengths</h5>
                      <ul className="text-sm text-green-800 space-y-1">
                        {karnatakaOverview.keyStrengths.map((strength, index) => (
                          <li key={index}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Challenges */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-orange-900 mb-2">Key Challenges</h5>
                      <ul className="text-sm text-orange-800 space-y-1">
                        {karnatakaOverview.challenges.map((challenge, index) => (
                          <li key={index}>• {challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Sectors */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-2">Major Economic Sectors in Karnataka</h5>
                    <div className="flex flex-wrap gap-2">
                      {karnatakaOverview.topSectors.map((sector, index) => (
                        <Badge key={index} variant="outline" className="text-blue-800 border-blue-300">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ChartModal
        isOpen={showChart}
        onClose={() => setShowChart(false)}
        title={`Top 10 Districts - ${getDistrictMetricLabel(selectedMetric)}`}
        data={chartData}
        config={{
          type: 'bar',
          title: `District Comparison: ${getDistrictMetricLabel(selectedMetric)}`,
          xAxisLabel: 'Districts',
          yAxisLabel: getDistrictMetricLabel(selectedMetric),
          colors: chartData.datasets[0].backgroundColor as string[],
          showLegend: false
        }}
      />
    </>
  );
}