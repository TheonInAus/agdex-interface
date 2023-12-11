import React, { ReactNode } from 'react';
import {
  Tooltip as TooltipUI,
  TooltipContent as TooltipContentUI,
  TooltipProvider,
  TooltipTrigger as TooltipTriggerUI,
} from './tooltip';

interface CustomTooltipProps {
  children: ReactNode;
  triggerContent: ReactNode;
  className?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ children, triggerContent, className }) => {
  return (
    <TooltipProvider>
      <TooltipUI>
        <TooltipTriggerUI asChild className='underline decoration-dashed underline-offset-2'>
          {triggerContent}
        </TooltipTriggerUI>
        <TooltipContentUI className={`${className} w-80`}>
          {children}
        </TooltipContentUI>
      </TooltipUI>
    </TooltipProvider>
  );
};
