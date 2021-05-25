/// <reference types="react" />
import Range from './Range';
import { IThumbOffset, ITrackBackground, Direction } from './types';
export declare const getStepDecimals: (step: number) => number;
export declare function isTouchEvent(event: TouchEvent & MouseEvent): number;
export declare function isStepDivisible(min: number, max: number, step: number): boolean;
export declare function normalizeValue(value: number, index: number, min: number, max: number, step: number, allowOverlap: boolean, values: number[]): number;
export declare function relativeValue(value: number, min: number, max: number): number;
export declare function isVertical(direction: Direction): boolean;
export declare function checkBoundaries(value: number, min: number, max: number): void;
export declare function checkValuesAgainstBoundaries(value: number, min: number, max: number): number;
export declare function checkInitialOverlap(values: number[]): void;
export declare function getMargin(element: Element): {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export declare function getPaddingAndBorder(element: Element): {
    top: number;
    bottom: number;
    left: number;
    right: number;
};
export declare function translateThumbs(elements: Element[], offsets: IThumbOffset[], rtl: boolean): void;
/**
 * Util function for calculating the index of the thumb that is closes to a given position
 * @param thumbs - array of Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
export declare function getClosestThumbIndex(thumbs: Element[], clientX: number, clientY: number, direction: Direction): number;
export declare function translate(element: Element, x: number, y: number): void;
export declare const schd: (fn: Function) => (...args: any[]) => void;
export declare function replaceAt(values: number[], index: number, value: number): number[];
export declare function getTrackBackground({ values, colors, min, max, direction, rtl }: ITrackBackground): string;
export declare function voidFn(): void;
export declare function assertUnreachable(x: never): never;
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
export declare const useThumbOverlap: (rangeRef: Range | null, values: number[], index: number, step?: number, separator?: string, valueToLabel?: (value: string) => string) => (string | import("react").CSSProperties)[];
