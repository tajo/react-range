import * as React from "react";
import AllowOverlapExample from "../examples/AllowOverlap";
import AnimatingContainerExample from "../examples/AnimatingContainer";
import BasicExample from "../examples/Basic";
import BasicVisibleLabelExample from "../examples/BasicVisibleLabel";
import BasicWithBorderExample from "../examples/BasicWithBorder";
import BigStepsExample from "../examples/BigSteps";
import DisabledExample from "../examples/Disabled";
import DownDirectionExample from "../examples/DownDirection";
import FinalChangeEventExample from "../examples/FinalChangeEvent";
import LabeledExample from "../examples/Labeled";
import LabeledMergeExample from "../examples/LabeledMerge";
import LabeledMergeSkinnyExample from "../examples/LabeledMergeSkinny";
import LabeledMergeCustomExample from "../examples/LabeledMergeCustom";
import LabeledTwoThumbsExample from "../examples/LabeledTwoThumbs";
import LeftDirectionExample from "../examples/LeftDirection";
import MarksDynamicExample from "../examples/MarksDynamicUpdate";
import MarksExample from "../examples/Marks";
import MarksVerticalExample from "../examples/MarksVertical";
import MultipleThumbsDraggableTrackExample from "../examples/MultipleThumbsDraggableTrack";
import MultipleThumbsExample from "../examples/MultipleThumbs";
import SuperSimpleExample from "../examples/SuperSimple";
import TwoThumbsExample from "../examples/TwoThumbs";
import TwoThumbsDraggableTrackExample from "../examples/TwoThumbsDraggableTrack";
import TwoThumbsDraggableTrackDownDirectionExample from "../examples/TwoThumbsDraggableTrackDownDirection";
import UpDirectionExample from "../examples/UpDirection";

export const AllowOverlap: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <AllowOverlapExample rtl={rtl} />
);
export const AnimatingContainer: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <AnimatingContainerExample rtl={rtl} />
);
export const Basic: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <BasicExample rtl={rtl} />
);
export const BasicVisibleLabel: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <BasicVisibleLabelExample rtl={rtl} />
);
export const BasicWithBorder: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <BasicWithBorderExample rtl={rtl} />
);
export const BigSteps: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <BigStepsExample rtl={rtl} />
);
export const Disabled: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <DisabledExample rtl={rtl} />
);
export const DownDirection: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <DownDirectionExample rtl={rtl} />
);
export const Labeled: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <LabeledExample rtl={rtl} />
);
export const LabeledTwoThumbs: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <LabeledTwoThumbsExample rtl={rtl} />
);
export const LeftDirection: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <LeftDirectionExample rtl={rtl} />
);
export const Marks: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <MarksExample rtl={rtl} />
);
export const MarksDynamic: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <MarksDynamicExample rtl={rtl} />
);
export const MarksVertical: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <MarksVerticalExample rtl={rtl} />
);
export const MergingLabels: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <LabeledMergeExample rtl={rtl} />
);
export const MergingLabelsCustom: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <LabeledMergeCustomExample rtl={rtl} />
);
export const MergingLabelsSkinny: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <LabeledMergeSkinnyExample rtl={rtl} />
);
export const MultipleThumbs: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <MultipleThumbsExample rtl={rtl} />
);
export const MultipleThumbsWithDraggableTrack: React.FC<{ rtl: boolean }> = ({
  rtl,
}) => <MultipleThumbsDraggableTrackExample rtl={rtl} />;
export const OnFinalChangeEvent: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <FinalChangeEventExample rtl={rtl} />
);
export const SuperSimple: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <SuperSimpleExample rtl={rtl} />
);
export const TwoThumbs: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <TwoThumbsExample rtl={rtl} />
);
export const TwoThumbsWithDraggableTrack: React.FC<{ rtl: boolean }> = ({
  rtl,
}) => <TwoThumbsDraggableTrackExample rtl={rtl} />;
export const TwoThumbsWithDraggableTrackAndDownDirection: React.FC<{
  rtl: boolean;
}> = ({ rtl }) => <TwoThumbsDraggableTrackDownDirectionExample rtl={rtl} />;
export const UpDirection: React.FC<{ rtl: boolean }> = ({ rtl }) => (
  <UpDirectionExample rtl={rtl} />
);
