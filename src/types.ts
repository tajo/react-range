export interface IProps {
  values: number[];
  min: number;
  max: number;
  step: number;
  isVertical: boolean;
  allowOverlap: boolean;
  onChange: (values: number[]) => void;
  renderThumb: (params: {
    props: IThumbProps;
    value: number;
    index: number;
  }) => React.ReactNode;
  renderTrack: (params: { props: ITrackProps }) => React.ReactNode;
}

export interface IThumbProps {
  key: number;
  style: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export interface ITrackProps {
  style: React.CSSProperties;
  ref: React.RefObject<any>;
  children: React.ReactNode;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export type TThumbOffsets = { x: number; y: number }[];
export type TEvent = React.MouseEvent | React.TouchEvent | React.KeyboardEvent;
