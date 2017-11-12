 var path = require('path');
 var webpack = require('webpack');
 module.exports = {
     entry: './main.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'app.bundle.js'
     },
     module: {
         rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            }
        ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };