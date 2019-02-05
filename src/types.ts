export interface IProps {
  values: number[];
  min: number;
  max: number;
  step: number;
  isVertical: boolean;
  onChange: (values: number[]) => void;
  renderThumb: (props: any) => React.ReactNode;
  renderTrack: (props: any) => React.ReactNode;
}

export type TThumbOffsets = { x: number; y: number }[];
export type TEvent = React.MouseEvent | React.TouchEvent | React.KeyboardEvent;
