/**
 *@desc
 *Created by yd on 2019-04-23
 */
const merge = require('webpack-merge')
// const webpack = require('webpack')
const webpackcommonConfig = require('./webpack.common')

module.exports = merge(webpackcommonConfig, {
  mode: 'development', // 不压缩代码，加快编译速度
  // devtool: 'source-map', // 提供源码映射文件调试使用
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    open: true, // 自动打开浏览器
    compress: true// 启动服务器压缩
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    }]
  },
  plugins: []
})
