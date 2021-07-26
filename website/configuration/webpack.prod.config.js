/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpackConfiguration = require('../webpack.config');

module.exports = merge(webpackConfiguration, {
    /* Manage source maps generation process. 
    Refer to https://webpack.js.org/configuration/devtool/#production */
    devtool: false,

    output: {
        path: path.resolve(__dirname, '../../template/static'),
        clean: true,
    },

    /* Optimization configuration */
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin(),
        ],
    },

    /* Performance treshold configuration values */
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },

    /* Additional plugins configuration */
    plugins: [],
});
