import { TThumbOffsets } from './types';

export function normalizeValue(
  value: number,
  min: number,
  max: number,
  step: number
) {
  if (value > max) return max;
  if (value < min) return min;
  const remainder = value % step;
  const rounded =
    remainder === 0 ? value : Math.round((value - remainder) * 10e10) / 10e10;
  return rounded;
}

export function relativeValue(value: number, min: number, max: number) {
  return (value - min) / (max - min);
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
