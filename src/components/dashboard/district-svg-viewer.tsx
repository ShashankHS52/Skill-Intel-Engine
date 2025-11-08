'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Briefcase, TrendingUp, Award } from 'lucide-react';
import { karnatakaDistrictData, DistrictData } from '@/lib/karnataka-data';
import Image from 'next/image';

interface DistrictOption {
  id: string;
  name: string;
  svgFileName: string;
}

// Map of district IDs to their SVG file names
const districtSVGMapping: Record<string, string> = {
  'bagalkot': 'India_Karnataka_Bagalkot_district.svg',
  'ballary': 'India_Karnataka_Bellary_district.svg',
  'belagavi': 'India_Karnataka_Belgaum_district.svg',
  'bengaluru-rural': 'India_Karnataka_Bangalore_Rural_district.svg',
  'bengaluru-urban': 'India_Karnataka_Bangalore_Urban_district.svg',
  'bidar': 'India_Karnataka_Bidar_district.svg',
  'vijayapura': 'India_Karnataka_Bijapur_district.svg',
  'chamarajanagar': 'India_Karnataka_Chamarajanagar_district.svg',
  'chikkaballapur': 'India_Karnataka_Chikballapur_district.svg',
  'chikkamagaluru': 'India_Karnataka_Chikmagalur_district.svg',
  'chitradurga': 'India_Karnataka_Chitradurga_district.svg',
  'dakshina-kannada': 'India_Karnataka_Dakshina_Kannada_district.svg',
  'davanagere': 'India_Karnataka_Davanagere_district.svg',
  'dharwad': 'India_Karnataka_Dharwad_district.svg',
  'gadag': 'India_Karnataka_Gadag_district.svg',
  'kalaburagi': 'India_Karnataka_Gulbarga_district.svg',
  'hassan': 'India_Karnataka_Hassan_district.svg',
  'haveri': 'India_Karnataka_Haveri_district.svg',
  'kodagu': 'India_Karnataka_Kodagu_district.svg',
  'kolar': 'India_Karnataka_Kolar_district.svg',
  'koppal': 'India_Karnataka_Koppal_district.svg',
  'mandya': 'India_Karnataka_Mandya_district.svg',
  'mysuru': 'India_Karnataka_Mysore_district.svg',
  'raichur': 'India_Karnataka_Raichur_district.svg',
  'ramanagara': 'India_Karnataka_Ramanagara_district.svg',
  'shivamogga': 'India_Karnataka_Shimoga_district.svg',
  'tumakuru': 'India_Karnataka_Tumkur_district.svg',
  'udupi': 'India_Karnataka_Udupi_district.svg',
  'uttara-kannada': 'India_Karnataka_Uttara_Kannada_district.svg',
  'yadgir': 'India_Karnataka_Yadgir_district.svg',
};

export default function DistrictSVGViewer() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('bengaluru-urban');

  const districtOptions: DistrictOption[] = Object.keys(karnatakaDistrictData).map(id => ({
    id,
    name: karnatakaDistrictData[id].name,
    svgFileName: districtSVGMapping[id] || '',
  })).sort((a, b) => a.name.localeCompare(b.name));

  const currentDistrict = selectedDistrict ? karnatakaDistrictData[selectedDistrict] : null;
  const currentSVG = selectedDistrict ? districtSVGMapping[selectedDistrict] : null;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" style={{ color: '#008080' }} />
              District Map Viewer
            </CardTitle>
            <CardDescription>
              Select a district to view detailed map and workforce insights
            </CardDescription>
          </div>
          <Select 
            value={selectedDistrict} 
            onValueChange={(value) => setSelectedDistrict(value)}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {districtOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {currentDistrict && currentSVG ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* District Map Display - LEFT SIDE */}
            <div className="bg-gradient-to-b from-blue-50 to-green-50 rounded-lg p-6 flex items-center justify-center min-h-[600px] border-2 border-primary/20">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={`/karnataka-districts/${currentSVG}`}
                  alt={`${currentDistrict.name} District Map`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'flex items-center justify-center h-full text-muted-foreground';
                      errorDiv.innerHTML = `<div class="text-center">
                        <MapPin class="h-16 w-16 mx-auto mb-4 text-gray-400" />
                        <p>Map for ${currentDistrict.name} district</p>
                        <p class="text-sm">SVG file: ${currentSVG}</p>
                      </div>`;
                      parent.appendChild(errorDiv);
                    }
                  }}
                />
              </div>
            </div>

            {/* District Information - RIGHT SIDE */}
            <div className="bg-primary/5 border rounded-lg p-6 overflow-y-auto max-h-[600px]">
              <h3 className="font-bold text-xl mb-4" style={{ color: '#008080' }}>
                {currentDistrict.name} District - Key Metrics
              </h3>
              
              {/* Key Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Working Population</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: '#008080' }}>
                    {currentDistrict.workingPopulation}K
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Employment Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {currentDistrict.employmentRate}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Digital Skills</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {currentDistrict.digitalSkills}%
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Certified Workforce</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {currentDistrict.certifiedWorkforce}%
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Unemployment Rate</span>
                    <Badge variant={currentDistrict.unemployment < 4 ? 'default' : currentDistrict.unemployment < 6 ? 'secondary' : 'destructive'}>
                      {currentDistrict.unemployment}%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Skill Gap Level</span>
                    <Badge 
                      variant={currentDistrict.skillGap === 'low' ? 'default' : 
                              currentDistrict.skillGap === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {currentDistrict.skillGap.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Skill Density Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all" 
                        style={{ width: `${(currentDistrict.skillDensity / 5) * 100}%` }}
                      />
                    </div>
                    <span className="font-bold text-teal-600">
                      {currentDistrict.skillDensity}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Major Sectors */}
              <div className="mb-4">
                <h4 className="font-medium mb-2 text-sm text-muted-foreground">Major Economic Sectors</h4>
                <div className="flex flex-wrap gap-2">
                  {currentDistrict.majorSectors.map((sector, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Emerging Skills */}
              <div>
                <h4 className="font-medium mb-2 text-sm text-muted-foreground">Emerging Skills in Demand</h4>
                <div className="flex flex-wrap gap-2">
                  {currentDistrict.emergingSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[600px] text-muted-foreground">
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Select a district to view its map and data</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
