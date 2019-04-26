/**
 *@desc
 *Created by yd on 2019-04-23
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackcommonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(webpackcommonConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        'css-loader'
      ]
    }, {
      test: /\.scss/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }), /* new UglifyJSPlugin({
      sourceMap: true
    }), */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})
