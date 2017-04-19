'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GiphyPicker = require('./GiphyPicker');

var _GiphyPicker2 = _interopRequireDefault(_GiphyPicker);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.state = {
            url: null
        };
        return _this;
    }

    App.prototype._handlerClick = function _handlerClick(url) {
        this.setState({ url: url });
    };

    App.prototype.render = function render() {
        var _this2 = this;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'div',
                { style: { height: "200px" } },
                _react2.default.createElement('img', { src: this.state.url, height: 200 })
            ),
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { ref: 'btn' },
                    'GIF'
                )
            ),
            _react2.default.createElement(_GiphyPicker2.default, { target: function target() {
                    return (0, _reactDom.findDOMNode)(_this2.refs.btn);
                }, onClick: function onClick(url) {
                    return _this2._handlerClick(url);
                } })
        );
    };

    return App;
}(_react.Component);

App.propTypes = {};
App.defaultProps = {};

exports.default = App;