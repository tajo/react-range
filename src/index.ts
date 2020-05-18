import Range from './Range';
import { getTrackBackground, useThumbOverlap, relativeValue } from './utils';
import { Direction } from './types';
import { install } from 'resize-observer';

export { Range, getTrackBackground, Direction, useThumbOverlap, relativeValue };

// @ts-ignore
if (!window.ResizeObserver) install();