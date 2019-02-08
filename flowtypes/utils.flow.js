declare interface ITrackBackground {
  min: number;
  max: number;
  values: number[];
  colors: string[];
  direction?: Direction;
}
declare export function getTrackBackground({ values, colors, min, max, direction }: ITrackBackground): string;
