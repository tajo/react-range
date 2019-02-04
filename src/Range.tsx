import * as React from 'react';
import {
  getMargin,
  getPadding,
  translate,
  checkBoundaries,
  relativeValue
} from './utils';
import { IRangeProps } from './types';

class Range extends React.Component<IRangeProps> {
  static defaultProps = {
    step: 1,
    isVertical: false,
    min: 0,
    max: 100
  };
  trackRef = React.createRef<HTMLElement>();
  thumbOffsets = { x: 0, y: 0 };

  componentDidMount() {
    this.props.values.forEach(value =>
      checkBoundaries(value, this.props.min, this.props.max)
    );
    this.alignThumbs();
  }

  componentDidUpdate() {
    this.props.values.forEach(value =>
      checkBoundaries(value, this.props.min, this.props.max)
    );
    this.alignThumbs();
  }

  alignThumbs = () => {
    // setting up initial offsets, considering dimensions, paddings
    // and margins of both thumbs and the track
    const { isVertical, values, min, max } = this.props;
    const trackElement = this.trackRef.current!;
    const trackRect = trackElement.getBoundingClientRect();
    const trackPadding = getPadding(trackElement);
    const thumb = this.getThumbs()[0];
    const thumbRect = thumb.getBoundingClientRect();
    const thumbMargins = getMargin(thumb);
    this.thumbOffsets = {
      x: isVertical
        ? ((thumbRect.width - trackRect.width) / 2 +
            thumbMargins.left +
            trackPadding.left) *
          -1
        : (thumbMargins.left + trackPadding.left) * -1,
      y: isVertical
        ? -trackPadding.left
        : ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1
    };

    // adjusting the offsets based on the value
    if (isVertical) {
      this.thumbOffsets.y +=
        trackRect.height * relativeValue(values[0], min, max) -
        thumbRect.height / 2;
    } else {
      this.thumbOffsets.x +=
        trackRect.width * relativeValue(values[0], min, max) -
        thumbRect.width / 2;
    }

    translate(thumb, this.thumbOffsets.x, this.thumbOffsets.y);
    //console.log(this.thumbOffsets.x);
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

  render() {
    const trackStyle = {};
    const thumbStyle = {};
    return (
      <React.Fragment>
        {this.props.renderTrack({
          props: {
            style: trackStyle,
            children: this.props.renderThumb({ props: { style: thumbStyle } }),
            ref: this.trackRef
          }
        })}
      </React.Fragment>
    );
    return <input type="range" step="20" />;
  }
}

export default Range;
