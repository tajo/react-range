import { TThumbOffsets, ITrackBackground, Direction } from './types';

export function isTouchEvent(event: TouchEvent & MouseEvent) {
  return (
    (event.touches && event.touches.length) ||
    (event.changedTouches && event.changedTouches.length)
  );
}

export function normalizeValue(
  value: number,
  index: number,
  min: number,
  max: number,
  step: number,
  allowOverlap: boolean,
  values: number[]
) {
  const BIG_NUM = 10e10;
  value = Math.round(value * BIG_NUM) / BIG_NUM;
  if (!allowOverlap) {
    const prev = values[index - 1];
    const next = values[index + 1];
    if (prev && prev > value) return prev;
    if (next && next < value) return next;
  }
  if (value > max) return max;
  if (value < min) return min;
  const remainder = Math.round(value * BIG_NUM) % Math.round(step * BIG_NUM);
  const closestBigNum = Math.round(value * BIG_NUM - remainder);
  const rounded = remainder === 0 ? value : closestBigNum / BIG_NUM;
  const res =
    Math.abs(remainder / BIG_NUM) < step / 2
      ? rounded
      : rounded + step * Math.sign(value);
  const afterDot = step.toString().split('.')[1];
  return afterDot ? parseFloat(res.toFixed(afterDot.length)) : res;
}

export function relativeValue(value: number, min: number, max: number) {
  return (value - min) / (max - min);
}

export function isVertical(direction: Direction) {
  return direction === Direction.Up || direction === Direction.Down;
}

export function checkBoundaries(value: number, min: number, max: number) {
  if (min >= max) {
    throw new RangeError(`min (${min}) is equal/bigger than max (${max})`);
  }
  if (value < min) {
    throw new RangeError(`value (${value}) is smaller than min (${min})`);
  }
  if (value > max) {
    throw new RangeError(`value (${value}) is bigger than max (${max})`);
  }
}

export function checkInitialOverlap(values: number[]) {
  if (values.length < 2) return;
  if (!values.slice(1).every((item, i) => values[i] <= item)) {
    throw new RangeError(
      `values={[${values}]} needs to be sorted when allowOverlap={false}`
    );
  }
}

export function getMargin(element: Element) {
  const style = window.getComputedStyle(element);
  return {
    top: parseInt(style['margin-top' as any], 10),
    bottom: parseInt(style['margin-bottom' as any], 10),
    left: parseInt(style['margin-left' as any], 10),
    right: parseInt(style['margin-right' as any], 10)
  };
}

export function getPadding(element: Element) {
  const style = window.getComputedStyle(element);
  return {
    top: parseInt(style['padding-top' as any], 10),
    bottom: parseInt(style['padding-bottom' as any], 10),
    left: parseInt(style['padding-left' as any], 10),
    right: parseInt(style['padding-right' as any], 10)
  };
}

export function translateThumbs(elements: Element[], offsets: TThumbOffsets) {
  elements.forEach((element, index) =>
    translate(element, offsets[index].x, offsets[index].y)
  );
}

export function translate(element: Element, x: number, y: number) {
  (element as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
}

// adapted from https://github.com/alexreardon/raf-schd
export const schd = (fn: Function) => {
  let lastArgs: any[] = [];
  let frameId: number | null = null;
  const wrapperFn = (...args: any[]) => {
    lastArgs = args;
    if (frameId) {
      return;
    }
    frameId = requestAnimationFrame(() => {
      frameId = null;
      fn(...lastArgs);
    });
  };
  return wrapperFn;
};

export function replaceAt(values: number[], index: number, value: number) {
  const ret = values.slice(0);
  ret[index] = value;
  return ret;
}

export function getTrackBackground({
  values,
  colors,
  min,
  max,
  direction = Direction.Right
}: ITrackBackground) {
  const progress = values.map(value => ((value - min) / (max - min)) * 100);
  const middle = progress.reduce(
    (acc, point, index) =>
      `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
    ''
  );
  return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${
    colors[colors.length - 1]
  } 100%)`;
}

export function voidFn() {}

export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
