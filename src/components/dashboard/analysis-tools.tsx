import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin } from 'lucide-react';
import SkillGapAnalyzer from './skill-gap-analyzer';
import AutomationRiskAlert from './automation-risk-alert';
import ScenarioTesting from './scenario-testing';

export default function AnalysisTools() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" style={{ color: '#008080' }} />
          Karnataka AI Analysis Tools
        </CardTitle>
        <CardDescription>
          AI-powered workforce insights and recommendations for Karnataka state.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skill-gap">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skill-gap">District Skills</TabsTrigger>
            <TabsTrigger value="automation">Automation Risk</TabsTrigger>
            <TabsTrigger value="scenario">State Planning</TabsTrigger>
          </TabsList>
          <TabsContent value="skill-gap">
            <SkillGapAnalyzer />
          </TabsContent>
          <TabsContent value="automation">
            <AutomationRiskAlert />
          </TabsContent>
          <TabsContent value="scenario">
            <ScenarioTesting />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
