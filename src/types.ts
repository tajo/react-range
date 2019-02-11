export interface ITrackBackground {
  min: number;
  max: number;
  values: number[];
  colors: string[];
  direction?: Direction;
}
export interface IProps {
  values: number[];
  min: number;
  max: number;
  step: number;
  direction: Direction;
  allowOverlap: boolean;
  disabled: boolean;
  onChange: (values: number[]) => void;
  renderThumb: (params: {
    props: IThumbProps;
    value: number;
    index: number;
    isDragged: boolean;
  }) => React.ReactNode;
  renderTrack: (params: {
    props: ITrackProps;
    children: React.ReactNode;
    isDragged: boolean;
    disabled: boolean;
  }) => React.ReactNode;
}

export interface IThumbProps {
  key: number;
  style: React.CSSProperties;
  tabIndex?: number;
  'aria-valuemax': number;
  'aria-valuemin': number;
  'aria-valuenow': number;
  draggable: boolean;
  role: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
}

export interface ITrackProps {
  style: React.CSSProperties;
  ref: React.RefObject<any>;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export type TThumbOffsets = { x: number; y: number }[];

export enum Direction {
  Right = 'to right',
  Left = 'to left',
  Down = 'to bottom',
  Up = 'to top'
}
