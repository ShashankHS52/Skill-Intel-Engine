'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, MapPin, Info, TrendingUp, Users, Briefcase, Award } from 'lucide-react';
import ChartModal from './chart-modal';
import { ChartData } from '@/lib/kpi-types';
import { 
  stateWiseData, 
  StateData, 
  StateMetric, 
  getStateColor, 
  getMetricLabel, 
  getMetricValue 
} from '@/lib/state-data';
// @ts-ignore
import India from '@svg-maps/india';

interface InteractiveIndiaMapProps {
  selectedMetric: StateMetric;
  onStateHover: (stateId: string | null) => void;
  onStateClick: (stateId: string) => void;
  hoveredState: string | null;
  selectedState: string | null;
}

function InteractiveIndiaMap({ 
  selectedMetric, 
  onStateHover, 
  onStateClick, 
  hoveredState,
  selectedState 
}: InteractiveIndiaMapProps) {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <svg
        width={India.viewBox.split(' ')[2]}
        height={India.viewBox.split(' ')[3]}
        viewBox={India.viewBox}
        className="w-full h-full max-w-lg max-h-96"
      >
        {India.locations.map((location: any) => {
          const stateId = location.id;
          const isHovered = hoveredState === stateId;
          const isSelected = selectedState === stateId;
          const fillColor = getStateColor(stateId, selectedMetric);
          
          return (
            <g key={stateId}>
              <path
                d={location.path}
                fill={fillColor}
                stroke={isSelected ? '#008080' : isHovered ? '#006666' : '#FFFFFF'}
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onMouseEnter={() => onStateHover(stateId)}
                onMouseLeave={() => onStateHover(null)}
                onClick={() => onStateClick(stateId)}
                style={{
                  filter: isHovered ? 'brightness(1.1)' : 'none',
                  transformOrigin: 'center'
                }}
              />
              {/* State name label for major states */}
              {location.name && ['Mandya', 'Uttar Pradesh', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Rajasthan'].includes(location.name) && (
                <text
                  x={location.x || 0}
                  y={location.y || 0}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#008080"
                  className="pointer-events-none font-medium"
                  style={{ textShadow: '0 0 3px white' }}
                >
                  {location.name.length > 10 ? location.name.substring(0, 8) + '...' : location.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function StateWiseGeographicalInsights() {
  const [selectedMetric, setSelectedMetric] = useState<StateMetric>('unemployment');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [activeTab, setActiveTab] = useState('map');

  const handleStateHover = useCallback((stateId: string | null) => {
    setHoveredState(stateId);
  }, []);

  const handleStateClick = useCallback((stateId: string) => {
    setSelectedState(selectedState === stateId ? null : stateId);
  }, [selectedState]);

  // Prepare chart data
  const chartData: ChartData = {
    labels: Object.values(stateWiseData)
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
      .map(state => state.name.length > 12 ? state.name.substring(0, 10) + '...' : state.name),
    datasets: [{
      label: getMetricLabel(selectedMetric),
      data: Object.values(stateWiseData)
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
        .map(state => {
          return selectedMetric === 'unemployment' ? state.unemployment :
                 selectedMetric === 'employment_rate' ? state.employmentRate :
                 selectedMetric === 'skill_density' ? state.skillDensity :
                 selectedMetric === 'digital_skills' ? state.digitalSkills :
                 selectedMetric === 'certified_workforce' ? state.certifiedWorkforce : 0;
        }),
      backgroundColor: Object.values(stateWiseData)
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
        .map(state => getStateColor(state.id, selectedMetric)),
    }]
  };

  // Get top and bottom performing states
  const sortedStates = Object.values(stateWiseData).sort((a, b) => {
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

  const topStates = selectedMetric === 'unemployment' ? sortedStates.slice(0, 5) : sortedStates.slice(0, 5);
  const bottomStates = selectedMetric === 'unemployment' ? sortedStates.slice(-5).reverse() : sortedStates.slice(-5).reverse();

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" style={{ color: '#008080' }} />
                State-wise Geographical Insights
              </CardTitle>
              <CardDescription>
                Interactive state-level workforce analytics across India
              </CardDescription>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Select 
                value={selectedMetric} 
                onValueChange={(value) => setSelectedMetric(value as StateMetric)}
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="map">Interactive Map</TabsTrigger>
              <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="space-y-4">
              <InteractiveIndiaMap
                selectedMetric={selectedMetric}
                onStateHover={handleStateHover}
                onStateClick={handleStateClick}
                hoveredState={hoveredState}
                selectedState={selectedState}
              />
              
              {/* Hover/Selected State Info */}
              {(hoveredState || selectedState) && (
                <div className="bg-primary/5 border rounded-lg p-4">
                  {stateWiseData[hoveredState || selectedState!] && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg" style={{ color: '#008080' }}>
                        {stateWiseData[hoveredState || selectedState!].name}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Unemployment:</span>
                          <div className="font-medium">{stateWiseData[hoveredState || selectedState!].unemployment}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Employment Rate:</span>
                          <div className="font-medium">{stateWiseData[hoveredState || selectedState!].employmentRate}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Skill Density:</span>
                          <div className="font-medium">{stateWiseData[hoveredState || selectedState!].skillDensity}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Working Pop:</span>
                          <div className="font-medium">{stateWiseData[hoveredState || selectedState!].workingPopulation}M</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge 
                          variant={stateWiseData[hoveredState || selectedState!].skillGap === 'low' ? 'default' : 'destructive'}
                        >
                          {stateWiseData[hoveredState || selectedState!].skillGap} Skill Gap
                        </Badge>
                        <Badge variant="secondary">
                          {stateWiseData[hoveredState || selectedState!].digitalSkills}% Digital Skills
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="top-performers" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">
                    🏆 Best Performing States ({getMetricLabel(selectedMetric)})
                  </h4>
                  <div className="space-y-2">
                    {topStates.map((state, index) => (
                      <div key={state.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span>{state.name}</span>
                        </div>
                        <Badge variant="secondary">
                          {getMetricValue(state.id, selectedMetric)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-700">
                    📈 States Needing Attention
                  </h4>
                  <div className="space-y-2">
                    {bottomStates.map((state, index) => (
                      <div key={state.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          <span>{state.name}</span>
                        </div>
                        <Badge variant="destructive">
                          {getMetricValue(state.id, selectedMetric)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {Object.values(stateWiseData).reduce((sum, state) => sum + state.workingPopulation, 0).toFixed(1)}M
                  </div>
                  <div className="text-sm text-muted-foreground">Total Working Population</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {(Object.values(stateWiseData).reduce((sum, state) => sum + state.employmentRate, 0) / Object.values(stateWiseData).length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Employment Rate</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Briefcase className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {(Object.values(stateWiseData).reduce((sum, state) => sum + state.unemployment, 0) / Object.values(stateWiseData).length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Unemployment</div>
                </div>
                
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Award className="h-6 w-6 mx-auto mb-2" style={{ color: '#008080' }} />
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {(Object.values(stateWiseData).reduce((sum, state) => sum + state.digitalSkills, 0) / Object.values(stateWiseData).length).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Digital Skills</div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-900 mb-1">Key Insights</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Southern and Western states generally show better employment metrics</li>
                      <li>• Digital skills adoption is highest in tech hubs like Karnataka and Telangana</li>
                      <li>• Rural states need focused skill development programs</li>
                      <li>• Youth employment initiatives required in northeastern states</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Legend */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-xs">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: '#00A693' }} />
              <span>Excellent Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: '#4DCCCC' }} />
              <span>Good Performance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: '#FFB399' }} />
              <span>Needs Improvement</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: '#FF7F50' }} />
              <span>Requires Attention</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChartModal
        isOpen={showChart}
        onClose={() => setShowChart(false)}
        title={`Top 10 States - ${getMetricLabel(selectedMetric)}`}
        data={chartData}
        config={{
          type: 'bar',
          title: `State Comparison: ${getMetricLabel(selectedMetric)}`,
          xAxisLabel: 'States',
          yAxisLabel: getMetricLabel(selectedMetric),
          colors: chartData.datasets[0].backgroundColor as string[],
          showLegend: false
        }}
      />
    </>
  );
}