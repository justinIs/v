const path = require("path")
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('@babel/polyfill')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    target: 'web',
    entry: {
        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            assets: resolve('assets'),
            components: resolve('src/components'),
            entity: resolve('src/entity'),
            pages: resolve('src/pages'),
            repository: resolve('src/repository')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.(js|vue)$/,
            use: 'eslint-loader',
            enforce: 'pre'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            ),
        }, {
            test: /\.styl(us)?$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ]
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }, {
            // Loads the javacript into html template provided.
            // Entry point is set below in HtmlWebPackPlugin in Plugins
            test: /\.html$/,
            use: [
                {
                    loader: "html-loader"
                }
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true,
            excludeChunks: ['server']
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
