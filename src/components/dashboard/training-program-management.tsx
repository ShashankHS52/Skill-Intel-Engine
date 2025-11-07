import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { TrainingProgram } from '@/lib/types';
import { MoreHorizontal } from 'lucide-react';

const mockPrograms: TrainingProgram[] = [
  { id: 'TP001', name: 'Advanced Cloud Computing', region: 'North District', alignmentScore: 85, status: 'Aligned' },
  { id: 'TP002', name: 'AI & Machine Learning Basics', region: 'South District', alignmentScore: 65, status: 'Needs Review' },
  { id: 'TP003', name: 'Cybersecurity Fundamentals', region: 'East District', alignmentScore: 92, status: 'Aligned' },
  { id: 'TP004', name: 'Data Analytics with Python', region: 'West District', alignmentScore: 78, status: 'Aligned' },
  { id: 'TP005', name: 'Green Energy Technician', region: 'South District', alignmentScore: 45, status: 'Pending' },
];

export default function TrainingProgramManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Program Management</CardTitle>
        <CardDescription>
          Map and align training programs to resolve skill gaps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program Name</TableHead>
              <TableHead className="hidden md:table-cell">Region</TableHead>
              <TableHead>Alignment Score</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPrograms.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.name}</TableCell>
                <TableCell className="hidden md:table-cell">{program.region}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={program.alignmentScore} className="w-24 h-2" />
                    <span className="text-sm text-muted-foreground">{program.alignmentScore}%</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant={
                    program.status === 'Aligned' ? 'default' :
                    program.status === 'Needs Review' ? 'destructive' : 'secondary'
                  } className={program.status === 'Aligned' ? 'bg-green-600' : ''}>
                    {program.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
