import {
  normalizeValue,
  relativeValue,
  isVertical,
  checkBoundaries,
  checkInitialOverlap,
  replaceAt,
  getTrackBackground,
  getStepDecimals,
  isStepDivisible
} from './utils';
import { Direction } from './types';

describe('normalizeValue', () => {
  test('basic', () => {
    expect(normalizeValue(51, 0, 0, 100, 1, false, [50])).toBe(51);
    expect(normalizeValue(51.2, 0, 0, 100, 1, false, [50])).toBe(51);
    expect(normalizeValue(50.8, 0, 0, 100, 1, false, [50])).toBe(51);
    expect(normalizeValue(12.8, 0, 5, 95, 5, false, [55])).toBe(15);
  });
  test('negative', () => {
    expect(normalizeValue(-51, 0, -100, 0, 1, false, [-50])).toBe(-51);
    expect(normalizeValue(-51.2, 0, -100, 0, 1, false, [-50])).toBe(-51);
    expect(normalizeValue(-50.8, 0, -100, 0, 1, false, [-50])).toBe(-51);
  });
  test('negative and positive', () => {
    expect(normalizeValue(14.8, 0, -100, 100, 10, false, [0])).toBe(10);
    expect(normalizeValue(15, 0, -100, 100, 10, false, [0])).toBe(20);
    expect(normalizeValue(15.8, 0, -100, 100, 10, false, [0])).toBe(20);
    expect(normalizeValue(-14.8, 0, -100, 100, 10, false, [0])).toBe(-10);
    expect(normalizeValue(-15, 0, -100, 100, 10, false, [0])).toBe(-10);
    expect(normalizeValue(-15.8, 0, -100, 100, 10, false, [0])).toBe(-20);
  });
  test('decimal step', () => {
    expect(normalizeValue(50.009, 0, 0, 100, 0.01, false, [50])).toBe(50.01);
    expect(normalizeValue(50.004, 0, 0, 100, 0.01, false, [50])).toBe(50);
    expect(normalizeValue(50.009, 0, 0, 100, 0.01, false, [50])).toBe(50.01);
  });
  test('min and max exceeded', () => {
    expect(normalizeValue(120, 0, 0, 100, 1, false, [50])).toBe(100);
    expect(normalizeValue(-10, 0, 0, 100, 1, false, [50])).toBe(0);
  });
  test('overlaps', () => {
    expect(normalizeValue(80, 0, 0, 100, 1, false, [50, 70])).toBe(70);
    expect(normalizeValue(40, 1, 0, 100, 1, false, [50, 70])).toBe(50);
    expect(normalizeValue(80, 0, 0, 100, 1, true, [50, 70])).toBe(80);
    expect(normalizeValue(40, 1, 0, 100, 1, true, [50, 70])).toBe(40);
  });
});

test('relativeValue', () => {
  expect(relativeValue(50, 0, 100)).toBe(0.5);
  expect(relativeValue(0, 0, 100)).toBe(0);
  expect(relativeValue(100, 0, 100)).toBe(1);
  expect(relativeValue(60, 10, 110)).toBe(0.5);
  expect(relativeValue(50, 10, 110)).toBe(0.4);
  expect(relativeValue(0, -10, 10)).toBe(0.5);
  expect(relativeValue(-40, -100, 0)).toBe(0.6);
});

test('isVertical', () => {
  expect(isVertical(Direction.Up)).toBeTruthy();
  expect(isVertical(Direction.Down)).toBeTruthy();
  expect(isVertical(Direction.Left)).toBeFalsy();
  expect(isVertical(Direction.Right)).toBeFalsy();
});

test('isStepDivisible', () => {
  expect(isStepDivisible(0, 1, 0.1)).toEqual(true);
  expect(isStepDivisible(0, 100, 0.1)).toEqual(true);
  expect(isStepDivisible(0, 10, 1)).toEqual(true);
  expect(isStepDivisible(0, 10, 10)).toEqual(true);
  expect(isStepDivisible(0, 10, 2.5)).toEqual(true);
  expect(isStepDivisible(10, 20, 2.5)).toEqual(true);
  expect(isStepDivisible(10, 20, 5)).toEqual(true);

  expect(isStepDivisible(0, 1, 0.3)).toEqual(false);
  expect(isStepDivisible(0, 35, 6)).toEqual(false);
  expect(isStepDivisible(0, 10, 20)).toEqual(false);
  expect(isStepDivisible(0, 10, 0)).toEqual(false);
})

test('checkBoundaries', () => {
  expect(() => checkBoundaries(-10, 0, 100)).toThrow(
    new RangeError('value (-10) is smaller than min (0)')
  );
  expect(() => checkBoundaries(110, 0, 100)).toThrow(
    new RangeError('value (110) is bigger than max (100)')
  );
  expect(() => checkBoundaries(0, 200, 100)).toThrow(
    new RangeError('min (200) is equal/bigger than max (100)')
  );
  expect(() => checkBoundaries(50, 0, 100)).not.toThrow();
  expect(() => checkBoundaries(-50, -100, 0)).not.toThrow();
});

test('checkInitialOverlap', () => {
  expect(() => checkInitialOverlap([0, 10, 5])).toThrow(
    new RangeError(
      'values={[0,10,5]} needs to be sorted when allowOverlap={false}'
    )
  );
  expect(() => checkInitialOverlap([-10, 0, -5])).toThrow(
    new RangeError(
      'values={[-10,0,-5]} needs to be sorted when allowOverlap={false}'
    )
  );
  expect(() => checkInitialOverlap([0, 5, 10])).not.toThrow();
  expect(() => checkInitialOverlap([-10, -5, 0])).not.toThrow();
});

test('replaceAt', () => {
  expect(replaceAt([0, 1, 2], 0, 10)).toEqual([10, 1, 2]);
  expect(replaceAt([0, 1, 2], 2, 10)).toEqual([0, 1, 10]);
});

test('getTrackBackground', () => {
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 0,
      max: 100
    })
  ).toBe('linear-gradient(to right, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 20,
      max: 120
    })
  ).toBe('linear-gradient(to right, #aaa 0%, #aaa 20%, #bbb 20%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [-40],
      colors: ['#aaa', '#bbb'],
      min: -100,
      max: 0
    })
  ).toBe('linear-gradient(to right, #aaa 0%, #aaa 60%, #bbb 60%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [40, 70],
      colors: ['#aaa', '#bbb', '#ccc'],
      min: 0,
      max: 100
    })
  ).toBe(
    'linear-gradient(to right, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 70%, #ccc 70%, #ccc 100%)'
  );
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 0,
      max: 100,
      direction: Direction.Left
    })
  ).toBe('linear-gradient(to left, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 0,
      max: 100,
      direction: Direction.Up
    })
  ).toBe('linear-gradient(to top, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 0,
      max: 100,
      direction: Direction.Down
    })
  ).toBe('linear-gradient(to bottom, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 0,
      max: 100,
      direction: Direction.Right,
      rtl: true
    })
  ).toBe('linear-gradient(to left, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 100%)');
  expect(
    getTrackBackground({
      values: [40],
      colors: ['#aaa', '#bbb'],
      min: 0,
      max: 100,
      direction: Direction.Left,
      rtl: true
    })
  ).toBe('linear-gradient(to right, #aaa 0%, #aaa 40%, #bbb 40%, #bbb 100%)');
});

test('getStepDecimals', () => {
  expect(getStepDecimals(1)).toBe(0);
  expect(getStepDecimals(1.0)).toBe(0);
  expect(getStepDecimals(1.1)).toBe(1);
  expect(getStepDecimals(1.5)).toBe(1);
  expect(getStepDecimals(1.55)).toBe(2);
  expect(getStepDecimals(1.2345)).toBe(4);
});
