import { Card, CardContent } from '@/components/ui/shadcn/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/shadcn/collapsible';
import { ChevronRight } from 'lucide-react';

const VaultDetailsToggle = ({
  text,
  children,
}: {
  text?: string;
  children: React.ReactNode;
}) => {
  return (
    <Collapsible className="group/collapsible">
      <CollapsibleTrigger className="group-data-[state=open]/collapsible:text-primary flex cursor-pointer place-items-center text-lg font-semibold transition-colors">
        <ChevronRight className="transition-transform duration-500 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
        {text}
      </CollapsibleTrigger>
      <CollapsibleContent className="group-data-[state=open]/collapsible:animate-collapsible-down animate-collapsible-up transition-all duration-500 ease-in-out">
        <Card className="opacity-0 transition-all duration-500 ease-in-out group-data-[state=open]/collapsible:opacity-100">
          <CardContent className="text-lg">{children}</CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default VaultDetailsToggle;
