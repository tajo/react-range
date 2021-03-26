"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var utils_1 = require("./utils");
var types_1 = require("./types");
var INCREASE_KEYS = ['ArrowRight', 'ArrowUp', 'k', 'PageUp'];
var DECREASE_KEYS = ['ArrowLeft', 'ArrowDown', 'j', 'PageDown'];
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range(props) {
        var _this = _super.call(this, props) || this;
        _this.trackRef = React.createRef();
        _this.thumbRefs = [];
        _this.markRefs = [];
        _this.state = {
            draggedTrackPos: [-1, -1],
            draggedThumbIndex: -1,
            thumbZIndexes: new Array(_this.props.values.length).fill(0).map(function (t, i) { return i; }),
            isChanged: false,
            markOffsets: []
        };
        _this.getOffsets = function () {
            var _a = _this.props, direction = _a.direction, values = _a.values, min = _a.min, max = _a.max;
            var trackElement = _this.trackRef.current;
            var trackRect = trackElement.getBoundingClientRect();
            var trackPadding = utils_1.getPaddingAndBorder(trackElement);
            return _this.getThumbs().map(function (thumb, index) {
                var thumbOffsets = { x: 0, y: 0 };
                var thumbRect = thumb.getBoundingClientRect();
                var thumbMargins = utils_1.getMargin(thumb);
                switch (direction) {
                    case types_1.Direction.Right:
                        thumbOffsets.x = (thumbMargins.left + trackPadding.left) * -1;
                        thumbOffsets.y =
                            ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
                        thumbOffsets.x +=
                            trackRect.width * utils_1.relativeValue(values[index], min, max) -
                                thumbRect.width / 2;
                        return thumbOffsets;
                    case types_1.Direction.Left:
                        thumbOffsets.x = (thumbMargins.right + trackPadding.right) * -1;
                        thumbOffsets.y =
                            ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
                        thumbOffsets.x +=
                            trackRect.width -
                                trackRect.width * utils_1.relativeValue(values[index], min, max) -
                                thumbRect.width / 2;
                        return thumbOffsets;
                    case types_1.Direction.Up:
                        thumbOffsets.x =
                            ((thumbRect.width - trackRect.width) / 2 +
                                thumbMargins.left +
                                trackPadding.left) *
                                -1;
                        thumbOffsets.y = -trackPadding.left;
                        thumbOffsets.y +=
                            trackRect.height -
                                trackRect.height * utils_1.relativeValue(values[index], min, max) -
                                thumbRect.height / 2;
                        return thumbOffsets;
                    case types_1.Direction.Down:
                        thumbOffsets.x =
                            ((thumbRect.width - trackRect.width) / 2 +
                                thumbMargins.left +
                                trackPadding.left) *
                                -1;
                        thumbOffsets.y = -trackPadding.left;
                        thumbOffsets.y +=
                            trackRect.height * utils_1.relativeValue(values[index], min, max) -
                                thumbRect.height / 2;
                        if (_this.getThumbOffset) {
                            thumbOffsets = _this.getThumbOffset(thumbOffsets);
                        }
                        return thumbOffsets;
                    default:
                        return utils_1.assertUnreachable(direction);
                }
            });
        };
        _this.getThumbs = function () {
            if (_this.trackRef && _this.trackRef.current) {
                return Array.from(_this.trackRef.current.children).filter(function (el) {
                    return el.hasAttribute('aria-valuenow');
                });
            }
            console.warn('No thumbs found in the track container. Did you forget to pass & spread the `props` param in renderTrack?');
            return [];
        };
        _this.getTargetIndex = function (e) {
            return _this.getThumbs().findIndex(function (child) { return child === e.target || child.contains(e.target); });
        };
        _this.addTouchEvents = function (e) {
            document.addEventListener('touchmove', _this.schdOnTouchMove, {
                passive: false
            });
            document.addEventListener('touchend', _this.schdOnEnd, {
                passive: false
            });
            document.addEventListener('touchcancel', _this.schdOnEnd, {
                passive: false
            });
        };
        _this.addMouseEvents = function (e) {
            document.addEventListener('mousemove', _this.schdOnMouseMove);
            document.addEventListener('mouseup', _this.schdOnEnd);
        };
        _this.onMouseDownTrack = function (e) {
            var _a;
            if (e.button !== 0)
                return;
            e.persist();
            e.preventDefault();
            _this.addMouseEvents(e.nativeEvent);
            if (_this.props.values.length > 1 && _this.props.draggableTrack) {
                if (_this.thumbRefs.some(function (thumbRef) { var _a; return (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target); }))
                    return;
                // handle dragging the whole track
                _this.setState({
                    draggedTrackPos: [e.clientX, e.clientY]
                }, function () { return _this.onMove(e.clientX, e.clientY); });
            }
            else {
                // get the index of the thumb that is closest to the place where the track is clicked
                var draggedThumbIndex = utils_1.getClosestThumbIndex(_this.thumbRefs.map(function (t) { return t.current; }), e.clientX, e.clientY, _this.props.direction);
                // move the thumb which is closest to the place where the track is clicked
                (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
                _this.setState({
                    draggedThumbIndex: draggedThumbIndex
                }, function () { return _this.onMove(e.clientX, e.clientY); });
            }
        };
        _this.onResize = function () {
            utils_1.translateThumbs(_this.getThumbs(), _this.getOffsets(), _this.props.rtl);
            _this.calculateMarkOffsets();
        };
        _this.onTouchStartTrack = function (e) {
            var _a;
            e.persist();
            _this.addTouchEvents(e.nativeEvent);
            if (_this.props.values.length > 1 && _this.props.draggableTrack) {
                if (_this.thumbRefs.some(function (thumbRef) { var _a; return (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target); }))
                    return;
                // handle dragging the whole track
                _this.setState({
                    draggedTrackPos: [e.touches[0].clientX, e.touches[0].clientY]
                }, function () { return _this.onMove(e.touches[0].clientX, e.touches[0].clientY); });
            }
            else {
                // get the index of the thumb that is closest to the place where the track is clicked
                var draggedThumbIndex = utils_1.getClosestThumbIndex(_this.thumbRefs.map(function (t) { return t.current; }), e.touches[0].clientX, e.touches[0].clientY, _this.props.direction);
                // move the thumb which is closest to the place where the track is clicked
                (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
                _this.setState({
                    draggedThumbIndex: draggedThumbIndex
                }, function () { return _this.onMove(e.touches[0].clientX, e.touches[0].clientY); });
            }
        };
        _this.onMouseOrTouchStart = function (e) {
            if (_this.props.disabled)
                return;
            var isTouch = utils_1.isTouchEvent(e);
            if (!isTouch && e.button !== 0)
                return;
            var index = _this.getTargetIndex(e);
            if (index === -1)
                return;
            if (isTouch) {
                _this.addTouchEvents(e);
            }
            else {
                _this.addMouseEvents(e);
            }
            _this.setState({
                draggedThumbIndex: index,
                thumbZIndexes: _this.state.thumbZIndexes.map(function (t, i) {
                    if (i === index) {
                        return Math.max.apply(Math, _this.state.thumbZIndexes);
                    }
                    return t <= _this.state.thumbZIndexes[index] ? t : t - 1;
                })
            });
        };
        _this.onMouseMove = function (e) {
            e.preventDefault();
            _this.onMove(e.clientX, e.clientY);
        };
        _this.onTouchMove = function (e) {
            e.preventDefault();
            _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        _this.onKeyDown = function (e) {
            var _a = _this.props, values = _a.values, onChange = _a.onChange, step = _a.step, rtl = _a.rtl;
            var isChanged = _this.state.isChanged;
            var index = _this.getTargetIndex(e.nativeEvent);
            var inverter = rtl ? -1 : 1;
            if (index === -1)
                return;
            if (INCREASE_KEYS.includes(e.key)) {
                e.preventDefault();
                _this.setState({
                    draggedThumbIndex: index,
                    isChanged: true
                });
                onChange(utils_1.replaceAt(values, index, _this.normalizeValue(values[index] + inverter * (e.key === 'PageUp' ? step * 10 : step), index)));
            }
            else if (DECREASE_KEYS.includes(e.key)) {
                e.preventDefault();
                _this.setState({
                    draggedThumbIndex: index,
                    isChanged: true
                });
                onChange(utils_1.replaceAt(values, index, _this.normalizeValue(values[index] -
                    inverter * (e.key === 'PageDown' ? step * 10 : step), index)));
            }
            else if (e.key === 'Tab') {
                _this.setState({ draggedThumbIndex: -1 }, function () {
                    // If key pressed when thumb was moving, fire onFinalChange
                    if (isChanged) {
                        _this.fireOnFinalChange();
                    }
                });
            }
            else {
                if (isChanged) {
                    _this.fireOnFinalChange();
                }
            }
        };
        _this.onKeyUp = function (e) {
            var isChanged = _this.state.isChanged;
            _this.setState({
                draggedThumbIndex: -1
            }, function () {
                if (isChanged) {
                    _this.fireOnFinalChange();
                }
            });
        };
        _this.onMove = function (clientX, clientY) {
            var _a = _this.state, draggedThumbIndex = _a.draggedThumbIndex, draggedTrackPos = _a.draggedTrackPos;
            var _b = _this.props, direction = _b.direction, min = _b.min, max = _b.max, onChange = _b.onChange, values = _b.values, step = _b.step, rtl = _b.rtl;
            if (draggedThumbIndex === -1 &&
                draggedTrackPos[0] === -1 &&
                draggedTrackPos[1] === -1)
                return null;
            var trackElement = _this.trackRef.current;
            // If component was closed down prematurely, A last onMove could be triggered based on requestAnimationFrame()
            if (!trackElement)
                return null;
            var trackRect = trackElement.getBoundingClientRect();
            var trackLength = utils_1.isVertical(direction)
                ? trackRect.height
                : trackRect.width;
            if (draggedTrackPos[0] !== -1 && draggedTrackPos[1] !== -1) {
                // calculate how much it moved since the last update
                var dX = clientX - draggedTrackPos[0];
                var dY = clientY - draggedTrackPos[1];
                // calculate the delta of the value
                var deltaValue = 0;
                switch (direction) {
                    case types_1.Direction.Right:
                    case types_1.Direction.Left:
                        deltaValue = (dX / trackLength) * (max - min) + min;
                        break;
                    case types_1.Direction.Down:
                    case types_1.Direction.Up:
                        deltaValue = (dY / trackLength) * (max - min) + min;
                        break;
                    default:
                        utils_1.assertUnreachable(direction);
                }
                // invert for RTL
                if (rtl) {
                    deltaValue *= -1;
                }
                if (Math.abs(deltaValue) >= step / 2) {
                    // adjust delta so it fits into the range
                    for (var i = 0; i < _this.thumbRefs.length; i++) {
                        if ((values[i] === max && Math.sign(deltaValue) === 1) ||
                            (values[i] === min && Math.sign(deltaValue) === -1))
                            return;
                        var thumbValue = values[i] + deltaValue;
                        if (thumbValue > max)
                            deltaValue = max - values[i];
                        else if (thumbValue < min)
                            deltaValue = min - values[i];
                    }
                    // add the delta to each thumb
                    var newValues = values.slice(0);
                    for (var i = 0; i < _this.thumbRefs.length; i++) {
                        newValues = utils_1.replaceAt(newValues, i, _this.normalizeValue(values[i] + deltaValue, i));
                    }
                    _this.setState({
                        draggedTrackPos: [clientX, clientY]
                    });
                    onChange(newValues);
                }
            }
            else {
                var newValue = 0;
                switch (direction) {
                    case types_1.Direction.Right:
                        newValue =
                            ((clientX - trackRect.left) / trackLength) * (max - min) + min;
                        break;
                    case types_1.Direction.Left:
                        newValue =
                            ((trackLength - (clientX - trackRect.left)) / trackLength) *
                                (max - min) +
                                min;
                        break;
                    case types_1.Direction.Down:
                        newValue =
                            ((clientY - trackRect.top) / trackLength) * (max - min) + min;
                        break;
                    case types_1.Direction.Up:
                        newValue =
                            ((trackLength - (clientY - trackRect.top)) / trackLength) *
                                (max - min) +
                                min;
                        break;
                    default:
                        utils_1.assertUnreachable(direction);
                }
                // invert for RTL
                if (rtl) {
                    newValue = max + min - newValue;
                }
                if (Math.abs(values[draggedThumbIndex] - newValue) >= step / 2) {
                    onChange(utils_1.replaceAt(values, draggedThumbIndex, _this.normalizeValue(newValue, draggedThumbIndex)));
                }
            }
        };
        _this.normalizeValue = function (value, index) {
            var _a = _this.props, min = _a.min, max = _a.max, step = _a.step, allowOverlap = _a.allowOverlap, values = _a.values;
            return utils_1.normalizeValue(value, index, min, max, step, allowOverlap, values);
        };
        _this.onEnd = function (e) {
            e.preventDefault();
            document.removeEventListener('mousemove', _this.schdOnMouseMove);
            document.removeEventListener('touchmove', _this.schdOnTouchMove);
            document.removeEventListener('mouseup', _this.schdOnEnd);
            document.removeEventListener('touchend', _this.schdOnEnd);
            document.removeEventListener('touchcancel', _this.schdOnEnd);
            if (_this.state.draggedThumbIndex === -1 &&
                _this.state.draggedTrackPos[0] === -1 &&
                _this.state.draggedTrackPos[1] === -1)
                return null;
            _this.setState({ draggedThumbIndex: -1, draggedTrackPos: [-1, -1] }, function () {
                _this.fireOnFinalChange();
            });
        };
        _this.fireOnFinalChange = function () {
            _this.setState({ isChanged: false });
            var _a = _this.props, onFinalChange = _a.onFinalChange, values = _a.values;
            if (onFinalChange) {
                onFinalChange(values);
            }
        };
        _this.calculateMarkOffsets = function () {
            if (!_this.props.renderMark ||
                !_this.trackRef ||
                _this.trackRef.current === null)
                return;
            var elStyles = window.getComputedStyle(_this.trackRef.current);
            var trackWidth = parseInt(elStyles.width, 10);
            var trackHeight = parseInt(elStyles.height, 10);
            var paddingLeft = parseInt(elStyles.paddingLeft, 10);
            var paddingTop = parseInt(elStyles.paddingTop, 10);
            var res = [];
            for (var i = 0; i < _this.numOfMarks + 1; i++) {
                var markHeight = 9999;
                var markWidth = 9999;
                if (_this.markRefs[i].current) {
                    var markRect = _this.markRefs[i].current.getBoundingClientRect();
                    markHeight = markRect.height;
                    markWidth = markRect.width;
                }
                if (_this.props.direction === types_1.Direction.Left ||
                    _this.props.direction === types_1.Direction.Right) {
                    res.push([
                        Math.round((trackWidth / _this.numOfMarks) * i + paddingLeft - markWidth / 2),
                        -Math.round((markHeight - trackHeight) / 2)
                    ]);
                }
                else {
                    res.push([
                        Math.round((trackHeight / _this.numOfMarks) * i + paddingTop - markHeight / 2),
                        -Math.round((markWidth - trackWidth) / 2)
                    ]);
                }
            }
            _this.setState({ markOffsets: res });
        };
        _this.numOfMarks = (props.max - props.min) / _this.props.step;
        _this.schdOnMouseMove = utils_1.schd(_this.onMouseMove);
        _this.schdOnTouchMove = utils_1.schd(_this.onTouchMove);
        _this.schdOnEnd = utils_1.schd(_this.onEnd);
        _this.thumbRefs = props.values.map(function () { return React.createRef(); });
        for (var i = 0; i < _this.numOfMarks + 1; i++) {
            _this.markRefs[i] = React.createRef();
        }
        if (props.step === 0) {
            throw new Error('"step" property should be a positive number');
        }
        return _this;
    }
    Range.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, values = _a.values, min = _a.min, step = _a.step;
        this.resizeObserver = window.ResizeObserver
            ? new window.ResizeObserver(this.onResize)
            : {
                observe: function () { return window.addEventListener('resize', _this.onResize); },
                unobserve: function () { return window.removeEventListener('resize', _this.onResize); }
            };
        document.addEventListener('touchstart', this.onMouseOrTouchStart, {
            passive: false
        });
        document.addEventListener('mousedown', this.onMouseOrTouchStart, {
            passive: false
        });
        !this.props.allowOverlap && utils_1.checkInitialOverlap(this.props.values);
        this.props.values.forEach(function (value) {
            return utils_1.checkBoundaries(value, _this.props.min, _this.props.max);
        });
        this.resizeObserver.observe(this.trackRef.current);
        utils_1.translateThumbs(this.getThumbs(), this.getOffsets(), this.props.rtl);
        this.calculateMarkOffsets();
        values.forEach(function (value) {
            if (!utils_1.isStepDivisible(min, value, step)) {
                console.warn('The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.');
            }
        });
    };
    Range.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.props, max = _a.max, min = _a.min, step = _a.step, values = _a.values, rtl = _a.rtl;
        if (prevProps.max !== max ||
            prevProps.min !== min ||
            prevProps.step !== step) {
            this.markRefs = [];
            this.numOfMarks = (max - min) / step;
            for (var i = 0; i < this.numOfMarks + 1; i++) {
                this.markRefs[i] = React.createRef();
            }
        }
        utils_1.translateThumbs(this.getThumbs(), this.getOffsets(), rtl);
        // ensure offsets are calculated when the refs for the marks have been created
        // and those refs have been mounted to the dom
        // on the state update in calculateOffsets with new markOffsets are calculated
        if (prevProps.max !== max ||
            prevProps.min !== min ||
            prevProps.step !== step ||
            prevState.markOffsets.length !== this.state.markOffsets.length) {
            this.calculateMarkOffsets();
            values.forEach(function (value) {
                if (!utils_1.isStepDivisible(min, value, step)) {
                    console.warn('The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.');
                }
            });
        }
    };
    Range.prototype.componentWillUnmount = function () {
        var options = {
            passive: false
        };
        document.removeEventListener('mousedown', this.onMouseOrTouchStart, options);
        // These need to be removed!!
        document.removeEventListener('mousemove', this.schdOnMouseMove);
        document.removeEventListener('touchmove', this.schdOnTouchMove);
        document.removeEventListener('touchstart', this.onMouseOrTouchStart);
        document.removeEventListener('mouseup', this.schdOnEnd);
        document.removeEventListener('touchend', this.schdOnEnd);
        this.resizeObserver.unobserve(this.trackRef.current);
    };
    Range.prototype.render = function () {
        var _this = this;
        var _a = this.props, renderTrack = _a.renderTrack, renderThumb = _a.renderThumb, _b = _a.renderMark, renderMark = _b === void 0 ? function () { return null; } : _b, values = _a.values, min = _a.min, max = _a.max, allowOverlap = _a.allowOverlap, disabled = _a.disabled;
        var _c = this.state, draggedThumbIndex = _c.draggedThumbIndex, thumbZIndexes = _c.thumbZIndexes, markOffsets = _c.markOffsets;
        return renderTrack({
            props: {
                style: {
                    // creates stacking context that prevents z-index applied to thumbs
                    // interfere with other elements
                    transform: 'scale(1)',
                    cursor: draggedThumbIndex > -1
                        ? 'grabbing'
                        : this.props.draggableTrack
                            ? utils_1.isVertical(this.props.direction)
                                ? 'ns-resize'
                                : 'ew-resize'
                            : values.length === 1 && !disabled
                                ? 'pointer'
                                : 'inherit'
                },
                onMouseDown: disabled ? utils_1.voidFn : this.onMouseDownTrack,
                onTouchStart: disabled ? utils_1.voidFn : this.onTouchStartTrack,
                ref: this.trackRef
            },
            isDragged: this.state.draggedThumbIndex > -1,
            disabled: disabled,
            children: __spreadArrays(markOffsets.map(function (offset, index, arr) {
                return renderMark({
                    props: {
                        style: _this.props.direction === types_1.Direction.Left ||
                            _this.props.direction === types_1.Direction.Right
                            ? {
                                position: 'absolute',
                                left: offset[0] + "px",
                                marginTop: offset[1] + "px"
                            }
                            : {
                                position: 'absolute',
                                top: offset[0] + "px",
                                marginLeft: offset[1] + "px"
                            },
                        key: "mark" + index,
                        ref: _this.markRefs[index]
                    },
                    index: index
                });
            }), values.map(function (value, index) {
                var isDragged = _this.state.draggedThumbIndex === index;
                return renderThumb({
                    index: index,
                    value: value,
                    isDragged: isDragged,
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
                        },
                        key: index,
                        tabIndex: disabled ? undefined : 0,
                        'aria-valuemax': allowOverlap ? max : values[index + 1] || max,
                        'aria-valuemin': allowOverlap ? min : values[index - 1] || min,
                        'aria-valuenow': value,
                        draggable: false,
                        ref: _this.thumbRefs[index],
                        role: 'slider',
                        onKeyDown: disabled ? utils_1.voidFn : _this.onKeyDown,
                        onKeyUp: disabled ? utils_1.voidFn : _this.onKeyUp
                    }
                });
            }))
        });
    };
    Range.defaultProps = {
        step: 1,
        direction: types_1.Direction.Right,
        rtl: false,
        disabled: false,
        allowOverlap: false,
        draggableTrack: false,
        min: 0,
        max: 100
    };
    return Range;
}(React.Component));
exports.default = Range;
