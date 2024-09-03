import { RangeSlider, Slider } from "@mantine/core";
import classes from './Progress.module.css';

interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}

export const Progress: React.FC<ProgressProps> = ({
  title,
}) => {
  return (
    <Slider
      defaultValue={40}
      min={10}
      max={90}
      label={null}
      styles={{
        thumb: {
          transition: 'opacity 150ms ease',
        },
      }}
    />
  );
}