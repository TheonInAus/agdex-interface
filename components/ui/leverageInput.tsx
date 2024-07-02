import * as React from "react";
import { Card } from "@/components/ui/card";
import { Input, InputProps } from "@/components/ui/input";

interface LeverageInputProps extends InputProps {
  label: string;
  suffix: string;
}

const LeverageInput = React.forwardRef<HTMLInputElement, LeverageInputProps>(
  ({ label, suffix, ...inputProps }, ref) => {
    return (
      <Card className="w-full rounded-xl border-none bg-boxBackground outline-none">
        <div className="flex flex-col justify-between ml-4">
          <div className="flex flex-row items-center">
            <span className="block text-sm text-0xgrey">{label}</span>
            <Input
              {...inputProps}
              ref={ref}
              className="w-[75%] text-right text-white bg-transparent border-none shadow-none outline-none text-md placeholder:text-gray-300"
              placeholder=""
            />
            <span className="text-right text-white text-sm">{suffix}</span>
          </div>
        </div>
      </Card>
    );
  }
);

LeverageInput.displayName = "LabeledInput";

export { LeverageInput };
