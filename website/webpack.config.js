const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const environment = require('./configuration/environment');

module.exports = {
    // Entry point, main.scss is referenced in entry point js
    entry: {
        index: path.resolve(environment.paths.source, 'js', 'index.js'),
    },
    // default output folder. Possibly overwritten in subconfig
    output: {
        filename: 'js/[name].js',
        path: environment.paths.output,
    },

    module: {
        rules: [
            // loader for JavaScript
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // loader for SASS
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader, // extracts css into separate file
                    'css-loader', // css loader
                    {
                        loader: 'postcss-loader', // postprocessing css
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'autoprefixer',
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } }, // sass files loader
                ],
            },
            // loader for images, needed for reference in sass/css files
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            publicPath: '../',
                            emit: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
    target: 'web',
};
