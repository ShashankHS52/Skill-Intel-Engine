'use client';

import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { Tooltip } from 'react-tooltip'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IndiaMap } from './india-map';

const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: 1100,
  center: [82.5, 23.5]
};

const COLOR_RANGE = [
  '#e6f5c9',
  '#d3eec4',
  '#b3debe',
  '#90cfb7',
  '#6dbbad',
  '#4aa7a2',
  '#2a9298',
  '#0b7f8e',
  '#016c83'
];

const DEFAULT_COLOR = '#EEE';

const getRandomInt = () => {
  return Math.floor(Math.random() * 100);
};

const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh', value: getRandomInt() },
    { id: 'AR', state: 'Arunachal Pradesh', value: getRandomInt() },
    { id: 'AS', state: 'Assam', value: getRandomInt() },
    { id: 'BR', state: 'Bihar', value: getRandomInt() },
    { id: 'CT', state: 'Chhattisgarh', value: getRandomInt() },
    { id: 'GA', state: 'Goa', value: 21 },
    { id: 'GJ', state: 'Gujarat', value: 22 },
    { id: 'HR', state: 'Haryana', value: getRandomInt() },
    { id: 'HP', state: 'Himachal Pradesh', value: 24 },
    { id: 'JH', state: 'Jharkhand', value: 26 },
    { id: 'KA', state: 'Karnataka', value: 27 },
    { id: 'KL', state: 'Kerala', value: getRandomInt() },
    { id: 'MP', state: 'Madhya Pradesh', value: getRandomInt() },
    { id: 'MH', state: 'Maharashtra', value: getRandomInt() },
    { id: 'MN', state: 'Manipur', value: getRandomInt() },
    { id: 'ML', state: 'Meghalaya', value: 59 },
    { id: 'MZ', state: 'Mizoram', value: getRandomInt() },
    { id: 'NL', state: 'Nagaland', value: 59 },
    { id: 'OR', state: 'Odisha', value: 59 },
    { id: 'PB', state: 'Punjab', value: getRandomInt() },
    { id: 'RJ', state: 'Rajasthan', value: getRandomInt() },
    { id: 'SK', state: 'Sikkim', value: getRandomInt() },
    { id: 'TN', state: 'Tamil Nadu', value: getRandomInt() },
    { id: 'TG', state: 'Telangana', value: getRandomInt() },
    { id: 'TR', state: 'Tripura', value: 14 },
    { id: 'UT', state: 'Uttarakhand', value: getRandomInt() },
    { id: 'UP', state: 'Uttar Pradesh', value: 15 },
    { id: 'WB', state: 'West Bengal', value: 17 },
    { id: 'AN', state: 'Andaman and Nicobar Islands', value: getRandomInt() },
    { id: 'CH', state: 'Chandigarh', value: getRandomInt() },
    { id: 'DN', state: 'Dadra and Nagar Haveli', value: 19 },
    { id: 'DD', state: 'Daman and Diu', value: 20 },
    { id: 'DL', state: 'Delhi', value: 59 },
    { id: 'JK', state: 'Jammu and Kashmir', value: 25 },
    { id: 'LA', state: 'Ladakh', value: getRandomInt() },
    { id: 'LD', state: 'Lakshadweep', value: getRandomInt() },
    { id: 'PY', state: 'Puducherry', value: getRandomInt() }
  ];
};


const LinearGradient = props => {
  const { data } = props;
  const boxStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  };
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${COLOR_RANGE[0]} , ${COLOR_RANGE[COLOR_RANGE.length - 1]})`,
    height: 12,
    borderRadius: '2px'
  };
  return (
    <div className="text-xs text-muted-foreground mt-2">
      <div style={boxStyle}>
        <span>{data.min}</span>
        <span>{data.max}</span>
      </div>
      <div 
        style={{ ...gradientStyle }} 
        className="mt-1">
      </div>
    </div>
  );
};


export default function GeographicalHeatmap() {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.st_nm}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };
  
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
          <Tooltip id="map-tooltip" />
          <ComposableMap
              projectionConfig={PROJECTION_CONFIG}
              projection="geoMercator"
              data-tooltip-id="map-tooltip"
              data-tooltip-content={tooltipContent}
              className="w-full h-auto"
              viewBox="0 50 800 600"
          >
              <Geographies geography={INDIA_TOPO_JSON}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const current = data.find(s => s.id === geo.id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                        stroke="#FFF"
                        strokeWidth={0.5}
                        onMouseEnter={onMouseEnter(geo, current)}
                        onMouseLeave={onMouseLeave}
                        style={{
                          default: { outline: 'none' },
                          hover: { outline: 'none', fill: '#016c83' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
          </ComposableMap>
          <LinearGradient data={{ min: 0, max: 100}} />
      </CardContent>
    </Card>
  );
}
