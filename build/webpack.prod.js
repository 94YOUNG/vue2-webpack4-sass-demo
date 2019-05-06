/**
 *@desc
 *Created by yd on 2019-04-23
 */
const merge = require('webpack-merge')// 合并配置
const webpackcommonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(webpackcommonConfig, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:8].bound.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    },
    {
      test: /\.scss/,
      use:
          ['style-loader', 'css-loader', 'sass-loader']
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  optimization:
    {
      // minimize: true,//压缩代码，效果和UglifyJSPlugin一样，production模式已经默认设置
      splitChunks: {// 分割公共代码及依赖库
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks:
              2,
            maxInitialRequests:
              5,
            minSize:
              0
          }
        },
        chunks: 'all'
      },
      runtimeChunk: 'single'// 分离webpack的运行文件
    }
})
