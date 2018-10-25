/**
 * Created by alanterriaga on 30/7/18.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loader: "style-loader!sass-loader!css-loader"
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'client/images/',
                            name: '[name][hash].[ext]',
                        },
                    },
                ],
            }
        ]
    }
}