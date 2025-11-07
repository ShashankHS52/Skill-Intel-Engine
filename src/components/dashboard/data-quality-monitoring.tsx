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
import type { DataQualityIssue } from '@/lib/types';

const mockIssues: DataQualityIssue[] = [
  { id: 'DQ001', type: 'Duplicate Profile', details: 'User ID 12345, 67890', priority: 'High' },
  { id: 'DQ002', type: 'Incomplete Registration', details: 'User ID 98765 (Missing Skills)', priority: 'Medium' },
  { id: 'DQ003', type: 'Low Confidence Skill', details: 'Skill "Project Management" for User 54321', priority: 'Low' },
  { id: 'DQ004', type: 'Duplicate Profile', details: 'User ID 11223, 44556', priority: 'High' },
  { id: 'DQ005', type: 'Incomplete Registration', details: 'User ID 66778 (Missing Contact)', priority: 'Medium' },
];

export default function DataQualityMonitoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Quality Monitoring</CardTitle>
        <CardDescription>
          Flagged issues requiring manual review.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue Type</TableHead>
              <TableHead className="hidden md:table-cell">Details</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">{issue.type}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{issue.details}</TableCell>
                <TableCell>
                  <Badge variant={
                    issue.priority === 'High' ? 'destructive' :
                    issue.priority === 'Medium' ? 'secondary' : 'outline'
                  }>
                    {issue.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">Review</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
