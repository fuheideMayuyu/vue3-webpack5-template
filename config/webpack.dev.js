const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
const webpack = require('webpack')
const path = require('path')
const open = require('opn') //打开浏览器
const chalk = require('chalk') // 改变命令行中输出日志颜色插件
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(common,{
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  devServer: {
    // port: 8080,
    contentBase: '../dist',
    host: '0.0.0.0',
    overlay: true,
    stats: 'errors-only',
    compress: true, // 为每个静态文件开启 gzip compression
    after() {
      open('http://localhost:' + this.port)
        .then(() => {
          console.log(
            chalk.cyan('成功打开链接： http://localhost:' + this.port)
          )
        })
        .catch((err) => {
          console.log(chalk.red(err))
        })
    },
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(mp4|ogg|mp3|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(jpg|png|jpeg|gif|bmp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]'
                }
              }
            }
          },
        ]
      },
      
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})