'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: "./ts/main.ts",
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {

        loaders: [
            {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!stylus-loader' })
            },

            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },

            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
            ]
    },

    watch: true,

    devtool: "source-map",

    plugins: [
 //       new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.ProvidePlugin({
            $: "jquery"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
    ]
};

module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings:     false,
            drop_console: true,
            unsafe:       true
        }
    })
);