## 用于后管系统

    * redux  react-redux 用于数据交互存储
    * antd 用于UI搭建
    * axios 用来接口请求
    * sass 用于预编译样式
    * webpack4.2 较以前改变许多

## 基于 node7.0  react16 react-router-dom4.2搭建的框架

    * nodejs 7.0以上
    * 开发建议，统一使用 sublime3 + 的版本进行开发
    * 环境搭建以 mac 指令为主，如果是 window 开发的，对应切换指令操作
    * mac 全局安装 sudo npm install [name] -g   推荐使用yarn
    * 本地安装都是 cd 指向文件夹， npm install [name] --save[-dev]

## 环境搭建，参考：webpack.config.js

## 构建指令全部参照 package.json 下的 script 标签

    * --env.xxx 设置全局变量；配置项如下：
    * ---env.dev 代表设置环境为开发环境，stg=测试环境，prd=生产
    * webpack-dev-server 代表启动本地服务，open表示浏览器打开页面
    * --mode development  表示启动开发环境，webpack4.0以上增加，生产用production


## 打包配置

    * [启动开发环境] npm run dev 或yarn run dev  以下类似
    * [打测试包] npm run stg
    * [打生产包] npm run prd

## 代码规范

    * 统一使用 webpack 推荐语法，不考虑迁移，不用 cmd 和 amd 规范
    * [()] run();  (function(){})(); 小括号后除数组内的，配置内的无法加，其他的建议加 ;
    * function() {}; 结尾建议加 ;
    * return {}; 结尾建议加 ;
    * 以 ' 未基础字符串号，   var name = '"This is demo"';
    * 每个 function 后回车一行，如果有参数的，建议复杂参数打上注释
    * 目前可以考虑以 es6 为标准，但是 babel 解析会严重影响打包速度，这个每个项目自己取舍

## 代码压缩

    * 目前针对js，css都进行压缩， 
    * 图片小于8.192k的都会转成base64
    * 公共模块代码都打包成一个文件，css会单独打包成一个css文件	

##  额外插件配置

    * postcss-loader的autoprefixer自动补充兼容css样式 
    * fastclick插件适合移动端，解决click延迟事件
    * 


## 目录结构

```
|mock                       -- mock 数据
|dll                        -- 开发环境提取公共部门，加快开发环境构建速度
|src                        -- 开发目录
├── components             -- 组件
    └── ****                -- 公用组件
    └── utils               -- 公用工具类
    └── network             -- 请求方法封装
├── configs                 -- 各个 site 配置
    └── demo                -- demo 配置参考
├── business                -- 业务相关组件
    └── ****                -- 公用组件
├── style                   -- 公共样式，使用了 antd 暂时不用
├── views                   -- 页面
    └── ****                -- 各个子模块
├── app.js                  -- 路由页面
├── bundle.js               -- 懒加载文件
├── index.html              -- 入口页面
├── index.js                -- 入口脚本，路由配置文件
|dist                       -- 打包后的文件目录
.gitignore                  -- git 忽略配置
.postcssrc.js               -- autoprefixer 样式自动补全版本
README.md                   -- 项目使用基础文档
package.json                -- 项目配置和依赖
webpack.config.js           -- webpack 打包配置文件
