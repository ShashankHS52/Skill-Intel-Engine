import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillGapAnalyzer from './skill-gap-analyzer';
import AutomationRiskAlert from './automation-risk-alert';
import ScenarioTesting from './scenario-testing';

export default function AnalysisTools() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Analysis Tools</CardTitle>
        <CardDescription>
          Leverage AI to generate workforce insights and recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="skill-gap">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skill-gap">Skill Gap</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="scenario">Scenario</TabsTrigger>
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
