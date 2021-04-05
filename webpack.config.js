// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const webpack = require('webpack')
// module.exports = {
//     mode: 'development'
//     , entry: {
//         main: path.resolve(__dirname, './src/index.js'),
//     },
//     output: {
//         path: path.resolve(__dirname, './dist'),
//         filename: 'index.bundle.js',
//         assetModuleFilename: 'images/[hash][ext][query]'
//     },
//     devServer: {
//         historyApiFallback: true,
//         contentBase: path.resolve(__dirname, './dist'),
//         open: true,
//         compress: true,
//         hot: true,
//         port: 8080,
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             title: 'file-manager',
//             template: path.resolve(__dirname, './src/index.html'), // шаблон
//             filename: 'index.bundle.html', // название выходного файла
//         }),
//         new CleanWebpackPlugin(),
//         new webpack.HotModuleReplacementPlugin(),
//     ],
//     module: {
//         rules: [
//             // JavaScript
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 use: ['babel-loader'],
//             },
//             // изображения
//             {
//                 test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
//                 type: 'asset/resource',
//             },
//             //Шрыфты, svg
//             {
//                 test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
//                 type: 'asset/inline',
//             },
//             // CSS, PostCSS, Sass
//             {
//                 test: /\.(scss|css)$/,
//                 use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
//             },
//         ],

//     }
// }