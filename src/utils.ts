import { useEffect, useState } from 'react';
import Range from './Range';
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

/**
 * Bulk of logic for thumb overlaps
 * Consider a scenario with 5 thumbs;
 * Thumb 1 overlaps with thumb 0 and thumb 2
 * Thumb 2 overlaps with thumb 3
 * We need an array that contains [0, 1, 2, 3]
 * The function needs to return the directly overlapping thumbs
 * and all thumbs overlapping linked to those and so on
 * @param index - Thumb index calculating overlaps for
 * @param offsets - Current Array of Thumb offsets for Range
 * @param thumbSize - Thumb element width in pixels
 * @returns overlaps - Array of all overlapping thumbs from the index
 */
const getOverlaps = (
  index: number,
  offsets: { x: number; y: number }[],
  thumbSize: number
) => {
  let overlaps: number[] = [];
  /**
   * Recursive function for building the overlaps Array
   * If an overlap is found, find the overlaps for that overlap
   * @param thumbIndex current Thumb index to find overlaps from
   */
  const buildOverlaps = (thumbIndex: number) => {
    const thumbX = offsets[thumbIndex].x;
    /**
     * Iterate through the Thumb offsets, if there is a match
     * add the thumbIndex and siblingIndex to the overlaps Array
     *
     * Then build overlaps from the overlapping siblingIndex
     */
    offsets.forEach(({x: siblingX}, siblingIndex) => {
      if (
        thumbIndex !== siblingIndex &&
        ((thumbX >= siblingX && thumbX <= siblingX + thumbSize) ||
          (thumbX + thumbSize >= siblingX &&
            thumbX + thumbSize <= siblingX + thumbSize))
      ) {
        if (!overlaps.includes(siblingIndex)) {
          overlaps.push(thumbIndex)
          overlaps.push(siblingIndex)
          overlaps = [...overlaps, thumbIndex, siblingIndex]
          buildOverlaps(siblingIndex)
        }
      }
    })
  };
  buildOverlaps(index)
  // Sort and remove duplicates from the built overlaps
  return Array.from(new Set(overlaps.sort()));
};
/**
 * A custom React Hook for calculating whether a thumb overlaps
 * another and whether labels could/should merge.
 * @param rangeRef - React ref value of Range component
 * @param values - current Range values Array
 * @param index - thumb index
 * @param separator - string to separate thumb values
 * @returns label value + styling for thumb label
 */
export const useThumbOverlap = (
  rangeRef: Range | null,
  values: number[],
  index: number,
  separator = ' - '
) => {
  // Create initial label style and value. Label value defaults to thumb value
  const [labelStyle, setLabelStyle] = useState<React.CSSProperties>({});
  const [labelValue, setLabelValue] = useState(values[index].toFixed(1));

  // When the rangeRef or values change, update the Thumb label values and styling
  useEffect(() => {
    if (rangeRef) {
      if (rangeRef.getThumbs().length < 1) return;
      const newStyle: React.CSSProperties = {};
      /**
       * Grab the Thumb styling width. This is used to calculate overlaps
       * between Thumbs. Offsets returns the left edge of a Thumb. Left edge
       * plus thumbSize gives the right side of a Thumb.
       */
      const thumbSize = (rangeRef.getThumbs()[0] as HTMLElement).offsetWidth;
      const offsets = rangeRef.getOffsets();
      /**
       * Get any overlaps for the given Thumb index. This must return all linked
       * Thumbs. So if there are 4 Thumbs and Thumbs 2, 3 and 4 overlap. If we are
       * getting the overlaps for Thumb 1 and it overlaps only Thumb 2, we must get
       * 2, 3 and 4 also.
       */
      const overlaps = getOverlaps(index, offsets, thumbSize);
      // Set a default label value of the Thumb value
      let labelValue = values[index].toFixed(1);
      /**
       * If there are overlaps for the Thumb, we need to calculate the correct
       * Label value along with the relevant styling. We only want to show a Label
       * for the left most Thumb in an overlapping set.
       * All other Thumbs will be set to display: none.
       */
      if (overlaps.length) {
        /**
         * Get an Array of the offsets for the overlapping Thumbs
         * This is so we can determine if the Thumb we are looking at
         * is the left most thumb in an overlapping set
         */
        const offsetsX = overlaps.reduce<number[]>(
          (a: number[], c: number, i: number, s: number[]) => {
            return a.length ? [...a, offsets[s[i]].x] : [offsets[s[i]].x];
          },
          []
        );
        /**
         * If our Thumb is the left most Thumb, we can build a Label value
         * and set the style for that Label
         */
        if (Math.min(...offsetsX) === offsets[index].x) {
          /**
           * First calculate the Label value. To do this,
           * grab all the values for the Thumbs in our overlaps.
           * Then convert that to a Set and sort it whilst removing duplicates.
           */
          const labelValues: string[] = [];
          overlaps.forEach(thumb => {
            labelValues.push(values[thumb].toFixed(1));
          });
          /**
           *  Update the labelValue with the resulting Array
           *  joined by our defined separator
           */
          labelValue = Array.from(
            new Set(labelValues.sort((a, b) => parseFloat(a) - parseFloat(b)))
          ).join(separator);
          /**
           * Lastly, build the label styling. The label styling will
           * position the label and apply a transform so that it's centered.
           * We want the center point between the left edge of the left most Thumb
           * and the right edge of the right most Thumb.
           */
          const first = Math.min(...offsetsX);
          const last = Math.max(...offsetsX);
          newStyle.left = `${Math.abs(first - (last + thumbSize)) / 2}px`;
          newStyle.transform = 'translate(-50%, 0)';
        } else {
          // If the Thumb isn't the left most Thumb, hide the Label!
          newStyle.display = 'none';
        }
      }
      // Update the label value and style
      setLabelValue(labelValue);
      setLabelStyle(newStyle);
    }
  }, [rangeRef, values]);

  return [labelValue, labelStyle];
};
