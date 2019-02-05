import * as React from 'react';
import {
  getMargin,
  getPadding,
  translateThumbs,
  replaceAt,
  checkBoundaries,
  relativeValue,
  schd
} from './utils';
import { IProps, TThumbOffsets, TEvent } from './types';

class Range extends React.Component<IProps> {
  static defaultProps = {
    step: 1,
    isVertical: false,
    allowOverlap: false,
    min: 0,
    max: 100
  };
  trackRef = React.createRef<HTMLElement>();
  thumbOffsets: TThumbOffsets = [];
  schdOnMouseMove: (e: MouseEvent) => void;
  schdOnTouchMove: (e: TouchEvent) => void;
  schdOnEnd: (e: Event) => void;

  state = {
    draggedThumbIndex: -1
  };

  constructor(props: IProps) {
    super(props);
    this.schdOnMouseMove = schd(this.onMouseMove);
    this.schdOnTouchMove = schd(this.onTouchMove);
    this.schdOnEnd = schd(this.onEnd);
  }

  componentDidMount() {
    this.props.values.forEach(value =>
      checkBoundaries(value, this.props.min, this.props.max)
    );
    translateThumbs(this.getThumbs(), this.getOffsets());
  }

  componentDidUpdate(prevProps: IProps) {
    const valuesUpdated = this.props.values.some(
      (value, index) => value !== prevProps.values[index]
    );
    if (valuesUpdated) {
      translateThumbs(this.getThumbs(), this.getOffsets());
    }
  }

  getOffsets = () => {
    const { isVertical, values, min, max } = this.props;
    const trackElement = this.trackRef.current!;
    const trackRect = trackElement.getBoundingClientRect();
    const trackPadding = getPadding(trackElement);
    return this.getThumbs().map((thumb, index) => {
      const thumbOffsets = { x: 0, y: 0 };
      const thumbRect = thumb.getBoundingClientRect();
      const thumbMargins = getMargin(thumb);
      thumbOffsets.x = isVertical
        ? ((thumbRect.width - trackRect.width) / 2 +
            thumbMargins.left +
            trackPadding.left) *
          -1
        : (thumbMargins.left + trackPadding.left) * -1;
      thumbOffsets.y = isVertical
        ? -trackPadding.left
        : ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
      if (isVertical) {
        thumbOffsets.y +=
          trackRect.height * relativeValue(values[index], min, max) -
          thumbRect.height / 2;
      } else {
        thumbOffsets.x +=
          trackRect.width * relativeValue(values[index], min, max) -
          thumbRect.width / 2;
      }
      return thumbOffsets;
    });
  };

  getThumbs = () => {
    if (this.trackRef && this.trackRef.current) {
      return Array.from(this.trackRef.current.children);
    }
    console.warn(
      'No thumbs found in the track container. Did you forget to pass & spread the `props` param in renderTrack?'
    );
    return [];
  };

  getTargetIndex = (e: TEvent) =>
    this.getThumbs().findIndex(
      child => child === e.target || child.contains(e.currentTarget)
    );

  onMouseDownTrack = (e: React.MouseEvent) => {
    // in case there is a single thumb, we want to support
    // moving the thumb to a place where the track is clicked
    if (e.button !== 0 || this.props.values.length > 1) return;
    e.preventDefault();
    e.persist();
    document.addEventListener('mousemove', this.schdOnMouseMove);
    document.addEventListener('mouseup', this.schdOnEnd);
    this.setState(
      {
        draggedThumbIndex: 0
      },
      () => this.onMove(e.clientX, e.clientY)
    );
  };

  onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    document.addEventListener('mousemove', this.schdOnMouseMove);
    document.addEventListener('mouseup', this.schdOnEnd);
    const index = this.getTargetIndex(e);
    if (index === -1) return;
    this.setState({
      draggedThumbIndex: index
    });
  };

  onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    document.addEventListener('touchmove', this.schdOnTouchMove, {
      passive: false
    });
    document.addEventListener('touchend', this.schdOnEnd);
    document.addEventListener('touchcancel', this.schdOnEnd);
    const index = this.getTargetIndex(e);
    if (index === -1) return;
    this.setState({
      draggedThumbIndex: index
    });
  };

  onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    this.onMove(e.clientX, e.clientY);
  };

  onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    this.onMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  onMove = (clientX: number, clientY: number) => {
    const { draggedThumbIndex } = this.state;
    const {
      isVertical,
      min,
      max,
      onChange,
      values,
      step,
      allowOverlap
    } = this.props;
    if (draggedThumbIndex === -1) return null;
    const trackElement = this.trackRef.current!;
    const trackRect = trackElement.getBoundingClientRect();
    const trackLength = isVertical ? trackRect.height : trackRect.width;
    const pointerOffset = isVertical
      ? clientY - trackRect.top
      : clientX - trackRect.left;
    const newValue = (pointerOffset / trackLength) * (max - min);
    if (Math.abs(values[draggedThumbIndex] - newValue) >= step) {
      onChange(
        replaceAt(
          values,
          draggedThumbIndex,
          this.normalizeValue(newValue, draggedThumbIndex)
        )
      );
    }
  };

  normalizeValue = (value: number, index: number) => {
    const { min, max, step, allowOverlap, values } = this.props;
    if (!allowOverlap) {
      const prev = values[index - 1];
      const next = values[index + 1];
      if (prev && prev > value) return prev;
      if (next && next < value) return next;
    }
    if (value > max) return max;
    if (value < min) return min;
    const remainder = value % step;
    const rounded =
      remainder === 0 ? value : Math.round((value - remainder) * 10e10) / 10e10;
    return rounded;
  };

  onEnd = (e: Event) => {
    e.preventDefault();
    document.removeEventListener('mousemove', this.schdOnMouseMove);
    document.removeEventListener('touchmove', this.schdOnTouchMove);
    document.removeEventListener('mouseup', this.schdOnEnd);
    document.removeEventListener('touchup', this.schdOnEnd);
    document.removeEventListener('touchcancel', this.schdOnEnd);
    this.setState({ draggedThumbIndex: -1 });
  };

  render() {
    const trackStyle = {};
    const thumbStyle = { position: 'absolute' };
    const { renderTrack, renderThumb, values } = this.props;
    return renderTrack({
      props: {
        style: trackStyle,
        onMouseDown: this.onMouseDownTrack,
        children: values.map((_v, index) =>
          renderThumb({
            props: {
              style: thumbStyle,
              key: index,
              onMouseDown: this.onMouseDown,
              onTouchStart: this.onTouchStart
            }
          })
        ),
        ref: this.trackRef
      }
    });
  }
}

export default Range;
