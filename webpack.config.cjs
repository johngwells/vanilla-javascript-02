const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path-posix');

module.exports = {
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    static: {
      directory: 'src'
    },
    hot: true,
    port: 8000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new Dotenv({
      systemvars: true
    })
  ]
};
