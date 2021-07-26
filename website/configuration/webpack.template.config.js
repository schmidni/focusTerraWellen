/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');

const webpackProdConfiguration = require('./webpack.prod.config');

module.exports = merge(webpackProdConfiguration, {
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

    output: {
        path: path.resolve(__dirname, '../../template/static'),
        clean: false,
    },
});
