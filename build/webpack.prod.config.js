/**
 *@desc
 *Created by yd on 2019-04-23
 */
const merge = require('webpack-merge')
const webpackBaseConfig = require('webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
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
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
})
