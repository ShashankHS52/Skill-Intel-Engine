import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';


export default function KpiCard({
  title,
  value,
  change,
  description,
  icon,
  changeType = 'positive',
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn(
              'font-semibold',
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            )}
          >
            {change}
          </span>{' '}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
