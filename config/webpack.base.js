const path = require('path');
const webpack = require('webpack')
const dayjs = require('dayjs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { VueLoaderPlugin } = require('vue-loader')
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  target: 'web',
  entry: ['./src/main.js'],
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.tsx'],
    alias: {
      '@': path.resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      /* {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 指定特定的ts编译配置，为了区分脚本的ts配置
              configFile: path.resolve(__dirname, '../tsconfig.json'),
              // 对应文件添加个.ts或.tsx后缀
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true, // 关闭类型检查，即只进行转译
            },
          },
        ],
      }, */
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader'
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
     
     
      {
        test: /\.(jpg|png|jpeg|gif|bmp)$/,
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
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    // new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      minify: {
        collapseWhitespace: true, // 去掉空格
        removeComments: true // 去掉注释
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: 'static',
        },
      ],
    }),
    // 指定环境,定义环境变量，项目中暂时未用到
    new webpack.DefinePlugin({
      'process.env': {
        VUE_BASE_URL: JSON.stringify('http://localhost:9000'),
        BUILD_TIME: JSON.stringify(dayjs().format('YYYY/DD/MM HH:mm:ss')),
        __VUE_PROD_DEVTOOLS__: 'false',
      },
    }),
    new CleanWebpackPlugin(),
    // fork-ts-checker-webpack-plugin，顾名思义就是创建一个新进程，专门来运行Typescript类型检查。这么做的原因是为了利用多核资源来提升编译的速度
    // new ForkTsCheckerWebpackPlugin(),
  ],
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new TerserWebpackPlugin()
  //   ]
  // },
}