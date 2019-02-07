import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from '../examples/Basic';
import Disabled from '../examples/Disabled';
import SuperSimple from '../examples/SuperSimple';
import TwoThumbs from '../examples/TwoThumbs';
import UpDirection from '../examples/UpDirection';
import DownDirection from '../examples/DownDirection';
import LeftDirection from '../examples/LeftDirection';
import MultipleThumbs from '../examples/MultipleThumbs';
import AllowOverlap from '../examples/AllowOverlap';
import BigSteps from '../examples/BigSteps';
import Labeled from '../examples/Labeled';

storiesOf('Range', module)
  .add('Basic', () => <Basic />)
  .add('Disabled', () => <Disabled />)
  .add('SuperSimple', () => <SuperSimple />)
  .add('Two thumbs', () => <TwoThumbs />)
  .add('Up Direction', () => <UpDirection />)
  .add('Down Direction', () => <DownDirection />)
  .add('Left Direction', () => <LeftDirection />)
  .add('Multiple thumbs', () => <MultipleThumbs />)
  .add('Allow overlap', () => <AllowOverlap />)
  .add('Big steps', () => <BigSteps />)
  .add('Labeled', () => <Labeled />);
