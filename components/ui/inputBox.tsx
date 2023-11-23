import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Input, Card, Text } from '@shadcn/ui';

// Define variants for the PayInput styling.
const inputBoxVariants = cva(
  'flex items-center justify-between p-4 bg-gray-800', // Adjust the classes for the dark grey box
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

// Define the props for the PayInput component, extending the variant props.
export interface InputBoxProps extends VariantProps<typeof inputBoxVariants> {
  title: string;
  value: string;
  suffix: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Assuming you are handling state in a parent component
}

// The PayInput component definition.
export const InputBox: React.FC<InputBoxProps> = ({
  title,
  value,
  suffix,
  onValueChange,
  ...props
}) => {
  return (
    <Card className={inputBoxVariants(props)}>
      <Card.Body>
        <div className="flex justify-between w-full">
          <Text size="lg" className="text-white">{title}</Text>
          <Input
            className="text-right bg-transparent text-white placeholder-gray-300 outline-none"
            value={value}
            onChange={onValueChange}
            suffix={<Text className="text-white">{suffix}</Text>}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
