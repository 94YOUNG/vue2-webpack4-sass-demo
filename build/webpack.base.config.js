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
    filename: '[chunkhash].bound.js',
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
      use: ['file-loader']
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
  plugins: [new HtmlWebpackPlugin({
    title: 'Webpack App'
  }, new CleanWebpackPlugin(['dist'])), new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin(), new MiniCssExtractPlugin({
    filename: 'style.css'
  })],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  optimization: {
    splitChunks: { chunks: 'initial' }
  }
}
