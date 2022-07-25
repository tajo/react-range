import * as React from 'react';

export interface ITrackBackground {
  min: number;
  max: number;
  values: number[];
  colors: string[];
  direction?: Direction;
  rtl?: boolean;
}
export interface IProps {
  values: number[];
  min: number;
  max: number;
  step: number;
  direction: Direction;
  allowOverlap: boolean;
  draggableTrack: boolean;
  disabled: boolean;
  rtl: boolean;
  minDistance: number;
  onChange: (values: number[]) => void;
  onFinalChange?: (values: number[]) => void;
  renderMark?: (params: IRenderMarkParams) => React.ReactNode;
  renderThumb: (params: IRenderThumbParams) => React.ReactNode;
  renderTrack: (params: IRenderTrackParams) => React.ReactNode;
}

export interface IRenderMarkParams {
  props: IMarkProps;
  index: number;
}

export interface IRenderThumbParams {
  props: IThumbProps;
  value: number;
  index: number;
  isDragged: boolean;
}

export interface IRenderTrackParams {
  props: ITrackProps;
  children: React.ReactNode;
  isDragged: boolean;
  disabled: boolean;
}

export interface IThumbProps {
  key: number;
  style: React.CSSProperties;
  tabIndex?: number;
  'aria-valuemax': number;
  'aria-valuemin': number;
  'aria-valuenow': number;
  draggable: boolean;
  ref: React.RefObject<any>;
  role: string;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onKeyUp: (e: React.KeyboardEvent) => void;
}

export interface IMarkProps {
  key: string;
  style: React.CSSProperties;
  ref: React.RefObject<any>;
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
