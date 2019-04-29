/**
 *@desc
 *Created by yd on 2019-04-23
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    filename: '[name].[hash:8].bound.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['vue-style-loader', 'css-loader', {
        loader: MiniCssExtractPlugin.loader
      }, 'sass-loader']
    }, {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, {
      test: /\.json/,
      use: [
        'json-loader'
      ]
    }, {
      test: /\.vue/,
      use: [
        'vue-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      /*      title: 'Webpack App',
            filename: 'index.html',
            template: './public/index.html',
            inject: true,
            hash: true,// 清缓存用
            chunksSortMode: 'none', */
    }, new CleanWebpackPlugin(['dist'])),
    // new webpack.NamedModulesPlugin(),//给打包的模块加上姓名
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })],

  optimization: {
    splitChunks: { chunks: 'initial' }
  }
}
