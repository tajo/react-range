import { useEffect, useState } from 'react';
import Range from './Range';
import { TThumbOffsets, ITrackBackground, Direction } from './types';

export const getStepDecimals = (step: number): number => {
  const decimals = step.toString().split('.')[1];
  return decimals ? decimals.length : 0;
};

export function isTouchEvent(event: TouchEvent & MouseEvent) {
  return (
    (event.touches && event.touches.length) ||
    (event.changedTouches && event.changedTouches.length)
  );
}

export function isStepDivisible(min: number, max: number, step: number): boolean {
  const res = (max - min) / step;
  return parseInt(res.toString(), 10) === res;
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
  // `remainder` is a difference between the given value and a full step value
  // that is closest lower to the given value and is in the range between the min value
  // and the given value
  var remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) %
    Math.floor(step * BIG_NUM);
  var closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
  var rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
  // Values with a remainder `< step/2` are rounded to the closest lower value
  // while values with a remainder `= > step/2` are rounded to the closest bigger value
  var res = Math.abs(remainder / BIG_NUM) < step / 2
    ? rounded
    : rounded + step;
  const decimalPlaces = getStepDecimals(step);
  return parseFloat(res.toFixed(decimalPlaces));
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

export function getPaddingAndBorder(element: Element) {
  const style = window.getComputedStyle(element);
  return {
    top: parseInt(style['padding-top' as any], 10) + parseInt(style['border-top-width' as any], 10),
    bottom: parseInt(style['padding-bottom' as any], 10) + parseInt(style['border-bottom-width' as any], 10),
    left: parseInt(style['padding-left' as any], 10) + parseInt(style['border-left-width' as any], 10),
    right: parseInt(style['padding-right' as any], 10) + parseInt(style['border-right-width' as any], 10),
  };
}

export function translateThumbs(
  elements: Element[],
  offsets: TThumbOffsets,
  rtl: boolean
) {
  const inverter = rtl ? -1 : 1;
  elements.forEach((element, index) =>
    translate(element, inverter * offsets[index].x, offsets[index].y)
  );
}

/**
 * Util function for calculating the index of the thumb that is closes to a given position
 * @param thumbs - array of Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
export function getClosestThumbIndex(thumbs: Element[], clientX: number, clientY: number, direction: Direction) {
  let thumbIndex = 0
  let minThumbDistance = getThumbDistance(thumbs[0], clientX, clientY, direction)
  for (let i = 1; i < thumbs.length; i++) {
    const thumbDistance = getThumbDistance(thumbs[i], clientX, clientY, direction)
    if (thumbDistance < minThumbDistance) {
      minThumbDistance = thumbDistance
      thumbIndex = i
    }
  }
  return thumbIndex
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
  direction = Direction.Right,
  rtl = false
}: ITrackBackground) {
  if (rtl && direction === Direction.Right) {
    direction = Direction.Left;
  } else if (rtl && Direction.Left) {
    direction = Direction.Right;
  }
  const progress = values.map(value => ((value - min) / (max - min)) * 100);
  const middle = progress.reduce(
    (acc, point, index) =>
      `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
    ''
  );
  return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${colors[colors.length - 1]
    } 100%)`;
}

export function voidFn() { }

export function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

/**
 * Util function for grabbing the true largest width of a thumb
 * including the label
 * @param thumbEl - Thumb element to grab the largest width from
 * @param value - Thumb value, not label value
 * @param separator - Label separator value
 */
const getThumbWidth = (
  thumbEl: Element,
  value: number,
  separator: string,
  decimalPlaces: number,
  valueToLabel = (value: string): string => value
) => {
  const width = Math.ceil(
    [thumbEl, ...Array.from(thumbEl.children)].reduce(
      (width: number, el: Element) => {
        let elWidth = Math.ceil(el.getBoundingClientRect().width);
        /**
         * If a label contains a merged label value, it won't return the true
         * label width for that Thumb. Clone the label and change the value
         * to that individual Thumb value in order to grab the true width.
         */
        if (
          (el as HTMLElement).innerText &&
          (el as HTMLElement).innerText.includes(separator) &&
          el.childElementCount === 0
        ) {
          const elClone = el.cloneNode(true) as HTMLElement;
          elClone.innerHTML = valueToLabel(value.toFixed(decimalPlaces));
          elClone.style.visibility = 'hidden';
          document.body.appendChild(elClone);
          elWidth = Math.ceil(elClone.getBoundingClientRect().width);
          document.body.removeChild(elClone);
        }
        return elWidth > width ? elWidth : width;
      },
      thumbEl.getBoundingClientRect().width
    )
  );
  return width;
};
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
 * @param thumbs - Array of Thumb elements
 * @param values - Array of Thumb values
 * @param separator - String separator for merged label values
 * @returns overlaps - Array of all overlapping thumbs from the index
 */
const getOverlaps = (
  index: number,
  offsets: { x: number; y: number }[],
  thumbs: Element[],
  values: number[],
  separator: string,
  decimalPlaces: number,
  valueToLabel = (value: string): string => value
) => {
  let overlaps: number[] = [];
  /**
   * Recursive function for building the overlaps Array
   * If an overlap is found, find the overlaps for that overlap
   * @param thumbIndex current Thumb index to find overlaps from
   */
  const buildOverlaps = (thumbIndex: number) => {
    const thumbXWidth = getThumbWidth(
      thumbs[thumbIndex],
      values[thumbIndex],
      separator,
      decimalPlaces,
      valueToLabel
    );
    const thumbX = offsets[thumbIndex].x;
    /**
     * Iterate through the Thumb offsets, if there is a match
     * add the thumbIndex and siblingIndex to the overlaps Array
     *
     * Then build overlaps from the overlapping siblingIndex
     */
    offsets.forEach(({ x: siblingX }, siblingIndex) => {
      const siblingWidth = getThumbWidth(
        thumbs[siblingIndex],
        values[siblingIndex],
        separator,
        decimalPlaces,
        valueToLabel
      );
      if (
        thumbIndex !== siblingIndex &&
        ((thumbX >= siblingX && thumbX <= siblingX + siblingWidth) ||
          (thumbX + thumbXWidth >= siblingX &&
            thumbX + thumbXWidth <= siblingX + siblingWidth))
      ) {
        if (!overlaps.includes(siblingIndex)) {
          overlaps.push(thumbIndex);
          overlaps.push(siblingIndex);
          overlaps = [...overlaps, thumbIndex, siblingIndex];
          buildOverlaps(siblingIndex);
        }
      }
    });
  };
  buildOverlaps(index);
  // Sort and remove duplicates from the built overlaps
  return Array.from(new Set(overlaps.sort()));
};
/**
 * A custom React Hook for calculating whether a thumb overlaps
 * another and whether labels could/should merge.
 * @param rangeRef - React ref value of Range component
 * @param values - current Range values Array
 * @param index - thumb index
 * @param step - step value, used to calculate the number of decimal places
 * @param separator - string to separate thumb values
 * @returns label value + styling for thumb label
 */
export const useThumbOverlap = (
  rangeRef: Range | null,
  values: number[],
  index: number,
  step = 0.1,
  separator = ' - ',
  valueToLabel = (value: string): string => value
) => {
  const decimalPlaces = getStepDecimals(step);
  // Create initial label style and value. Label value defaults to thumb value
  const [labelStyle, setLabelStyle] = useState<React.CSSProperties>({});
  const [labelValue, setLabelValue] = useState(
    valueToLabel(values[index].toFixed(decimalPlaces))
  );

  // When the rangeRef or values change, update the Thumb label values and styling
  useEffect(() => {
    if (rangeRef) {
      const thumbs = rangeRef.getThumbs();
      if (thumbs.length < 1) return;
      const newStyle: React.CSSProperties = {};
      const offsets = rangeRef.getOffsets();
      /**
       * Get any overlaps for the given Thumb index. This must return all linked
       * Thumbs. So if there are 4 Thumbs and Thumbs 2, 3 and 4 overlap. If we are
       * getting the overlaps for Thumb 1 and it overlaps only Thumb 2, we must get
       * 2, 3 and 4 also.
       */
      const overlaps = getOverlaps(
        index,
        offsets,
        thumbs,
        values,
        separator,
        decimalPlaces,
        valueToLabel
      );
      // Set a default label value of the Thumb value
      let labelValue = valueToLabel(values[index].toFixed(decimalPlaces));
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
            labelValues.push(values[thumb].toFixed(decimalPlaces));
          });
          /**
           *  Update the labelValue with the resulting Array
           *  joined by our defined separator
           */
          labelValue = Array.from(
            new Set(labelValues.sort((a, b) => parseFloat(a) - parseFloat(b)))
          )
            .map(valueToLabel)
            .join(separator);
          /**
           * Lastly, build the label styling. The label styling will
           * position the label and apply a transform so that it's centered.
           * We want the center point between the left edge of the left most Thumb
           * and the right edge of the right most Thumb.
           */
          const first = Math.min(...offsetsX);
          const last = Math.max(...offsetsX);
          const lastWidth = thumbs[
            overlaps[offsetsX.indexOf(last)]
          ].getBoundingClientRect().width;
          newStyle.left = `${Math.abs(first - (last + lastWidth)) / 2}px`;
          newStyle.transform = 'translate(-50%, 0)';
        } else {
          // If the Thumb isn't the left most Thumb, hide the Label!
          newStyle.visibility = 'hidden';
        }
      }
      // Update the label value and style
      setLabelValue(labelValue);
      setLabelStyle(newStyle);
    }
  }, [rangeRef, values]);

  return [labelValue, labelStyle];
};

/**
 * Util function for calculating the distance of the center of a thumb
 * form a given mouse/touch target's position
 * @param thumbEl - Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
function getThumbDistance(thumbEl: Element, clientX: number, clientY: number, direction: Direction) {
  const { x, y, width, height } = thumbEl.getBoundingClientRect()
  return isVertical(direction) ? Math.abs(clientY - (y + height / 2)) : Math.abs(clientX - (x + width / 2))
}