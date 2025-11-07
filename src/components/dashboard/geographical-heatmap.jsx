'use client';

import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { Tooltip } from 'react-tooltip';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import INDIA_TOPO_JSON from '@/lib/india.topo.json';

const PROJECTION_CONFIG = {
  scale: 800,
  center: [82.5, 23.5],
};

const COLOR_RANGE = [
  '#e0f8f8',
  '#b3e0e0',
  '#80c7c7',
  '#4daaaa',
  '#1a8d8d',
  '#008080',
  '#006666',
  '#004d4d',
  '#003333',
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
  default: {
    outline: 'none',
  },
  hover: {
    fill: '#FF7F50',
    transition: 'all 250ms',
    outline: 'none',
  },
  pressed: {
    outline: 'none',
  },
};

const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh', value: 15 },
    { id: 'AR', state: 'Arunachal Pradesh', value: 20 },
    { id: 'AS', state: 'Assam', value: 35 },
    { id: 'BR', state: 'Bihar', value: 85 },
    { id: 'CT', state: 'Chhattisgarh', value: 40 },
    { id: 'GA', state: 'Goa', value: 10 },
    { id: 'GJ', state: 'Gujarat', value: 25 },
    { id: 'HR', state: 'Haryana', value: 30 },
    { id: 'HP', state: 'Himachal Pradesh', value: 18 },
    { id: 'JH', state: 'Jharkhand', value: 75 },
    { id: 'KA', state: 'Karnataka', value: 28 },
    { id: 'KL', state: 'Kerala', value: 12 },
    { id: 'MP', state: 'Madhya Pradesh', value: 60 },
    { id: 'MH', state: 'Maharashtra', value: 45 },
    { id: 'MN', state: 'Manipur', value: 42 },
    { id: 'ML', state: 'Meghalaya', value: 38 },
    { id: 'MZ', state: 'Mizoram', value: 33 },
    { id: 'NL', state: 'Nagaland', value: 48 },
    { id: 'OR', state: 'Odisha', value: 65 },
    { id: 'PB', state: 'Punjab', value: 22 },
    { id: 'RJ', state: 'Rajasthan', value: 55 },
    { id: 'SK', state: 'Sikkim', value: 19 },
    { id: 'TN', state: 'Tamil Nadu', value: 29 },
    { id: 'TG', state: 'Telangana', value: 32 },
    { id: 'TR', state: 'Tripura', value: 43 },
    { id: 'UT', state: 'Uttarakhand', value