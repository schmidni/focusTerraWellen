/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const path = require('path');
const fs = require('fs');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const webpackConfiguration = require('../webpack.config');

// fetch all html files in source folder
const templateFiles = fs
    .readdirSync(path.resolve(__dirname, '../src/'))
    .filter((file) => path.extname(file).toLowerCase() === '.html');

// process html files in order to inject compiled files
const htmlPluginEntries = templateFiles.map(
    (template) =>
        new HTMLWebpackPlugin({
            inject: 'body',
            hash: true,
            scriptLoading: 'blocking',
            filename: template,
            template: path.resolve(__dirname, '../src/', template),
        })
);

module.exports = merge(webpackConfiguration, {
    /* Manage source maps generation process */
    devtool: 'eval-source-map',

    /* Development Server Configuration */
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        watchContentBase: true,
        publicPath: '/',
        historyApiFallback: true,
        compress: true,
        overlay: true,
        hot: true,
        watchOptions: {
            poll: 300,
        },
        host: '127.0.0.1',
        port: 5000,
    },

    optimization: {
        runtimeChunk: 'single',
    },

    /* Additional plugins configuration */
    plugins: [].concat(
        htmlPluginEntries,
        // copy images to output directory
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve('src', 'images'),
                    to: path.resolve('dist', 'images'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        })
    ),
});
