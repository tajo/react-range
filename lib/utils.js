"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThumbOverlap = exports.assertUnreachable = exports.voidFn = exports.getTrackBackground = exports.replaceAt = exports.schd = exports.translate = exports.getClosestThumbIndex = exports.translateThumbs = exports.getPaddingAndBorder = exports.getMargin = exports.checkInitialOverlap = exports.checkValuesAgainstBoundaries = exports.checkBoundaries = exports.isVertical = exports.relativeValue = exports.normalizeValue = exports.isStepDivisible = exports.isTouchEvent = exports.getStepDecimals = void 0;
var react_1 = require("react");
var types_1 = require("./types");
var getStepDecimals = function (step) {
    var decimals = step.toString().split('.')[1];
    return decimals ? decimals.length : 0;
};
exports.getStepDecimals = getStepDecimals;
function isTouchEvent(event) {
    return ((event.touches && event.touches.length) ||
        (event.changedTouches && event.changedTouches.length));
}
exports.isTouchEvent = isTouchEvent;
function isStepDivisible(min, max, step) {
    var res = (max - min) / step;
    return parseInt(res.toString(), 10) === res;
}
exports.isStepDivisible = isStepDivisible;
function normalizeValue(value, index, min, max, step, allowOverlap, values) {
    var BIG_NUM = 10e10;
    value = Math.round(value * BIG_NUM) / BIG_NUM;
    if (!allowOverlap) {
        var prev = values[index - 1];
        var next = values[index + 1];
        if (prev && prev > value)
            return prev;
        if (next && next < value)
            return next;
    }
    if (value > max)
        return max;
    if (value < min)
        return min;
    // `remainder` is a difference between the given value and a full step value
    // that is closest lower to the given value and is in the range between the min value
    // and the given value
    var remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) %
        Math.floor(step * BIG_NUM);
    var closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
    var rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
    // Values with a remainder `< step/2` are rounded to the closest lower value
    // while values with a remainder `= > step/2` are rounded to the closest bigger value
    var res = Math.abs(remainder / BIG_NUM) < step / 2
        ? rounded
        : rounded + step;
    var decimalPlaces = exports.getStepDecimals(step);
    return parseFloat(res.toFixed(decimalPlaces));
}
exports.normalizeValue = normalizeValue;
function relativeValue(value, min, max) {
    return (value - min) / (max - min);
}
exports.relativeValue = relativeValue;
function isVertical(direction) {
    return direction === types_1.Direction.Up || direction === types_1.Direction.Down;
}
exports.isVertical = isVertical;
function checkBoundaries(value, min, max) {
    if (min >= max) {
        throw new RangeError("min (" + min + ") is equal/bigger than max (" + max + ")");
    }
    if (value < min) {
        throw new RangeError("value (" + value + ") is smaller than min (" + min + ")");
    }
    if (value > max) {
        throw new RangeError("value (" + value + ") is bigger than max (" + max + ")");
    }
}
exports.checkBoundaries = checkBoundaries;
function checkValuesAgainstBoundaries(value, min, max) {
    if (value < min) {
        // set selectedValue to min
        return min;
    }
    if (value > max) {
        // set selectedValue to max
        return max;
    }
    else {
        return value;
    }
}
exports.checkValuesAgainstBoundaries = checkValuesAgainstBoundaries;
function checkInitialOverlap(values) {
    if (values.length < 2)
        return;
    if (!values.slice(1).every(function (item, i) { return values[i] <= item; })) {
        throw new RangeError("values={[" + values + "]} needs to be sorted when allowOverlap={false}");
    }
}
exports.checkInitialOverlap = checkInitialOverlap;
function getMargin(element) {
    var style = window.getComputedStyle(element);
    return {
        top: parseInt(style['margin-top'], 10),
        bottom: parseInt(style['margin-bottom'], 10),
        left: parseInt(style['margin-left'], 10),
        right: parseInt(style['margin-right'], 10)
    };
}
exports.getMargin = getMargin;
function getPaddingAndBorder(element) {
    var style = window.getComputedStyle(element);
    return {
        top: parseInt(style['padding-top'], 10) + parseInt(style['border-top-width'], 10),
        bottom: parseInt(style['padding-bottom'], 10) + parseInt(style['border-bottom-width'], 10),
        left: parseInt(style['padding-left'], 10) + parseInt(style['border-left-width'], 10),
        right: parseInt(style['padding-right'], 10) + parseInt(style['border-right-width'], 10),
    };
}
exports.getPaddingAndBorder = getPaddingAndBorder;
function translateThumbs(elements, offsets, rtl) {
    var inverter = rtl ? -1 : 1;
    elements.forEach(function (element, index) {
        return translate(element, inverter * offsets[index].x, offsets[index].y);
    });
}
exports.translateThumbs = translateThumbs;
/**
 * Util function for calculating the index of the thumb that is closes to a given position
 * @param thumbs - array of Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
function getClosestThumbIndex(thumbs, clientX, clientY, direction) {
    var thumbIndex = 0;
    var minThumbDistance = getThumbDistance(thumbs[0], clientX, clientY, direction);
    for (var i = 1; i < thumbs.length; i++) {
        var thumbDistance = getThumbDistance(thumbs[i], clientX, clientY, direction);
        if (thumbDistance < minThumbDistance) {
            minThumbDistance = thumbDistance;
            thumbIndex = i;
        }
    }
    return thumbIndex;
}
exports.getClosestThumbIndex = getClosestThumbIndex;
function translate(element, x, y) {
    element.style.transform = "translate(" + x + "px, " + y + "px)";
}
exports.translate = translate;
// adapted from https://github.com/alexreardon/raf-schd
var schd = function (fn) {
    var lastArgs = [];
    var frameId = null;
    var wrapperFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        lastArgs = args;
        if (frameId) {
            return;
        }
        frameId = requestAnimationFrame(function () {
            frameId = null;
            fn.apply(void 0, lastArgs);
        });
    };
    return wrapperFn;
};
exports.schd = schd;
function replaceAt(values, index, value) {
    var ret = values.slice(0);
    ret[index] = value;
    return ret;
}
exports.replaceAt = replaceAt;
function getTrackBackground(_a) {
    var values = _a.values, colors = _a.colors, min = _a.min, max = _a.max, _b = _a.direction, direction = _b === void 0 ? types_1.Direction.Right : _b, _c = _a.rtl, rtl = _c === void 0 ? false : _c;
    if (rtl && direction === types_1.Direction.Right) {
        direction = types_1.Direction.Left;
    }
    else if (rtl && types_1.Direction.Left) {
        direction = types_1.Direction.Right;
    }
    // sort values ascending
    var progress = values.slice(0).sort(function (a, b) { return a - b; }).map(function (value) { return ((value - min) / (max - min)) * 100; });
    var middle = progress.reduce(function (acc, point, index) {
        return acc + ", " + colors[index] + " " + point + "%, " + colors[index + 1] + " " + point + "%";
    }, '');
    return "linear-gradient(" + direction + ", " + colors[0] + " 0%" + middle + ", " + colors[colors.length - 1] + " 100%)";
}
exports.getTrackBackground = getTrackBackground;
function voidFn() { }
exports.voidFn = voidFn;
function assertUnreachable(x) {
    throw new Error("Didn't expect to get here");
}
exports.assertUnreachable = assertUnreachable;
/**
 * Util function for grabbing the true largest width of a thumb
 * including the label
 * @param thumbEl - Thumb element to grab the largest width from
 * @param value - Thumb value, not label value
 * @param separator - Label separator value
 */
var getThumbWidth = function (thumbEl, value, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) { valueToLabel = function (value) { return value; }; }
    var width = Math.ceil(__spreadArrays([thumbEl], Array.from(thumbEl.children)).reduce(function (width, el) {
        var elWidth = Math.ceil(el.getBoundingClientRect().width);
        /**
         * If a label contains a merged label value, it won't return the true
         * label width for that Thumb. Clone the label and change the value
         * to that individual Thumb value in order to grab the true width.
         */
        if (el.innerText &&
            el.innerText.includes(separator) &&
            el.childElementCount === 0) {
            var elClone = el.cloneNode(true);
            elClone.innerHTML = valueToLabel(value.toFixed(decimalPlaces));
            elClone.style.visibility = 'hidden';
            document.body.appendChild(elClone);
            elWidth = Math.ceil(elClone.getBoundingClientRect().width);
            document.body.removeChild(elClone);
        }
        return elWidth > width ? elWidth : width;
    }, thumbEl.getBoundingClientRect().width));
    return width;
};
/**
 * Bulk of logic for thumb overlaps
 * Consider a scenario with 5 thumbs;
 * Thumb 1 overlaps with thumb 0 and thumb 2
 * Thumb 2 overlaps with thumb 3
 * We need an array that contains [0, 1, 2, 3]
 * The function needs to return the directly overlapping thumbs
 * and all thumbs overlapping linked to those and so on
 * @param index - Thumb index calculating overlaps for
 * @param offsets - Current Array of Thumb offsets for Range
 * @param thumbs - Array of Thumb elements
 * @param values - Array of Thumb values
 * @param separator - String separator for merged label values
 * @returns overlaps - Array of all overlapping thumbs from the index
 */
var getOverlaps = function (index, offsets, thumbs, values, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) { valueToLabel = function (value) { return value; }; }
    var overlaps = [];
    /**
     * Recursive function for building the overlaps Array
     * If an overlap is found, find the overlaps for that overlap
     * @param thumbIndex current Thumb index to find overlaps from
     */
    var buildOverlaps = function (thumbIndex) {
        var thumbXWidth = getThumbWidth(thumbs[thumbIndex], values[thumbIndex], separator, decimalPlaces, valueToLabel);
        var thumbX = offsets[thumbIndex].x;
        /**
         * Iterate through the Thumb offsets, if there is a match
         * add the thumbIndex and siblingIndex to the overlaps Array
         *
         * Then build overlaps from the overlapping siblingIndex
         */
        offsets.forEach(function (_a, siblingIndex) {
            var siblingX = _a.x;
            var siblingWidth = getThumbWidth(thumbs[siblingIndex], values[siblingIndex], separator, decimalPlaces, valueToLabel);
            if (thumbIndex !== siblingIndex &&
                ((thumbX >= siblingX && thumbX <= siblingX + siblingWidth) ||
                    (thumbX + thumbXWidth >= siblingX &&
                        thumbX + thumbXWidth <= siblingX + siblingWidth))) {
                if (!overlaps.includes(siblingIndex)) {
                    overlaps.push(thumbIndex);
                    overlaps.push(siblingIndex);
                    overlaps = __spreadArrays(overlaps, [thumbIndex, siblingIndex]);
                    buildOverlaps(siblingIndex);
                }
            }
        });
    };
    buildOverlaps(index);
    // Sort and remove duplicates from the built overlaps
    return Array.from(new Set(overlaps.sort()));
};
/**
 * A custom React Hook for calculating whether a thumb overlaps
 * another and whether labels could/should merge.
 * @param rangeRef - React ref value of Range component
 * @param values - current Range values Array
 * @param index - thumb index
 * @param step - step value, used to calculate the number of decimal places
 * @param separator - string to separate thumb values
 * @returns label value + styling for thumb label
 */
var useThumbOverlap = function (rangeRef, values, index, step, separator, valueToLabel) {
    if (step === void 0) { step = 0.1; }
    if (separator === void 0) { separator = ' - '; }
    if (valueToLabel === void 0) { valueToLabel = function (value) { return value; }; }
    var decimalPlaces = exports.getStepDecimals(step);
    // Create initial label style and value. Label value defaults to thumb value
    var _a = react_1.useState({}), labelStyle = _a[0], setLabelStyle = _a[1];
    var _b = react_1.useState(valueToLabel(values[index].toFixed(decimalPlaces))), labelValue = _b[0], setLabelValue = _b[1];
    // When the rangeRef or values change, update the Thumb label values and styling
    react_1.useEffect(function () {
        if (rangeRef) {
            var thumbs = rangeRef.getThumbs();
            if (thumbs.length < 1)
                return;
            var newStyle = {};
            var offsets_1 = rangeRef.getOffsets();
            /**
             * Get any overlaps for the given Thumb index. This must return all linked
             * Thumbs. So if there are 4 Thumbs and Thumbs 2, 3 and 4 overlap. If we are
             * getting the overlaps for Thumb 1 and it overlaps only Thumb 2, we must get
             * 2, 3 and 4 also.
             */
            var overlaps = getOverlaps(index, offsets_1, thumbs, values, separator, decimalPlaces, valueToLabel);
            // Set a default label value of the Thumb value
            var labelValue_1 = valueToLabel(values[index].toFixed(decimalPlaces));
            /**
             * If there are overlaps for the Thumb, we need to calculate the correct
             * Label value along with the relevant styling. We only want to show a Label
             * for the left most Thumb in an overlapping set.
             * All other Thumbs will be set to display: none.
             */
            if (overlaps.length) {
                /**
                 * Get an Array of the offsets for the overlapping Thumbs
                 * This is so we can determine if the Thumb we are looking at
                 * is the left most thumb in an overlapping set
                 */
                var offsetsX = overlaps.reduce(function (a, c, i, s) {
                    return a.length ? __spreadArrays(a, [offsets_1[s[i]].x]) : [offsets_1[s[i]].x];
                }, []);
                /**
                 * If our Thumb is the left most Thumb, we can build a Label value
                 * and set the style for that Label
                 */
                if (Math.min.apply(Math, offsetsX) === offsets_1[index].x) {
                    /**
                     * First calculate the Label value. To do this,
                     * grab all the values for the Thumbs in our overlaps.
                     * Then convert that to a Set and sort it whilst removing duplicates.
                     */
                    var labelValues_1 = [];
                    overlaps.forEach(function (thumb) {
                        labelValues_1.push(values[thumb].toFixed(decimalPlaces));
                    });
                    /**
                     *  Update the labelValue with the resulting Array
                     *  joined by our defined separator
                     */
                    labelValue_1 = Array.from(new Set(labelValues_1.sort(function (a, b) { return parseFloat(a) - parseFloat(b); })))
                        .map(valueToLabel)
                        .join(separator);
                    /**
                     * Lastly, build the label styling. The label styling will
                     * position the label and apply a transform so that it's centered.
                     * We want the center point between the left edge of the left most Thumb
                     * and the right edge of the right most Thumb.
                     */
                    var first = Math.min.apply(Math, offsetsX);
                    var last = Math.max.apply(Math, offsetsX);
                    var lastWidth = thumbs[overlaps[offsetsX.indexOf(last)]].getBoundingClientRect().width;
                    newStyle.left = Math.abs(first - (last + lastWidth)) / 2 + "px";
                    newStyle.transform = 'translate(-50%, 0)';
                }
                else {
                    // If the Thumb isn't the left most Thumb, hide the Label!
                    newStyle.visibility = 'hidden';
                }
            }
            // Update the label value and style
            setLabelValue(labelValue_1);
            setLabelStyle(newStyle);
        }
    }, [rangeRef, values]);
    return [labelValue, labelStyle];
};
exports.useThumbOverlap = useThumbOverlap;
/**
 * Util function for calculating the distance of the center of a thumb
 * form a given mouse/touch target's position
 * @param thumbEl - Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
function getThumbDistance(thumbEl, clientX, clientY, direction) {
    var _a = thumbEl.getBoundingClientRect(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return isVertical(direction) ? Math.abs(clientY - (y + height / 2)) : Math.abs(clientX - (x + width / 2));
}
