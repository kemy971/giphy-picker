'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TooltipStyle = {
    position: 'absolute',
    padding: '5px 5px'
};

var TooltipInnerStyle = {
    padding: '5px 5px',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#000'
};

var TooltipArrowStyle = {
    position: 'absolute',
    width: 0, height: 0,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderStyle: 'solid'
};

var PlacementStyles = {
    left: {
        tooltip: { marginLeft: -3, padding: '0 5px' },
        arrow: {
            right: 0, marginTop: -5, borderWidth: '5px 0 5px 5px', borderLeftColor: '#000'
        }
    },
    right: {
        tooltip: { marginRight: 3, padding: '0 5px' },
        arrow: { left: 0, marginTop: -5, borderWidth: '5px 5px 5px 0', borderRightColor: '#000' }
    },
    top: {
        tooltip: { marginTop: -3, padding: '5px 0' },
        arrow: { bottom: 0, marginLeft: -5, borderWidth: '5px 5px 0', borderTopColor: '#000' }
    },
    bottom: {
        tooltip: { marginBottom: 3, padding: '5px 0' },
        arrow: { top: 0, marginLeft: -5, borderWidth: '0 5px 5px', borderBottomColor: '#000' }
    }
};

var Popover = function Popover(props) {
    var placementStyle = PlacementStyles[props.placement];

    var style = props.style,
        _props$arrowOffsetLef = props.arrowOffsetLeft,
        left = _props$arrowOffsetLef === undefined ? placementStyle.arrow.left : _props$arrowOffsetLef,
        _props$arrowOffsetTop = props.arrowOffsetTop,
        top = _props$arrowOffsetTop === undefined ? placementStyle.arrow.top : _props$arrowOffsetTop,
        children = props.children;


    return _react2.default.createElement(
        'div',
        { style: _extends({}, TooltipStyle, placementStyle.tooltip, style) },
        _react2.default.createElement('div', { style: _extends({}, TooltipArrowStyle, placementStyle.arrow, { left: left, top: top }) }),
        _react2.default.createElement(
            'div',
            { style: TooltipInnerStyle },
            children
        )
    );
};

exports.default = Popover;