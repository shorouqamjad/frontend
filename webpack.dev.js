const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'detailed',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
        publicPath: '/', // Ensure proper asset loading
        libraryTarget: 'var',
        library: 'App'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin({
            dry: false, // Actually remove files
            verbose: true, // Output logs to console
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    devServer: {
        port: 8081,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        allowedHosts: 'all',
        historyApiFallback: true,
        hot: true, // Enable hot module replacement
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    }
};
