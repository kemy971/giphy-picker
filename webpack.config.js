'use strict';

const webpack = require('webpack');

module.exports = {
    context: __dirname + '/public',
    entry: {
        app: "./index.js"
    },
    output: {
        path: __dirname + "/public",
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: "babel-loader",
                    options: { presets: ["es2015", "react"] }
                }],
            },
        ],
    },
    devServer: {
        contentBase: __dirname + "/public",
    }
};
