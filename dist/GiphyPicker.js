'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Api = require('./Api');

var _masonryLayout = require('masonry-layout');

var _masonryLayout2 = _interopRequireDefault(_masonryLayout);

var _imagesloaded = require('imagesloaded');

var _imagesloaded2 = _interopRequireDefault(_imagesloaded);

var _reactOverlays = require('react-overlays');

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gridStyle = {
    padding: "10px 5px",
    maxHeight: "400px",
    overflow: "auto",
    width: "400px",
    ":after": {
        content: '',
        display: 'block',
        clear: 'both'
    }
};

var gridItemStyle = {
    width: '33.333%',
    float: 'left',
    padding: '5px 10px',
    margin: '0 -5px',
    cursor: 'pointer',
    boxSizing: 'border-box'
};

var imgStyle = {
    display: 'block',
    maxWidth: '100%',
    borderRadius: '5px'
};

var searchInputStyle = {
    display: 'block',
    width: '100%',
    lineHeight: '30px',
    fontSize: '18px',
    backgroundColor: '#000',
    border: '0',
    color: '#fff',
    ':focus': {
        outline: 'none'
    },
    ':active': {
        outline: 'none'
    }
};

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            data: [],
            show: false,
            searchResult: [],
            totalSearchResult: 0
        };
        return _this;
    }

    App.prototype.componentWillMount = function componentWillMount() {
        this.fetchTrendingGIF();
    };

    App.prototype.fetchTrendingGIF = function fetchTrendingGIF() {
        var _this2 = this;

        (0, _Api.fetchTrending)(function (_ref) {
            var data = _ref.data;

            _this2.setState({ data: data });
        });
    };

    App.prototype.componentDidMount = function componentDidMount() {
        var _this3 = this;

        var target = this.props.target();
        target.addEventListener('click', function (e) {
            e.stopPropagation();
            _this3.togglePicker();
        });
    };

    App.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.state.show) {
            var grid = this.refs.grid;

            (0, _imagesloaded2.default)(grid, function () {
                new _masonryLayout2.default(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true
                });
            });
        }
    };

    App.prototype._onClick = function _onClick(item) {
        this.props.onClick(item.images.downsized.url);
        this.togglePicker();
    };

    App.prototype.togglePicker = function togglePicker() {
        this.setState({ show: !this.state.show });
    };

    App.prototype.searchGIF = function searchGIF() {
        var _this4 = this;

        (0, _Api.search)(this._searchInput.value, function (resp) {
            _this4.setState({ searchResult: resp.data, totalSearchResult: resp.pagination.total_count });
        });
    };

    App.prototype.getTrendingGrid = function getTrendingGrid() {
        var _this5 = this;

        return this.state.data.map(function (item, index) {
            return _react2.default.createElement(
                'div',
                { key: index, className: 'grid-item clickable', style: gridItemStyle, onClick: function onClick() {
                        return _this5._onClick(item);
                    } },
                _react2.default.createElement('img', { src: item.images.fixed_width.url, style: imgStyle })
            );
        });
    };

    App.prototype.getSearchGrid = function getSearchGrid() {
        var _this6 = this;

        return this.state.searchResult.map(function (item, index) {
            return _react2.default.createElement(
                'div',
                { key: index, className: 'grid-item clickable', style: gridItemStyle, onClick: function onClick() {
                        return _this6._onClick(item);
                    } },
                _react2.default.createElement('img', { src: item.images.fixed_width.url, style: imgStyle })
            );
        });
    };

    App.prototype.render = function render() {
        var _this7 = this;

        return _react2.default.createElement(
            _reactOverlays.Overlay,
            {
                show: this.state.show,
                onHide: function onHide() {
                    return _this7.setState({ show: false });
                },
                placement: "bottom",
                target: this.props.target,
                container: document.body,
                onEnter: function onEnter() {
                    return _this7.fetchTrendingGIF();
                },
                rootClose: true
            },
            _react2.default.createElement(
                _Popover2.default,
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { style: searchInputStyle, type: 'text', placeholder: 'Type your search...',
                        ref: function ref(searchInput) {
                            return _this7._searchInput = searchInput;
                        },
                        onChange: _underscore2.default.debounce(function () {
                            return _this7.searchGIF();
                        }, 1000) })
                ),
                this._searchInput && this._searchInput.value.length > 0 ? _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'b',
                        null,
                        'Results : ',
                        this.state.totalSearchResult
                    )
                ) : null,
                _react2.default.createElement(
                    'div',
                    { ref: 'grid', style: gridStyle },
                    _react2.default.createElement('div', { className: 'grid-sizer', style: { width: '33.333%' } }),
                    this._searchInput && this._searchInput.value.length > 0 ? this.getSearchGrid() : this.getTrendingGrid()
                )
            )
        );
    };

    return App;
}(_react.Component);

App.propTypes = {
    target: _react.PropTypes.func.isRequired,
    onClick: _react.PropTypes.func.isRequired
};
App.defaultProps = {};

exports.default = (0, _radium2.default)(App);