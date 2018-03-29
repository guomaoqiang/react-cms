const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const Webpack = require('webpack')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// let cssExtract = new ExtractTextWebpackPlugin('static/css/[name].css')

module.exports = {
  entry: {
    index: './pages/index/index.js',
    base: './pages/base/base.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // name是entry的名字main，hash是根据打包后的文件内容计算出来的hash值
    filename: 'static/js/[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 转换文件的匹配正则
        // css-loader用来处理css中url的路径
        // style-loader可以把css文件变成style标签插入head中
        // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
        // 此插件先用css-loader处理一下css文件
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: 'common'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new HtmlWebpackPlugin({
      template: './pages/index/index.html',
      filename: 'pages/index.html',
      hash: true,
      chunks: ['index', 'common'],
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './pages/base/base.html',
      filename: 'pages/base.html',
      hash: true,
      chunks: ['base', 'common'],
      minify: {
        removeAttributeQuotes: true
      }
    }),
    new ExtractTextWebpackPlugin({
      filename: 'static/css/[name].[hash].css'
    }),
    new PurifyCSSPlugin({
      // 路劲扫描 nodejs内置 路劲检查
      paths: glob.sync(path.join(__dirname, 'pages/*/*.html'))
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'pages/static'),
        ignore: ['.*']
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9090,
    host: 'localhost',
    overlay: true,
    compress: true // 服务器返回浏览器的时候是否启动gzip压缩
  }
}
