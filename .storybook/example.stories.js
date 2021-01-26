import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from '../examples/Basic';
import BasicWithBorder from '../examples/BasicWithBorder';
import Disabled from '../examples/Disabled';
import SuperSimple from '../examples/SuperSimple';
import TwoThumbs from '../examples/TwoThumbs';
import TwoThumbsDraggableTrack from '../examples/TwoThumbsDraggableTrack';
import TwoThumbsDraggableTrackDownDirection from '../examples/TwoThumbsDraggableTrackDownDirection';
import Marks from '../examples/Marks';
import MarksVertical from '../examples/MarksVertical';
import Rtl from '../examples/Rtl';
import RtlTwoThumbs from '../examples/RtlTwoThumbs';
import RtlTwoThumbsDraggableTrack from '../examples/RtlTwoThumbsDraggableTrack';
import UpDirection from '../examples/UpDirection';
import DownDirection from '../examples/DownDirection';
import LeftDirection from '../examples/LeftDirection';
import MultipleThumbs from '../examples/MultipleThumbs';
import MultipleThumbsDraggableTrack from '../examples/MultipleThumbsDraggableTrack';
import AllowOverlap from '../examples/AllowOverlap';
import BigSteps from '../examples/BigSteps';
import Labeled from '../examples/Labeled';
import LabeledTwoThumbs from '../examples/LabeledTwoThumbs';
import LabeledMerge from '../examples/LabeledMerge';
import LabeledMergeSkinny from '../examples/LabeledMergeSkinny';
import LabeledMergeCustom from '../examples/LabeledMergeCustom';
import FinalChangeEvent from '../examples/FinalChangeEvent';
import AnimatingContainer from '../examples/AnimatingContainer';
import EmptyValue from '../examples/EmptyValue';
// initialize polyfill for :focus-visible pseudo-class
import '../node_modules/focus-visible/dist/focus-visible.min.js';

storiesOf('Range', module)
  .add('Basic', () => <Basic />)
  .add('Basic with border', () => <BasicWithBorder />)
  .add('Disabled', () => <Disabled />)
  .add('Super simple', () => <SuperSimple />)
  .add('Two thumbs', () => <TwoThumbs />)
  .add('Two thumbs with draggable track', () => <TwoThumbsDraggableTrack />)
  .add('Two thumbs with draggable track and Down direction', () => (
    <TwoThumbsDraggableTrackDownDirection />
  ))
  .add('Marks', () => <Marks />)
  .add('Marks vertical', () => <MarksVertical />)
  .add('Rtl', () => <Rtl />)
  .add('Rtl Two Thumbs', () => <RtlTwoThumbs />)
  .add('Rtl Two Thumbs with draggable track', () => (
    <RtlTwoThumbsDraggableTrack />
  ))
  .add('Up direction', () => <UpDirection />)
  .add('Down direction', () => <DownDirection />)
  .add('Left direction', () => <LeftDirection />)
  .add('Multiple thumbs', () => <MultipleThumbs />)
  .add('Multiple thumbs with draggable track', () => (
    <MultipleThumbsDraggableTrack />
  ))
  .add('Allow overlap', () => <AllowOverlap />)
  .add('Big steps', () => <BigSteps />)
  .add('Labeled', () => <Labeled />)
  .add('Labeled two thumbs', () => <LabeledTwoThumbs />)
  .add('Merging labels', () => <LabeledMerge />)
  .add('Merging labels skinny', () => <LabeledMergeSkinny />)
  .add('Merging labels custom', () => <LabeledMergeCustom />)
  .add('onFinalChange event', () => <FinalChangeEvent />)
  .add('Animating container', () => <AnimatingContainer />)
  .add('Empty values', () => <EmptyValue />
);
