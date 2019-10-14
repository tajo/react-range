import * as React from 'react';
import {
  getMargin,
  getPadding,
  translateThumbs,
  replaceAt,
  checkBoundaries,
  relativeValue,
  schd,
  normalizeValue,
  checkInitialOverlap,
  voidFn,
  isVertical,
  assertUnreachable,
  isTouchEvent
} from './utils';
import { IProps, Direction } from './types';

const INCREASE_KEYS = ['ArrowRight', 'ArrowUp', 'k', 'PageUp'];
const DECREASE_KEYS = ['ArrowLeft', 'ArrowDown', 'j', 'PageDown'];

class Range extends React.Component<IProps> {
  static defaultProps = {
    step: 1,
    direction: Direction.Right,
    rtl: false,
    disabled: false,
    allowOverlap: false,
    min: 0,
    max: 100
  };
  trackRef = React.createRef<HTMLElement>();
  schdOnMouseMove: (e: MouseEvent) => void;
  schdOnTouchMove: (e: TouchEvent) => void;
  schdOnEnd: (e: Event) => void;
  schdOnWindowResize: () => void;

  state = {
    draggedThumbIndex: -1,
    thumbZIndexes: new Array(this.props.values.length).fill(0).map((t, i) => i),
    isChanged: false,
  };

  constructor(props: IProps) {
    super(props);
    this.schdOnMouseMove = schd(this.onMouseMove);
    this.schdOnTouchMove = schd(this.onTouchMove);
    this.schdOnEnd = schd(this.onEnd);
    this.schdOnWindowResize = schd(this.onWindowResize);
  }

  componentDidMount() {
    window.addEventListener('resize', this.schdOnWindowResize);

    this.trackRef.current.addEventListener('touchstart', this.onMouseOrTouchStart as any, {
      passive: false
    });
    this.trackRef.current.addEventListener('mousedown', this.onMouseOrTouchStart as any, {
      passive: false
    });

    !this.props.allowOverlap && checkInitialOverlap(this.props.values);
    this.props.values.forEach(value =>
      checkBoundaries(value, this.props.min, this.props.max)
    );
    translateThumbs(this.getThumbs(), this.getOffsets(), this.props.rtl);
  }

  componentDidUpdate(prevProps: IProps) {
    translateThumbs(this.getThumbs(), this.getOffsets(), this.props.rtl);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.schdOnWindowResize);

    this.trackRef.current.removeEventListener('mousedown', this.onMouseOrTouchStart as any);
    this.trackRef.current.removeEventListener('touchstart', this.onMouseOrTouchStart as any);
    this.trackRef.current.removeEventListener('touchend', this.schdOnEnd as any);
  }

  getOffsets = () => {
    const { direction, values, min, max } = this.props;
    const trackElement = this.trackRef.current!;
    const trackRect = trackElement.getBoundingClientRect();
    const trackPadding = getPadding(trackElement);
    return this.getThumbs().map((thumb, index) => {
      const thumbOffsets = { x: 0, y: 0 };
      const thumbRect = thumb.getBoundingClientRect();
      const thumbMargins = getMargin(thumb);
      switch (direction) {
        case Direction.Right:
          thumbOffsets.x = (thumbMargins.left + trackPadding.left) * -1;
          thumbOffsets.y =
            ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
          thumbOffsets.x +=
            trackRect.width * relativeValue(values[index], min, max) -
            thumbRect.width / 2;
          return thumbOffsets;
        case Direction.Left:
          thumbOffsets.x = (thumbMargins.right + trackPadding.right) * -1;
          thumbOffsets.y =
            ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
          thumbOffsets.x +=
            trackRect.width -
            trackRect.width * relativeValue(values[index], min, max) -
            thumbRect.width / 2;
          return thumbOffsets;
        case Direction.Up:
          thumbOffsets.x =
            ((thumbRect.width - trackRect.width) / 2 +
              thumbMargins.left +
              trackPadding.left) *
            -1;
          thumbOffsets.y = -trackPadding.left;
          thumbOffsets.y +=
            trackRect.height -
            trackRect.height * relativeValue(values[index], min, max) -
            thumbRect.height / 2;
          return thumbOffsets;
        case Direction.Down:
          thumbOffsets.x =
            ((thumbRect.width - trackRect.width) / 2 +
              thumbMargins.left +
              trackPadding.left) *
            -1;
          thumbOffsets.y = -trackPadding.left;
          thumbOffsets.y +=
            trackRect.height * relativeValue(values[index], min, max) -
            thumbRect.height / 2;
          return thumbOffsets;
        default:
          return assertUnreachable(direction);
      }
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

  getTargetIndex = (e: Event) =>
    this.getThumbs().findIndex(
      child => child === e.target || child.contains(e.target as Node)
    );

  addTouchEvents = (e: TouchEvent) => {
    e.preventDefault();
    this.trackRef.current.addEventListener('touchmove', this.schdOnTouchMove, {
      passive: false
    });
    this.trackRef.current.addEventListener('touchend', this.schdOnEnd);
    this.trackRef.current.addEventListener('touchcancel', this.schdOnEnd);
  };

  addMouseEvents = (e: MouseEvent) => {
    e.preventDefault();
    this.trackRef.current.addEventListener('mousemove', this.schdOnMouseMove);
    this.trackRef.current.addEventListener('mouseup', this.schdOnEnd);
  };

  onMouseDownTrack = (e: React.MouseEvent) => {
    // in case there is a single thumb, we want to support
    // moving the thumb to a place where the track is clicked
    if (e.button !== 0 || this.props.values.length > 1) return;
    e.persist();
    this.addMouseEvents(e.nativeEvent);
    this.setState(
      {
        draggedThumbIndex: 0
      },
      () => this.onMove(e.clientX, e.clientY)
    );
  };

  onWindowResize = () => {
    translateThumbs(this.getThumbs(), this.getOffsets(), this.props.rtl);
  };

  onTouchStartTrack = (e: React.TouchEvent) => {
    // in case there is a single thumb, we want to support
    // moving the thumb to a place where the track is clicked
    if (this.props.values.length > 1) return;
    e.persist();
    this.addTouchEvents(e.nativeEvent);
    this.setState(
      {
        draggedThumbIndex: 0
      },
      () => this.onMove(e.touches[0].clientX, e.touches[0].clientY)
    );
  };

  onMouseOrTouchStart = (e: MouseEvent & TouchEvent) => {
    if (this.props.disabled) return;
    const isTouch = isTouchEvent(e);
    if (!isTouch && e.button !== 0) return;
    const index = this.getTargetIndex(e);
    if (index === -1) return;
    e.preventDefault();
    if (isTouch) {
      this.addTouchEvents(e);
    } else {
      this.addMouseEvents(e);
    }
    this.setState({
      draggedThumbIndex: index,
      thumbZIndexes: this.state.thumbZIndexes.map((t, i) => {
        if (i === index) {
          return Math.max(...this.state.thumbZIndexes);
        }
        return t <= this.state.thumbZIndexes[index] ? t : t - 1;
      })
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

  onKeyDown = (e: React.KeyboardEvent) => {
    const { values, onChange, step, rtl } = this.props;
    const { isChanged } = this.state;
    const index = this.getTargetIndex(e.nativeEvent);
    const inverter = rtl ? -1 : 1;
    if (index === -1) return;

    if (INCREASE_KEYS.includes(e.key)) {
      e.preventDefault();
      this.setState({
        draggedThumbIndex: index,
        isChanged: true,
      });
      onChange(
        replaceAt(
          values,
          index,
          this.normalizeValue(
            values[index] + inverter * (e.key === 'PageUp' ? step * 10 : step),
            index
          )
        )
      );
    } else if (DECREASE_KEYS.includes(e.key)) {
      e.preventDefault();
      this.setState({
        draggedThumbIndex: index,
        isChanged: true,
      });
      onChange(
        replaceAt(
          values,
          index,
          this.normalizeValue(
            values[index] - inverter * (e.key === 'PageDown' ? step * 10 : step),
            index
          )
        )
      );
    } else if (e.key === 'Tab') {
      this.setState({ draggedThumbIndex: -1 }, () => {
        // If key pressed when thumb was moving, fire onFinalChange
        if (isChanged) {
          this.fireOnFinalChange();
        }
      });
    } else {
      if (isChanged) {
        this.fireOnFinalChange();
      }
    }
  };

  onKeyUp = (e: React.KeyboardEvent) => {
    const { isChanged } = this.state;
    this.setState({
      draggedThumbIndex: -1,
    }, () => {
      if (isChanged) {
        this.fireOnFinalChange();
      }
    });
  };

  onMove = (clientX: number, clientY: number) => {
    const { draggedThumbIndex } = this.state;
    const { direction, min, max, onChange, values, step, rtl } = this.props;
    if (draggedThumbIndex === -1) return null;
    const trackElement = this.trackRef.current!;
    const trackRect = trackElement.getBoundingClientRect();
    const trackLength = isVertical(direction)
      ? trackRect.height
      : trackRect.width;
    let newValue = 0;
    switch (direction) {
      case Direction.Right:
        newValue =
          ((clientX - trackRect.left) / trackLength) * (max - min) + min;
        break;
      case Direction.Left:
        newValue =
          ((trackLength - (clientX - trackRect.left)) / trackLength) *
            (max - min) +
          min;
        break;
      case Direction.Down:
        newValue =
          ((clientY - trackRect.top) / trackLength) * (max - min) + min;
        break;
      case Direction.Up:
        newValue =
          ((trackLength - (clientY - trackRect.top)) / trackLength) *
            (max - min) +
          min;
        break;
      default:
        assertUnreachable(direction);
    }
    // invert for RTL
    if (rtl) {
      newValue = max - newValue;
    }
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
    return normalizeValue(value, index, min, max, step, allowOverlap, values);
  };

  onEnd = (e: Event) => {
    e.preventDefault();

    this.trackRef.current.removeEventListener('mousemove', this.schdOnMouseMove);
    this.trackRef.current.removeEventListener('touchmove', this.schdOnTouchMove);
    this.trackRef.current.removeEventListener('mouseup', this.schdOnEnd);
    this.trackRef.current.removeEventListener('touchup', this.schdOnEnd);
    this.trackRef.current.removeEventListener('touchcancel', this.schdOnEnd);

    this.setState({ draggedThumbIndex: -1 }, () => {
      this.fireOnFinalChange();
    });
  };

  fireOnFinalChange = () => {
    this.setState({ isChanged: false });
    const { onFinalChange, values } = this.props;
    if (onFinalChange) {
      onFinalChange(values);
    }
  };

  render() {
    const {
      renderTrack,
      renderThumb,
      values,
      min,
      max,
      allowOverlap,
      disabled
    } = this.props;
    const { draggedThumbIndex, thumbZIndexes } = this.state;

    return renderTrack({
      props: {
        style: {
          // creates stacking context that prevents z-index applied to thumbs 
          // interfere with other elements
          transform: 'scale(1)',
          cursor:
            draggedThumbIndex > -1
              ? 'grabbing'
              : values.length === 1 && !disabled
              ? 'pointer'
              : 'inherit'
        },
        onMouseDown: disabled ? voidFn : this.onMouseDownTrack,
        onTouchStart: disabled ? voidFn : this.onTouchStartTrack,
        ref: this.trackRef
      },
      isDragged: this.state.draggedThumbIndex > -1,
      disabled,
      children: values.map((value, index) => {
        const isDragged = this.state.draggedThumbIndex === index;

        return renderThumb({
          index,
          value,
          isDragged,
          props: {
            style: {
              position: 'absolute',
              zIndex: thumbZIndexes[index],
              cursor: disabled ? 'inherit' : isDragged ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            } as React.CSSProperties,
            key: index,
            tabIndex: disabled ? undefined : 0,
            'aria-valuemax': allowOverlap ? max : values[index + 1] || max,
            'aria-valuemin': allowOverlap ? min : values[index - 1] || min,
            'aria-valuenow': value,
            draggable: false,
            role: 'slider',
            onKeyDown: disabled ? voidFn : this.onKeyDown,
            onKeyUp: disabled ? voidFn : this.onKeyUp
          }
        });
      })
    });
  }
}

export default Range;
