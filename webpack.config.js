const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
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

const vendor = [
  'react'
]

const baseConfig = {
  entry: {
    index: __dirname + '/src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // name是entry的名字main，hash是根据打包后的文件内容计算出来的hash值
    filename: 'js/[name].[hash:6].js'
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
        loader: 'happypack/loader?id=happy-babel-js',
        // options: {
        //   presets: ['env', 'stage-0', 'react'] // env转换es6 stage-0转es7 react转react
        // }
      },
      exclude: /node_modules|vendor/,
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
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
    alias: {
      "module": path.resolve(__dirname, "app/third/module.js"),
    },
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
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    })
  ]
}
const dllConfig = {
  devtool: "eval-source-map",
  entry: {
    dll: vendor
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].js',
    library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
  },
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.join(__dirname, 'manifest.json')
    })
  ]
}

module.exports = function (env) {
  console.log(env);
  if (env.dll) {
    return dllConfig
  }
  if (!env.prd && !fs.existsSync(path.join(__dirname, 'dll', "dll.js"))) {
    console.log("未找到dll.js，请先执行`npm run dll`");
    return
  }
  let config = null;
  if (env.dev) {
    config = {
      devtool: "eval-source-map",
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
      },
      plugins: [
        new webpack.DefinePlugin({
          'ENV': JSON.stringify(env)
        })
      ]
    };
  } else {
    config = {
      devtool: "source-map",
      entry: {
        vendor: vendor
      },
      output: {
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].js',
      },
      plugins: [
        new webpack.DefinePlugin({
          'ENV': JSON.stringify(env)
        })
      ]
    }
  }
  return merge(baseConfig, config)
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
