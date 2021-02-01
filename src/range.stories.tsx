import * as React from 'react';
import BasicExample from '../examples/Basic';
import BasicWithBorderExample from '../examples/BasicWithBorder';
import DisabledExample from '../examples/Disabled';
import SuperSimpleExample from '../examples/SuperSimple';
import TwoThumbsExample from '../examples/TwoThumbs';
import TwoThumbsDraggableTrackExample from '../examples/TwoThumbsDraggableTrack';
import TwoThumbsDraggableTrackDownDirectionExample from '../examples/TwoThumbsDraggableTrackDownDirection';
import MarksExample from '../examples/Marks';
import MarksVerticalExample from '../examples/MarksVertical';
import DynamicMarksExample from '../examples/MarksDynamicUpdate';
import RtlExample from '../examples/Rtl';
import RtlTwoThumbsExample from '../examples/RtlTwoThumbs';
import RtlTwoThumbsDraggableTrackExample from '../examples/RtlTwoThumbsDraggableTrack';
import UpDirectionExample from '../examples/UpDirection';
import DownDirectionExample from '../examples/DownDirection';
import LeftDirectionExample from '../examples/LeftDirection';
import MultipleThumbsExample from '../examples/MultipleThumbs';
import MultipleThumbsDraggableTrackExample from '../examples/MultipleThumbsDraggableTrack';
import AllowOverlapExample from '../examples/AllowOverlap';
import BigStepsExample from '../examples/BigSteps';
import LabeledExample from '../examples/Labeled';
import LabeledTwoThumbsExample from '../examples/LabeledTwoThumbs';
import LabeledMergeExample from '../examples/LabeledMerge';
import LabeledMergeSkinnyExample from '../examples/LabeledMergeSkinny';
import LabeledMergeCustomExample from '../examples/LabeledMergeCustom';
import FinalChangeEventExample from '../examples/FinalChangeEvent';
import AnimatingContainerExample from '../examples/AnimatingContainer';

export const Basic = () => <BasicExample />;
export const BasicWithBorder = () => <BasicWithBorderExample />;
export const Disabled = () => <DisabledExample />;
export const SuperSimple = () => <SuperSimpleExample />;
export const TwoThumbs = () => <TwoThumbsExample />;
export const TwoThumbsWithDraggableTrack = () => (
  <TwoThumbsDraggableTrackExample />
);
export const TwoThumbsWithDraggableTrackAndDownDirection = () => (
  <TwoThumbsDraggableTrackDownDirectionExample />
);
export const Marks = () => <MarksExample />;
export const MarksVertical = () => <MarksVerticalExample />;
export const MarksDynamicUpdate = () => <DynamicMarksExample />;
export const Rtl = () => <RtlExample />;
export const RtlTwoThumbs = () => <RtlTwoThumbsExample />;
export const RtlTwoThumbsWithDraggableTrack = () => (
  <RtlTwoThumbsDraggableTrackExample />
);
export const UpDirection = () => <UpDirectionExample />;
export const DownDirection = () => <DownDirectionExample />;
export const LeftDirection = () => <LeftDirectionExample />;
export const MultipleThumbs = () => <MultipleThumbsExample />;
export const MultipleThumbsWithDraggableTrack = () => (
  <MultipleThumbsDraggableTrackExample />
);
export const AllowOverlap = () => <AllowOverlapExample />;
export const BigSteps = () => <BigStepsExample />;
export const Labeled = () => <LabeledExample />;
export const LabeledTwoThumbs = () => <LabeledTwoThumbsExample />;
export const MergingLabels = () => <LabeledMergeExample />;
export const MergingLabelsSkinny = () => <LabeledMergeSkinnyExample />;
export const MergingLabelsCustom = () => <LabeledMergeCustomExample />;
export const OnFinalChangeEvent = () => <FinalChangeEventExample />;
export const AnimatingContainer = () => <AnimatingContainerExample />;
