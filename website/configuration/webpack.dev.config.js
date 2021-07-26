/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const path = require('path');
const fs = require('fs');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const webpackConfiguration = require('../webpack.config');

const outputPath = path.resolve(__dirname, '../dist');

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
    // overwrite output path from main config file to local
    output: {
        path: outputPath,
        clean: true,
    },

    /* Manage source maps generation process */
    devtool: 'eval-source-map',

    /* Development Server Configuration */
    devServer: {
        watchContentBase: true,
        publicPath: '/',
        historyApiFallback: true,
        compress: true,
        overlay: true,
        hot: true,
        watchOptions: {
            poll: 300,
        },
        host: '0.0.0.0',
        port: 8000,
    },

    /* File watcher options */
    watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
        ignored: /node_modules/,
    },

    /* Additional plugins configuration */
    plugins: [].concat(
        htmlPluginEntries,
        // copy images to output directory
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/', 'images'),
                    to: path.resolve(outputPath, 'images'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        })
    ),
});
