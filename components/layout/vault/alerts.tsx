import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card';
import { CircleAlert, Skull, Smile, TriangleAlert } from 'lucide-react';
const Alerts = ({
  type = 'info',
  message,
}: {
  type?: 'info' | 'success' | 'warning' | 'danger';

  message?: string;
}) => {
  const alertStyles = {
    info: 'bg-blue-100 border-blue-300 border-2 text-blue-600',
    success: 'bg-green-100 border-green-300 border-2 text-green-600',
    warning: 'bg-orange-100 border-orange-300 border-2 text-orange-600',
    danger: 'bg-red-100 border-red-300 border-2 text-red-600',
  };
  const alertTitles = {
    info: (
      <>
        <CircleAlert /> Info!
      </>
    ),
    success: (
      <>
        <Smile /> Success!
      </>
    ),
    warning: (
      <>
        <TriangleAlert /> Warnung!
      </>
    ),
    danger: (
      <>
        <Skull /> Danger!
      </>
    ),
  };
  return (
    <Card className={`${alertStyles[type]}`}>
      <CardHeader>
        <CardTitle className="flex place-items-center gap-1 text-2xl">
          {alertTitles[type]}
        </CardTitle>
      </CardHeader>
      <CardContent className="ml-[0.15rem] text-xl">{message}</CardContent>
    </Card>
  );
};

export default Alerts;
