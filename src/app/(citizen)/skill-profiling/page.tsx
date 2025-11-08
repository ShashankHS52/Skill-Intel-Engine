
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  Sparkles,
  List,
  UploadCloud,
  X,
  FileText,
} from 'lucide-react';
import { extractSkills } from '@/app/actions/skill-extractor';

const MOCK_CATEGORIES = {
  Agriculture: [
    'Crop Cultivation',
    'Soil Management',
    'Irrigation Techniques',
    'Pest Control',
    'Tractor Operation',
  ],
  Construction: [
    'Masonry',
    'Plumbing',
    'Electrical Wiring',
    'Carpentry',
    'Site Supervision',
  ],
  Textiles: [
    'Sewing & Stitching',
    'Pattern Making',
    'Fabric Cutting',
    'Embroidery',
    'Loom Operation',
  ],
  'IT & Digital': [
    'Basic Computer Use',
    'MS Office',
    'Digital Payments',
    'Social Media Management',
    'Hardware Troubleshooting',
  ],
};

type Skill = {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Expert';
};

export default function SkillProfilingPage() {
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Agriculture');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const addSkill = (skillName: string) => {
    if (
      skillName &&
      !userSkills.find(
        s => s.name.toLowerCase() === skillName.toLowerCase()
      )
    ) {
      setUserSkills([
        ...userSkills,
        { name: skillName, proficiency: 'Beginner' },
      ]);
    }
  };

  const removeSkill = (skillName: string) => {
    setUserSkills(userSkills.filter(s => s.name !== skillName));
  };

  const updateProficiency = (
    skillName: string,
    proficiency: 'Beginner' | 'Intermediate' | 'Expert'
  ) => {
    setUserSkills(
      userSkills.map(s => (s.name === skillName ? { ...s, proficiency } : s))
    );
  };

  const handleAiAnalysis = async () => {
    if (!jobDescription) return;
    setAiLoading(true);
    setAiSuggestions([]);
    try {
      const result = await extractSkills({ jobDescription });
      if (result && result.suggestedSkills) {
        setAiSuggestions(result.suggestedSkills);
      }
    } catch (error) {
      console.error('Error extracting skills:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFileName(file.name);
      // Simulate reading and suggesting skills
      setTimeout(() => {
        addSkill('Certificate: PMKVY - Welder');
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Let's Build Your Skill Profile
        </h1>
        <p className="text-muted-foreground">
          Your skills are valuable. Let's document them to find the best
          opportunities for you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1. Add Your Skills</CardTitle>
          <CardDescription>
            Choose one of the methods below to add your skills. You can use multiple methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ai-assisted">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ai-assisted">
                <Sparkles className="mr-2 h-4 w-4" /> AI Assisted
              </TabsTrigger>
              <TabsTrigger value="category-picker">
                <List className="mr-2 h-4 w-4" /> Category Picker
              </TabsTrigger>
              <TabsTrigger value="upload">
                <UploadCloud className="mr-2 h-4 w-4" /> Upload
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai-assisted" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="job-description">
                  Describe your job or what you do in your own words
                </Label>
                <Textarea
                  id="job-description"
                  placeholder="e.g., I fix tractors and farm equipment, or I sew clothes for weddings."
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  rows={4}
                />
                <Button onClick={handleAiAnalysis} disabled={aiLoading || !jobDescription}>
                  {aiLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {aiLoading ? 'Analyzing...' : 'Suggest Skills with AI'}
                </Button>
              </div>
              {aiSuggestions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold">AI Suggestions:</h4>
                  <p className="text-sm text-muted-foreground mb-2">Click to add a skill.</p>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.map((skill, i) => (
                      <Button
                        key={i}
                        variant="secondary"
                        onClick={() => addSkill(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="category-picker" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Select a Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(MOCK_CATEGORIES).map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                  <h4 className="font-semibold">Select Your Skills:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(MOCK_CATEGORIES[selectedCategory as keyof typeof MOCK_CATEGORIES] || []).map(skill => (
                      <Button key={skill} variant="outline" onClick={() => addSkill(skill)}>
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="mt-4">
                <div className="space-y-2">
                    <Label>Upload Certificates or Job Cards</Label>
                    <div className="relative border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <UploadCloud className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">Click to browse or drag & drop a file</p>
                        <Input 
                            id="file-upload" 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileUpload}
                            accept="image/*,.pdf"
                        />
                    </div>
                    {selectedFileName && (
                        <div className="mt-2 flex items-center gap-2 p-2 bg-muted/50 rounded-md text-sm">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="flex-1 truncate">{selectedFileName}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedFileName(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {userSkills.length > 0 && (
         <Card>
            <CardHeader>
                <CardTitle>2. My Skills & Proficiency</CardTitle>
                <CardDescription>
                    For each skill you've added, select how proficient you are.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userSkills.map((skill) => (
                <div key={skill.name} className="p-3 border rounded-lg bg-background">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold">{skill.name}</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeSkill(skill.name)}>
                        <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <RadioGroup
                    defaultValue={skill.proficiency}
                    onValueChange={(value) =>
                      updateProficiency(skill.name, value as any)
                    }
                    className="flex flex-col sm:flex-row gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Beginner" id={`${skill.name}-b`} />
                      <Label htmlFor={`${skill.name}-b`} className="font-normal">Beginner <span className="text-xs text-muted-foreground">(Can do with help)</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Intermediate" id={`${skill.name}-i`} />
                      <Label htmlFor={`${skill.name}-i`} className="font-normal">Intermediate <span className="text-xs text-muted-foreground">(Can do independently)</span></Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Expert" id={`${skill.name}-e`} />
                      <Label htmlFor={`${skill.name}-e`} className="font-normal">Expert <span className="text-xs text-muted-foreground">(Can teach others)</span></Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
            <CardTitle>3. Experience & Aspirations</CardTitle>
            <CardDescription>
                Help us understand your background and where you want to go.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>What type of industry have you mostly worked in?</Label>
                <RadioGroup defaultValue="Informal" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Formal" id="formal"/>
                        <Label htmlFor="formal" className="font-normal">Formal Sector</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Informal" id="informal"/>
                        <Label htmlFor="informal" className="font-normal">Informal Sector</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="space-y-2">
                <Label htmlFor="tools">What tools, machines, or technologies do you use?</Label>
                <Input id="tools" placeholder="e.g., Operates CNC Machine, Uses Digital Payment Apps" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="aspirations">What is your desired future job or industry?</Label>
                <Input id="aspirations" placeholder="e.g., I want to become a solar panel installer" />
            </div>
        </CardContent>
      </Card>

        <div className="flex justify-end pt-4">
            <Button size="lg">Save & Continue to Dashboard</Button>
        </div>

    </div>
  );
}
