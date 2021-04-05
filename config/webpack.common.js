const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('./paths')

module.exports = {
    mode: 'development',
    entry: {
        main: path.src + '/index.js',
    },
    output: {
        path: path.build,
        filename: '[name].bundle.js',
        assetModuleFilename: 'images/[name][ext][query]',
        library: 'FileManager',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'file-manager',
            template: path.src + '/index.html', // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // изображения
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            //Шрыфты, svg
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],

    }
}