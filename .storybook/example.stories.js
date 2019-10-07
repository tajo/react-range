import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from '../examples/Basic';
import Disabled from '../examples/Disabled';
import SuperSimple from '../examples/SuperSimple';
import TwoThumbs from '../examples/TwoThumbs';
import Rtl from '../examples/Rtl';
import RtlTwoThumbs from '../examples/RtlTwoThumbs';
import UpDirection from '../examples/UpDirection';
import DownDirection from '../examples/DownDirection';
import LeftDirection from '../examples/LeftDirection';
import MultipleThumbs from '../examples/MultipleThumbs';
import AllowOverlap from '../examples/AllowOverlap';
import BigSteps from '../examples/BigSteps';
import Labeled from '../examples/Labeled';
import LabeledTwoThumbs from '../examples/LabeledTwoThumbs';
import LabeledMerge from '../examples/LabeledMerge';
import LabeledMergeSkinny from '../examples/LabeledMergeSkinny';
import FinalChangeEvent from '../examples/FinalChangeEvent';
import AdjustedStep from '../examples/AdjustedStep';

storiesOf('Range', module)
  .add('Basic', () => <Basic />)
  .add('Disabled', () => <Disabled />)
  .add('Super simple', () => <SuperSimple />)
  .add('Two thumbs', () => <TwoThumbs />)
  .add('Rtl', () => <Rtl />)
  .add('Rtl Two Thumbs', () => <RtlTwoThumbs />)
  .add('Up direction', () => <UpDirection />)
  .add('Down direction', () => <DownDirection />)
  .add('Left direction', () => <LeftDirection />)
  .add('Multiple thumbs', () => <MultipleThumbs />)
  .add('Allow overlap', () => <AllowOverlap />)
  .add('Big steps', () => <BigSteps />)
  .add('Labeled', () => <Labeled />)
  .add('Labeled two thumbs', () => <LabeledTwoThumbs/>)
  .add('Merging labels', () => <LabeledMerge />)
  .add('Merging labels skinny', () => <LabeledMergeSkinny />)
  .add('onFinalChange event', () => <FinalChangeEvent />)
  .add('Adjusted step', () => <AdjustedStep />);
