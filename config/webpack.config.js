const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {test: /\.css$/,loader: 'style-loader!css-loader'},
        {test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192'},
        {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url-loader'},
        {
          test: /\.(html)$/,
          use: {
              loader: 'html-loader'
            },
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          use: {
              loader: 'babel-loader',
          },
          exclude: /node_modules/,
        }
    ]
  },
  resolve: {
      alias: {
         handlebars: 'handlebars/dist/handlebars.min.js'
      }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   jQuery: 'jquery',
    //   $: 'jquery'
    // }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'Cider Dashboard',
      template: './src/index.html',
      inject: 'head',
    })
  ],
  devServer: {
    contentBase: '../build',
    compress: true,
    filename: "bundle.js",
    host: "127.0.0.1",
    port: 8000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  }
};
