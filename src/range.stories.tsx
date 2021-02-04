import * as React from 'react';
import AllowOverlapExample from '../examples/AllowOverlap';
import AnimatingContainerExample from '../examples/AnimatingContainer';
import BasicExample from '../examples/Basic';
import BasicWithBorderExample from '../examples/BasicWithBorder';
import BigStepsExample from '../examples/BigSteps';
import DisabledExample from '../examples/Disabled';
import DownDirectionExample from '../examples/DownDirection';
import FinalChangeEventExample from '../examples/FinalChangeEvent';
import LabeledExample from '../examples/Labeled';
import LabeledMergeExample from '../examples/LabeledMerge';
import LabeledMergeSkinnyExample from '../examples/LabeledMergeSkinny';
import LabeledMergeCustomExample from '../examples/LabeledMergeCustom';
import LabeledTwoThumbsExample from '../examples/LabeledTwoThumbs';
import LeftDirectionExample from '../examples/LeftDirection';
import MarksDynamicExample from '../examples/MarksDynamicUpdate';
import MarksExample from '../examples/Marks';
import MarksVerticalExample from '../examples/MarksVertical';
import MultipleThumbsDraggableTrackExample from '../examples/MultipleThumbsDraggableTrack';
import MultipleThumbsExample from '../examples/MultipleThumbs';
import SuperSimpleExample from '../examples/SuperSimple';
import TwoThumbsExample from '../examples/TwoThumbs';
import TwoThumbsDraggableTrackExample from '../examples/TwoThumbsDraggableTrack';
import TwoThumbsDraggableTrackDownDirectionExample from '../examples/TwoThumbsDraggableTrackDownDirection';
import UpDirectionExample from '../examples/UpDirection';

import type { StoryProps } from '@ladle/react';

export const AllowOverlap: React.FC<StoryProps> = ({ globalState }) => (
  <AllowOverlapExample rtl={globalState.rtl} />
);
export const AnimatingContainer: React.FC<StoryProps> = ({ globalState }) => (
  <AnimatingContainerExample rtl={globalState.rtl} />
);
export const Basic: React.FC<StoryProps> = ({ globalState }) => (
  <BasicExample rtl={globalState.rtl} />
);
export const BasicWithBorder: React.FC<StoryProps> = ({ globalState }) => (
  <BasicWithBorderExample rtl={globalState.rtl} />
);
export const BigSteps: React.FC<StoryProps> = ({ globalState }) => (
  <BigStepsExample rtl={globalState.rtl} />
);
export const Disabled: React.FC<StoryProps> = ({ globalState }) => (
  <DisabledExample rtl={globalState.rtl} />
);
export const DownDirection: React.FC<StoryProps> = ({ globalState }) => (
  <DownDirectionExample rtl={globalState.rtl} />
);
export const Labeled: React.FC<StoryProps> = ({ globalState }) => (
  <LabeledExample rtl={globalState.rtl} />
);
export const LabeledTwoThumbs: React.FC<StoryProps> = ({ globalState }) => (
  <LabeledTwoThumbsExample rtl={globalState.rtl} />
);
export const LeftDirection: React.FC<StoryProps> = ({ globalState }) => (
  <LeftDirectionExample rtl={globalState.rtl} />
);
export const Marks: React.FC<StoryProps> = ({ globalState }) => (
  <MarksExample rtl={globalState.rtl} />
);
export const MarksDynamic: React.FC<StoryProps> = ({ globalState }) => (
  <MarksDynamicExample rtl={globalState.rtl} />
);
export const MarksVertical: React.FC<StoryProps> = ({ globalState }) => (
  <MarksVerticalExample rtl={globalState.rtl} />
);
export const MergingLabels: React.FC<StoryProps> = ({ globalState }) => (
  <LabeledMergeExample rtl={globalState.rtl} />
);
export const MergingLabelsCustom: React.FC<StoryProps> = ({ globalState }) => (
  <LabeledMergeCustomExample rtl={globalState.rtl} />
);
export const MergingLabelsSkinny: React.FC<StoryProps> = ({ globalState }) => (
  <LabeledMergeSkinnyExample rtl={globalState.rtl} />
);
export const MultipleThumbs: React.FC<StoryProps> = ({ globalState }) => (
  <MultipleThumbsExample rtl={globalState.rtl} />
);
export const MultipleThumbsWithDraggableTrack: React.FC<StoryProps> = ({
  globalState
}) => <MultipleThumbsDraggableTrackExample rtl={globalState.rtl} />;
export const OnFinalChangeEvent: React.FC<StoryProps> = ({ globalState }) => (
  <FinalChangeEventExample rtl={globalState.rtl} />
);
export const SuperSimple: React.FC<StoryProps> = ({ globalState }) => (
  <SuperSimpleExample rtl={globalState.rtl} />
);
export const TwoThumbs: React.FC<StoryProps> = ({ globalState }) => (
  <TwoThumbsExample rtl={globalState.rtl} />
);
export const TwoThumbsWithDraggableTrack: React.FC<StoryProps> = ({
  globalState
}) => <TwoThumbsDraggableTrackExample rtl={globalState.rtl} />;
export const TwoThumbsWithDraggableTrackAndDownDirection: React.FC<StoryProps> = ({
  globalState
}) => <TwoThumbsDraggableTrackDownDirectionExample rtl={globalState.rtl} />;
export const UpDirection: React.FC<StoryProps> = ({ globalState }) => (
  <UpDirectionExample rtl={globalState.rtl} />
);
