const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        index: [
            path.resolve(__dirname, 'src/js', 'index.js'),
            path.resolve(__dirname, 'src/sass', 'main.scss'),
        ],
    },

    mode: process.env.NODE_ENV,

    // default output folder. Possibly overwritten in subconfig
    output: {
        filename: 'js/[name].js',
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
                    {
                        loader: MiniCssExtractPlugin.loader, // extracts css into separate file
                        options: {
                            publicPath: '../',
                        },
                    },
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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    emit: devMode, // images are handled by CopyWebpackPlugin in dev mode
                    filename: 'images/[name][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]',
                },
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
