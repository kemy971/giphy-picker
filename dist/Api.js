"use strict";

exports.__esModule = true;
exports.search = exports.fetchTrending = undefined;

var _reqwest = require("reqwest");

var _reqwest2 = _interopRequireDefault(_reqwest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchTrending = exports.fetchTrending = function fetchTrending(callback) {
    (0, _reqwest2.default)({
        url: "http://api.giphy.com/v1/gifs/trending",
        method: "get",
        data: { "api_key": "dc6zaTOxFJmzC" },
        success: function success(resp) {
            callback(resp);
        }
    });
};

var search = exports.search = function search(searchText, callback) {
    (0, _reqwest2.default)({
        url: "http://api.giphy.com/v1/gifs/search",
        method: "get",
        data: {
            "q": searchText,
            "api_key": "dc6zaTOxFJmzC"
        },
        success: function success(resp) {
            callback(resp);
        }
    });
};