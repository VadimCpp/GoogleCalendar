const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './'
    },
    optimization: {
        minimizer: [
            // https://stackoverflow.com/questions/49053215/webpack-4-how-to-configure-minimize
            new UglifyJSPlugin({
                include: /\.min\.js$/,
                sourceMap: true,
                parallel: true,
                sourceMap: false
            })
        ]
    }

};