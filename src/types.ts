export interface IRangeProps {
  values: number[];
  min: number;
  max: number;
  step: number;
  isVertical: boolean;
  onChange: (value: number) => void;
  renderThumb: (props: any) => React.ReactNode;
  renderTrack: (props: any) => React.ReactNode;
}
