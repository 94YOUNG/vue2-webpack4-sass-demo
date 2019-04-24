/**
 *@desc
 *Created by yd on 2019-04-23
 */
const merge = require('webpack-merge')
const webpackBaseConfig = require('webpack.base.config')

module.exports = merge(webpackBaseConfig, {
  mode: 'development', // 不压缩代码，加快编译速度
  devtool: 'source-map', // 提供源码映射文件调试使用
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader']
    }]
  }
})
