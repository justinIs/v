const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: [".js", ".vue"]
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
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: file => (
                /node_modules/.test(file) &&
                !/\.vue\.js/.test(file)
            ),
        }, {
            test: /\.styl(us)?$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'stylus-loader'
            ]
        },{
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        // }, {
        //     test: /\.scss$/,
        //     use: [
        //         'vue-style-loader',
        //         'css-loader',
        //         'sass-loader'
        //     ]
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
        new FriendlyErrorsWebpackPlugin()
    ]
}
