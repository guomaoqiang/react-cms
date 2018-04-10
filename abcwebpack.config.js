const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const Webpack = require('webpack')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ip = require('ip')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})
const fs = require('fs');
const root = path.resolve(process.cwd());
const merge = require("webpack-merge");

module.exports = {
  entry: {
    index: __dirname + '/src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // name是entry的名字main，hash是根据打包后的文件内容计算出来的hash值
    filename: '[name].[hash:6].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.s?css$/, // 转换文件的匹配正则
      // css-loader用来处理css中url的路径
      // style-loader可以把css文件变成style标签插入head中
      // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
      // 此插件先用css-loader处理一下css文件
      use: ExtractTextWebpackPlugin.extract({
        // fallback: 'style-loader',
        //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
        use: ['css-loader', 'sass-loader', 'postcss-loader']
      })
    }, {
      test: /\.jsx?$/,
      use: {
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happy-babel-js',
        // query: {
        //   presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
        // }
      },
      include: path.resolve(__dirname + 'src'),
      exclude: /node_modules/,
    }]
  },
  // webpack4最新配置，可以搜索关键字查查配置项
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
  // 1. source-map 把映射文件生成到单独的文件，最完整最慢 生产用
  // 2. cheap-module-source-map 在一个单独的文件中产生一个不带列映射的Map
  // 3. eval-source-map 使用eval打包源文件模块,在同一个文件中生成完整sourcemap
  // 4. cheap-module-eval-source-map sourcemap和打包后的JS同行显示，没有映射列
  devtool: "eval-source-map",
  resolve: {
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    // 用于查找模块的目录
    extensions: [".js", ".json", ".jsx", ".css"],
    // 使用的扩展名
    alias: {
      // 模块别名列表
      "module": "new-module",
      // 起别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // 起别名 "only-module" -> "new-module"，但不匹配 "only-module/path/file" -> "new-module/path/file"
      "module": path.resolve(__dirname, "app/third/module.js"),
      // 起别名 "module" -> "./app/third/module.js" 和 "module/file" 会导致错误
      // 模块别名相对于当前上下文导入
    },
    /* 可供选择的别名语法（点击展示） */

    /* 高级解析选项（点击展示） */
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        // 去掉注释
        removeComments: true,
        // 去掉空格
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      }
    }),
    new ExtractTextWebpackPlugin({
      filename: 'css/[name].[hash:6].css'
    }),
    // 去除无用的css
    new PurifyCSSPlugin({
      // 路劲扫描 nodejs内置 路劲检查
      paths: glob.sync(path.join(__dirname, 'src/*.html')) //src下所有的html
    }),
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?presets[]=es2015'],
      threadPool: happyThreadPool
    })
    // 复制静态文件
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'static'),
    //     to: path.resolve(__dirname, 'pages/static'),
    //     ignore: ['.*']
    //   }
    // ])
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: true,
    port: 9090,
    host: ip.address(),
    overlay: true,
    compress: true, // 服务器返回浏览器的时候是否启动gzip压缩
    before: (app) => {
      // app.get('/mocks/demo', function (req, res) {
      //   res.json({
      //     custom: 'response'
      //   });
      // });
      app.get('/mocks/*', mockResult)
    }
  }
}


// 返回请求的 mock 数据
function mockResult(req, res) {
  let mSecond = (Math.random() * 3000);
  let url = req.originalUrl.replace(/\?.*/, '').replace(/\..*$/, '') + '.json';
  let result = JSON.parse(fs.readFileSync(`${root}${url}`), 'utf-8');
  new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
      res.json(result);
    }, mSecond);
  });
};
