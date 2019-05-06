/**
 *@desc
 *Created by yd on 2019-04-23
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: './src/main.js'
  },
  resolve: {
    extensions: ['.json', '.js', '.vue', '*'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 完整版（编译器+运行时）ES Module (基于构建工具使用)，默认只有运行时，会报不能处理template
      '@': path.resolve(__dirname, '../src')// 处理路径问题
    }
  },
  output: {
    filename: '[name].[hash:8].bound.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      }, {
        test: /\.css$/,
        use: [process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 10 versions']
                })
              ]
            }
          }
        ]
      },
      // 普通的 `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 10 versions']
                })
              ]
            }
          },
          'sass-loader']
      }, {
        test: /\.sass$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
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
        test: /\.json$/,
        use: [
          'json-loader'
        ]
      }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'public/index.html', // 指定要打包的html路径和文件名
      showErrors: true// webpack 编译出现错误
      /*      title: 'Webpack App',
            filename: 'index.html',
            template: './public/index.html',
            inject: true,
            hash: true,// 清缓存用
            chunksSortMode: 'none', */
    }),

    // new webpack.NamedModulesPlugin(),//给打包的模块加上姓名
    new VueLoaderPlugin()
  ],

  optimization: {
    splitChunks: { chunks: 'initial' }
  }
}
