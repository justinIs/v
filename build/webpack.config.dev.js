const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
require('@babel/polyfill')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
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
    devServer: {
        hot: true,
        watchOptions: {
            poll: true
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
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {from: resolve('static/img'), to: resolve('dist/static/img')}
        //     ]
        // }),
        new FriendlyErrorsWebpackPlugin()
    ]
}
