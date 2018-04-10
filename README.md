
## 基于 node7.0  webpack4.2  sass react16 搭建的框架

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


## 单个项目目录结构

````
fonts                     -- 字体文件
html                      -- 页面
img                       -- 图片[没有可以删除]
js                        -- 脚本
mocks                      -- 本地数据[没有可以删除]，ajax 直接引用，不打包
scss                      -- 样式[没有可以删除]，require 直接引用，不打包
other dics                -- 其他自定义文件夹，可以是组建之类的，公用业务模板，js中直接用 require 引用就可以了，不打包
````
