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
            },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader',
            query: {
              limit: 1,
              name: 'images/[name].[ext]?[hash:5]'
            }
          }
        ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };