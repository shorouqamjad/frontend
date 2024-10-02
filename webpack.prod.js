const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// Check for production environment
const isProd = process.env.NODE_ENV === 'production';

// Define common plugins array
const commonPlugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './src/client/views/index.html',
        filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
        filename: 'main.css',
    }),
];

// Add Service Worker plugin if in production
if (isProd) {
    commonPlugins.push(
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        })
    );
}

module.exports = {
    entry: './src/client/index.js',
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'inline-source-map',
    optimization: {
        minimize: isProd,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: commonPlugins,
    // Uncomment if dev server is needed
    // devServer: {
    //     port: 8080,
    //     static: path.join(__dirname, 'dist'),
    //     allowedHosts: 'all',
    //     hot: true,
    // },
};
