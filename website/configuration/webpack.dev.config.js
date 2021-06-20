/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

const outputPath = path.resolve(__dirname, '../dist');

// fetch all html files in source folder
const templateFiles = fs
    .readdirSync(environment.paths.source)
    .filter((file) => path.extname(file).toLowerCase() === '.html');

// process html files in order to inject compiled files
const htmlPluginEntries = templateFiles.map(
    (template) =>
        new HTMLWebpackPlugin({
            inject: 'body',
            hash: true,
            scriptLoading: 'blocking',
            filename: template,
            template: path.resolve(environment.paths.source, template),
        })
);

module.exports = merge(webpackConfiguration, {
    // overwrite output path from main config file to local
    output: {
        path: outputPath,
    },

    mode: 'development',

    /* Manage source maps generation process */
    devtool: 'eval-source-map',

    /* Development Server Configuration */
    devServer: {
        watchContentBase: true,
        publicPath: '/',
        historyApiFallback: true,
        compress: true,
        overlay: true,
        hot: false,
        watchOptions: {
            poll: 300,
        },
        ...environment.server,
    },

    /* Additional plugins configuration */
    plugins: [
        // copy images to output directory
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(environment.paths.source, 'images'),
                    to: path.resolve(outputPath, 'images'),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        }),
    ].concat(htmlPluginEntries),
});
