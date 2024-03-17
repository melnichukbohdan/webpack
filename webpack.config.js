const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    return {
        mode: env.mode ?? 'development', // mode of build development(don't not optimized)/production (optimized)
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'), // folder to saving compiled file.
            filename: '[name].[contenthash].js', // the compiled file mame.
            clean: true // flag to remove old compiled file before compiling.
        },
        plugins: [
            new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin(),
        ]
    }
}