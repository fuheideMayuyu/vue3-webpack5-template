const path = require('path')
// 合并配置文件
const { merge } = require('webpack-merge')
const common = require('./webpack.base.js')
// 压缩CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common,{
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    environment: {
      arrowFunction: false,
      destructuring: false,
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            // 存在问题，less文件压缩不成功？
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css',
    })
  ],
})