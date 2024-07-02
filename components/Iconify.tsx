import { Icon } from '@iconify/react';

interface Props {
  icon: string;
  size?: number | string; // Size can be a number for pixel value or string for other valid CSS units
  className?: string;
}

export default function Iconify({ icon, size = 24, className = '', ...other }: Props) {
  return (
    <div className={`icon-container rounded-full p-2 ${className}`} {...other}>
      <Icon icon={icon} width={size} height={size} />
    </div>
  );
}