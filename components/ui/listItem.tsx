import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const listItemVariants = cva(
  'flex items-center justify-between space-x-2', // Adjust the spacing as needed
  {
    variants: {
      size: {
        default: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ListItemProps extends VariantProps<typeof listItemVariants> {
  keyText: string;
  value: string | number;
  info?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  keyText,
  value,
  info,
  ...props
}) => {
  return (
    <div className={listItemVariants(props)} {...props}>
      <div className="flex items-center">
        <span className="text-sm text-0xgrey">{keyText}</span>
        {info && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1">
                  <AlertCircle
                    className="text-white text-opacity-70 hover:text-opacity-100"
                    size={16}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                <p>{info}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <span className="text-sm text-white">{value || '-'}</span>
    </div>
  );
};

export { ListItem };
