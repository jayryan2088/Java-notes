[TOC]

# Webpack的安装和介绍

## 1.1 Webpack是什么

wepack是现代前端开发中最火的模块打包工具，只需要通过简单的配置，便可以完成模块的加载和打包。

[官网文档](https://webpack.github.io/)

​	

![Logo](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\logo.jpg)



> Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。



+ [为什么要使用Webpack](https://www.jianshu.com/p/9f2d0b64f3b8)
  + 模块化开发（import，require）
  +  预处理（Less，Sass，ES6，TypeScript……）
  + 主流框架脚手架支持（Vue，React，Angular）
  +  庞大的社区（资源丰富，降低学习成本）
    - webpack 不仅能处理 js, 也能处理 css, 还能处理 html，甚至是图片等各种前端资源；
    - 开发便捷，仅仅使用一个配置文件，就能替代部分 grunt/gulp 的工作，比如打包、压缩混淆、图片转 base64等；
    - 扩展性强，插件机制完善。

## 1.2 webpack核心概念

- Entry : 输入入口，webpack构建第一步从这里开始
- Moudle ：一个模块对应一个文件，从entry 开始递归找到所有依赖的模块
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割
- Loader：模块转换器，将模块原内容按照需求转换成新内容
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情
- Output：输出，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果

```javascript
//webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');  //分离CSS和JS文件
const CleanWebpackPlugin = require('clean-webpack-plugin');     //去除build文件中的残余文件
const path = require('path');
const webpack=require('webpack');

let pathsToClean = [
    'dist'
]

module.exports = {
    entry: {  //唯一入口文件
        "app.bundle": "./src/app.js",
        "contact": "./src/contact.js"
    },
    devServer: {  //配置本地服务器
        port: 8686,  //端口号
        open: true,  //设置是否自动打开
        hot:true     //模块热替换，热更新
        //inline:true   //实时刷新
    },
    output: {  //输出文件
        path: path.resolve(__dirname, 'dist'),  //打包后的文件存放的地方
        filename: '[name].[hash].js'   //打包后输出文件的文件名
    },
    plugins: [
        new HtmlWebpackPlugin({    //new 一个插件的实例，并传入相关的参数
            // title:'hello world'   //自动添加HTML的标题
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            //excludeChunks代表的不包含
            excludeChunks: ['contact']
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            filename: 'contact.html',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            //chunks代表的是包含
            chunks: ['contact']
        }),
        new CleanWebpackPlugin(pathsToClean),
        new ExtractTextPlugin({
            filename:'style.css',
            disable:true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()   //自动刷新实时预览修改后的效果
        //new webpack.optimize.UglifyJsPlugin()     //压缩JS代码
    ],
    module: {
        rules: [
            {
                test: /\.css$/,   //用以匹配loaders所处理文件的拓展名的正则表达式
                use: ['style-loader','css-loader','postcss-loader']    //style-loader要配置在css-loader之前
            }
        ]
    }
}
```

>entry 对象是用于 webpack 查找启动并构建 bundle。其上下文是入口文件所处的目录的绝对路径的字符串。
>注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。



## 1.3  Webpack的安装 

在安装 Webpack 前，本地需要安装nodejs运行环境，下载地址：[node](https://link.jianshu.com/?t=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload%2F)，根据你的系统下载版本。

![Node](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\node.webp)



下载安装包后，点击可执行文件，不断地按下一步，就可以安装成功。测试安装是否成功，使用 `node -v`，如果显示版本号则表示安装成功。

![](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\node-v.webp)

### 1.3.1 全局安装(不推荐)

在命令行上输入以下命令：`npm install -g webpack`，测试是否安装成功输入 `webpack -v`，如果显示版本号则安装成功。

 ####  超过4.0安装方式 

​	`npm i -D webpack`  i 是 install 的缩写

​    `npm  i -D webpack-cli ` 命令行的使用	

	#### 命令解释

-S：`--save` 的简写，等同于npm run start 只需输入npm start，这两个效果是一样的。
-D：`--save-dev` 的简写，其包名称及版本号会存在package.json的devDependencies这个里面，而--save则会将包名称及版本号放在dependencies里面。



>npm 是 nodejs 管理插件用的工具，install 表示安装，-g  时 gobal 的缩写   表示全局安装。
>
>也可以使用 cnpm, 但是在此之前 需要执行以下命令
>
> **npm install -g cnpm --registry=https://registry.npm.taobao.org**



![](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\webpack-v.webp)

### 1.3.2 初始化项目文件

在任意盘符新建一个文件夹，如在D盘创建webpackDemo文件夹；

<img src="E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\disk.webp" alt="images"  />

之后你会看到提示输入一些内容，这不用管，直接全部回车。

**如果不想输入 信息   可以加 -y 代表 yes**

```shell
npm init -y
```

创建完成之后，会发现 webpack-test目录下多出了一个名为 package.json 的文件，主要是显示这个项目的名称、版本、作者、协议等信息。

```
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.11.0"
  }
}
```

### 1.3.3  在项目中安装webpack

在命令行中输入

`npm install --save-dev webpack`

![](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\npm-install.webp)

你会看到正在安装 webpack 的进度，稍等片刻，成功之后，我们再来看看 package.json 这个文件的内容，多了下面这几行：

```json
  "devDependencies": {
    "webpack": "^3.11.0"
  }
```

同时你也会发现，多了一个目录，叫 node_modules，这就是存放刚才安装的 webpack 库所有要用到的源码文件。
如果你使用的是 npm 5，可能还会在目录中看到一个 package-lock.json 文件。



# Webpack的快速使用

首先我们创建一个目录，初始化 npm，然后 在本地安装 webpack，接着安装 webpack-cli（此工具用于在命令行中运行 webpack）：

```shell
mkdir webpack-demo && cd webpack-demo
npm init -y
`npm i -D webpack`  
`npm  i -D webpack-cli `

```

项目的结构

```
  webpack-demo
+ |- package.json
+ |- /dist
+   |- index.html
+ |- /src
+   |- index.js
```

+ 第二步：安装 loadash 依赖和编写 js 文件

  ```shell
  npm install --save lodash
  ```

  + 编写：src/index.js 文件

  ```shell
  import _ from 'lodash';
  
  function createDomElement() {
    var dom = document.createElement('div');
    dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
    return dom;
  }
  
  document.body.appendChild(createDomElement());
  ```

  

  index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>起步</title>
  </head>
  <body>
    <script src="./main.js"></script>
  </body>
  </html>
  ```

+ 第三步：编写 webpack 配置文件

  根目录下添加 `webpack.config.js`文件。

  ```json
    webpack-demo
    |- package.json
  + |- webpack.config.js
    |- /dist
      |- index.html
    |- /src
      |- index.js
  ```

  + webpack.config.js 内容如下：

    ```js
    const path = require('path');
    
    module.exports = {
      mode: 'development',
      entry: './src/index.js',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
      }
    };
    ```

+ 执行构建任务

  + 直接执行构建任务

  ```shell
  npx webpack
  ```

  打开： dist/index.html 可以查看到页面的结果。

  ![效果](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\newinst.png)





## 2.1  加载非js文件



>webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 **loader** 引入任何其他类型的文件
>
>在webpack的世界里，一起文件都是模块。
>
>默认webpack只会打包js代码，想要打包其它内容，就需要相对应的loader。

**不使用loader 的情况**

![loader](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\loader-error.png)

### 2.1.1 加载CSS文本

+ 第一步： 安装 css 和 style 模块解析的依赖 `style-loader` 和 `css-loader`

```sh
	npm install --save-dev style-loader css-loader
```

or

```sh
	npm i -D style-loader css-loader
```



+ 第二步： 添加 css 解析的 loader

  ```javascript
  const path = require('path');
  
  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: { // 这个节点,用于配置 所有 第三方模块加载器
      rules: [ // 所有第三方模块匹配规则
        {
          // 加载 以 css为后缀的 文件  
          test: /\.css$/,
          // 从右向左读取loader  
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  };
  
  ```

  - `css-loader`： 辅助解析 js 中的 `import './main.css'` 并将其打包

  - `style-loader`: 把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签.依赖 `css-loader`

 **解释**

  *打开 `webpack.config.js` 这个配置文件，在里面，新增一个配置节点，叫做 **module**，它是一个对象；在 这个 **module** 对象身上，有一个 rules 属性，这个 `rules`属性是个 数组；这个数组中存放了所有第三方文件的配置 和处理规则；*

#### webpack 处理第三方文件类型的过程

  >注：
  >
  >1.发现这个 要处理的文件 不是 JS 文件，然后就去 配置文件中，查找有没有对应的第三方 loader 规则
  >2.如果能找到对应的规则，就会调用 对应的 loader 处理 这种文件类型
  >3.在调用loader 的时候，是从后往前调用的；
  >4.当最后的一个 loader 调用完毕，会把处理的结果，直接交给 webpack 进行打包合并，最终输出到bundle.js中去



+ 第三步： 编写 css 文件和修改 js 文件

  + 在 src 目录中添加 `style.css`文件

    ```json
     webpack-demo
      |- package.json
      |- webpack.config.js
      |- /dist
        |- bundle.js
        |- index.html
      |- /src
    +   |- style.css
        |- index.js
      |- /node_modules
     
    ```
  
  src/style.css
  
  ```css
  .hello {
    color: red;
  }
  ```
  
  修改 js 文件
  
  ```diff
    import _ from 'lodash';
  + import './style.css';
  
    function createDomElement() {
      let dom = document.createElement('div');
      dom.innerHTML = _.join(['aicoder', '.com', ' wow'], '');
  +   dom.className = 'hello';
  + or
  +  dom.classList.add('box')
      return dom;
    }
  
    document.body.appendChild(createDomElement());
  ```
  
  	**最后重新打开 dist 目录下的 index.html 看一下文字是否变成颜色。**
  
  ![渲染效果](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\webpack-lightgren.png)

    ### 2.1.2  module 配置补充

模块(module): 这些选项决定了如何处理项目中的不同类型的模块。

webpack 模块可以支持如下:

- ES2015 import 语句
- CommonJS require() 语句
- AMD define 和 require 语句
- css/sass/less 文件中的 @import 语句。
- 样式`(url(...))`或 HTML 文件`(<img src=...>)`中的图片链接`(image url)`



#### module.noParse

值的类型： RegExp | [RegExp] | function

防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。

```js
module.exports = {
  mode: 'devleopment',
  entry: './src/index.js',
  ...
  module: {
    noParse: /jquery|lodash/,
    // 从 webpack 3.0.0 开始,可以使用函数，如下所示
    // noParse: function(content) {
    //   return /jquery|lodash/.test(content);
    // }
  }
  ...
};
```

#### npx webpack 简写

> 我们可以将 npx webpack 设置 到 **package.json** 当中 	scripts处 ，重复的书写都可以如此

```json
    "build": "npx webpack -c webpack.config.js"
```







#### module.rules

创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

```javascript
module.exports = {
  ...
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  ...
};
```

>规则 -->rules ： 意思就是 满足 /\.css 开头的 必须经过  use['style-loader','css-loader']



#### module.Rule

*上面的每一组就是一个 rule*

+ Rule 条件详解
  + 字符串：匹配输入必须以提供的字符串开始。是的。目录绝对路径或文件绝对路径。
  + 正则表达式：test 输入值。
  + 函数：调用输入的函数，必须返回一个真值(truthy value)以匹配。
  + 条件数组：至少一个匹配条件。
  + 对象：匹配所有属性。每个属性都有一个定义行为。



#### Rule.test

+ { test: Condition }：匹配特定条件。一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。

  ```javascript
  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
    ...
  };
  ```

  其他的条件比如：

  

  - `{ include: Condition }`:匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。
  - `{ exclude: Condition }`:排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
  - `{ and: [Condition] }`:必须匹配数组中的所有条件
  - `{ or: [Condition] }`:匹配数组中任何一个条件
  - `{ not: [Condition] }`:必须排除这个条件

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "app/styles"),
          path.resolve(__dirname, "vendor/styles")
        ],
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  ...
};
```

> 匹配 css 并需要 包含 上面的路径



#### Rule.use

应用于模块指定使用一个 loader。

Loaders can be chained by passing multiple loaders, which will be applied from right to left (last to first configured).

加载器可以链式传递，从右向左进行应用到模块上。

```less
use: [
  'style-loader',
	//通过json 形式
  {
    loader: 'css-loader'
  },
// 好处是可以附加一些选项的参数
  {
    loader: 'less-loader',
    options: {
      noIeCompat: true
    }
  }
];
```



#### 加载 Sass 文件

加载 Sass 需要`sass-loader`。

安装

```sh
npm install sass-loader node-sass webpack --save-dev
```

or

```sh
npm i -D  sass-loader node-sass
```

使用

```sh
// webpack.config.js
module.exports = {
   
  module: {
    rules: [{
   	// 加载 以 sa c sa 开头的 ss 文件 
      test: /\.(sc|c|sa)ss$/,
      // 完整书写, (推荐简写)
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  }
};
```



为 sass 文件注入内容：

如果你要将 Sass 代码放在实际的入口文件(entry file)之前，可以设置 data 选项。此时 sass-loader 不会覆盖 data 选项，只会将它拼接在入口文件的内容之前。

```sh
{
    loader: "sass-loader",
    options: {
        data: "$env: " + process.env.NODE_ENV + ";"
    }
}

```



> 注意：由于代码注入, 会破坏整个入口文件的 source map。 通常一个简单的解决方案是，多个 Sass 入口。

#### 创建Source Map

`css-loader`和`sass-loader`都可以通过该 options 设置启用 sourcemap。

>启用的好处就是 可以在审查元素中寻找到

未开启前

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568719655953.png" alt="1568719655953" style="zoom: 50%;" />



开启后

​	<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1568719746881.png" alt="1568719746881" style="zoom:50%;" />

```javascript
// webpack.config.js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  }
};
```



#### PostCss 处理loader (附带：添加css3前缀)

[PostCSS](https://postcss.org/)是一个 CSS 的预处理工具，可以帮助我们：给 CSS3 的属性添加前缀，样式格式校验（stylelint），提前使用 css 的新特性比如：表格布局，更重要的是可以实现 CSS 的模块化，防止 CSS 样式冲突。



我们常用的就是使用 PostCSS 进行添加前缀，以此为例：

安装

```sh
npm i -D postcss-loader
npm install autoprefixer --save-dev

# 以下可以不用安装
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
$ npm install postcss-cssnext --save-dev

# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
$ npm install precss --save-dev

# 在@import css文件的时候让webpack监听并编译
$ npm install postcss-import --save-dev
```





未开启前

​	![sufix](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1568726016960.png)





开启后

![1568726175443](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\webpack-prefix.png)



[postcss-loader官网参考](https://www.npmjs.com/package/postcss-loader)

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
               // ident 相当于 唯一标识符
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                  // 添加前缀 
                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) 
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
```



#### 样式表抽离成专门的单独文件并且设置版本号

首先以下的 css 的处理我们都把 mode 设置为 `production`。

webpack4 开始使用： `mini-css-extract-plugin`插件, 1-3 的版本可以用： `extract-text-webpack-plugin`

>抽取了样式，就不能再用 `style-loader`注入到 html 中了。



```sh
npm install --save-dev mini-css-extract-plugin
```



```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader:'postcss-loader',
              options:{
                    // ident 相当于 唯一标识符
                  ident: 'postcss',
                  sourceMap: true,
                  plugins: loader => [
                      // 添加前缀 
                    require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) 
                  ]
              }
            },
            {
              loader:'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css', // 设置最终输出的文件名
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
};
```

再次运行打包：

```
"dist": "npx webpack --config webpack.product.config.js"
```

 最后运行项目

```
npm run dist
```



在 dist 目录中已经把 css 抽取到单独的一个 css 文件中了。修改 html，引入此 css 就能看到结果了。



#### 压缩CSS

webpack5 貌似会内置 css 的压缩，webpack4 可以自己设置一个插件即可。

压缩 css 插件：`optimize-css-assets-webpack-plugin`

安装

未开启前	![未开启前](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\webpackcss.png)

外部引入后

![css打包](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1568791337690.png)



使用optimize-css-assets-webpack-plugin  压缩后

![压缩后](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1568791443933.png)



```sh
npm i -D optimize-css-assets-webpack-plugin
```

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
};
```



#### JS 压缩

压缩需要一个插件： `uglifyjs-webpack-plugin`, 此插件需要一个前提就是：`mode: 'production'`.

安装

```sh
npm i -D uglifyjs-webpack-plugin
```



```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: '[id][hash].css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
```



#### 解决 CSS 文件或者 JS 文件名字哈希变化的问题

`HtmlWebpackPlugin`插件，可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中，这样就不用每次手动修改文件引用了。

安装

```sh
npm install --save-dev html-webpack-plugin
```

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [autoprefixer({ browsers: ['> 0.15% in CN'] })]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
    plugins: [
    new MiniCssExtractPlugin({
      filename: '[name][hash].css', // 设置最终输出的文件名
      chunkFilename: '[id][hash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'SpiritMark 全栈线下实习', // 默认值：Webpack App
      filename: 'main.html', //  最终生成的文件名 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/main.html'),  // 模板位置
      minify: {
        collapseWhitespace: true,
        removeComments: true, //移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
```



#### 清理dist目录

每次构建，我们的 `/dist` 文件夹都会保存生成的文件，然后就会非常杂乱。

通常，在每次构建前清理 `/dist` 文件夹，是比较推荐的做法

clean-webpack-plugin` 是一个比较普及的管理插件，让我们安装和配置下。

```sh
npm install clean-webpack-plugin --save-dev
```

webpack.config.js

```diff
  const path = require('path');
  ....
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ 上面纠错    const { CleanWebpackPlugin } = require("clean-webpack-plugin");

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(['dist'])
+       new CleanWebpackPlugin()
      ...
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
    ...
  };
```

现在执行 `npm run build`，再检查 `/dist` 文件夹。如果一切顺利，你现在应该不会再看到旧的文件，只有构建后生成的文件！



> *由于最新版本变化@2.0.1*之前的写法已经不能使用：`new CleanWebpackPlugin(['/dist'])`。 官方文档地址：https://www.npmjs.com/package/clean-webpack-plugin 可以直接设置一个对象参考：  `new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*']})`







#### 加载图片与图片优化

在 css 文件或者 sass 文件中添加如下代码

```diff
$red: #900;
$size: 20px;

.box {
  height: 30px*2;
  font-size: $size;
  transform: translate3d( 0, 0, 0 );
+ background: url('../static/1.jpeg')
}
```



运行打包发现如下错误：

```sh
ERROR in ./src/static/1.jpeg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
```



解决方案：`file-loader`处理文件的导入

```sh
npm install --save-dev file-loader
```



webpack.config.js



```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```

直接复制下面

```

		 {  test: /\.(png|svg|jpg|gif)$/,
                     use: [
                        'file-loader'
                      ]
                    }
```



此时运行打包，发现 dist 目录多了一个图片文件，另外报错不再出现。



那更进一步，图片如何进行优化呢？

`image-webpack-loader`可以帮助我们对图片进行压缩和优化。

```sh
npm install image-webpack-loader --save-dev
```

使用：webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
          use: [
            'file-loader',
+           {
+             loader: 'image-webpack-loader',
+             options: {
+               mozjpeg: {
+                 progressive: true,
+                 quality: 65
+               },
+               optipng: {
+                 enabled: false,
+               },
+               pngquant: {
+                 quality: '65-90',
+                 speed: 4
+               },
+               gifsicle: {
+                 interlaced: false,
+               },
+               webp: {
+                 quality: 75
+               }
+             }
+           },
          ]
        }
      ]
    }
  };
```

 





```javascript
{ 
          test: /\.(png|svg|jpg|gif)$/,
          include: [path.resolve(__dirname,'src/')],
           use: [
                  'file-loader',
                  {
                    loader: 'image-webpack-loader',
                    options: {
                      mozjpeg: {
                        progressive: true,
                        quality: 65
                      },
                      optipng: {
                        enabled: false,
                      },
                      pngquant: {
                        quality: '65-90',
                        speed: 4
                      },
                      gifsicle: {
                        interlaced: false,
                      },
                      webp: {
                        quality: 75
                      }
                    }
                  },
                ]
        }
```



上面是重复方便复制

此时在运行 webpack，发现会 生成的图片的大小会被压缩很多。



#### 更进一步处理图片成 base64

`url-loader`功能类似于 file-loader，可以把 url 地址对应的文件，打包成 base64 的 DataURL，提高访问的效率。

如何使用：

```sh
npm install --save-dev url-loader
```



webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 10000  // 当图片小于10k的时候 压缩成 bases64 减少网页请求的次数
            }
          },
          {
            loader: 'image-webpack-loader', // 先进行图片优化
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
};
```



##### 字体的处理同图片

由于 css 中可能引用到自定义的字体，处理也是跟图片一致。

```
const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        },
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
  };
```



##  3.1 开发相关辅助



#### 合并两个webpack配置文件

开发环境`(development)`和生产环境`(production)`配置文件有很多不同点，但是也有一部分是相同的配置内容，如果在两个配置文件中都添加相同的配置节点，
就非常不爽。

`webpack-merge` 的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。 

安装

```sh
npm install --save-dev webpack-merge
```



例如：



```js
  webpack-demo
  |- package.json
- |- webpack.config.js
+ |- webpack.common.js  // 公共样式
+ |- webpack.dev.js  //开发样式
+ |- webpack.prod.js // 生产环境样式
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```



#### 自己开发配置

webpack.dev.js

```js
// 路径
const path = require('path');
// 引入函数
const merge = require('webpack-merge');
// 引入公共配置
const common = require('./webpack.common');
// 开发配置
 let devConfig ={
  // entry  common  公共里面存在 
    mode: 'development',
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname,'dist')
    },
    devtool: 'inline-source-map',
    module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
                  // ident 相当于 唯一标识符
                ident: 'postcss',
                sourceMap: true,
                plugins: loader => [
                    // 添加前缀  
                  require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) 
                ]
            }
          },
          {
            loader:'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}

module.exports = merge(common,devConfig)
```



webpack.common.js

```js
// 存放公共js 
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
  entry: './src/index.js',
//   output:{
//     //   生产环境需要加hash 开发可以不用
//       filename: 'main.[hash].js',
//       path: path.resolve(__dirname,'dist')
//   },
  module: {
    rules: [
      
    //   图片处理先经过 image-loader 在经过压缩处理 
     { 
        test: /\.(png|svg|jpg|gif)$/,
        include: [path.resolve(__dirname,'src/')],
         use: [
                'file-loader',
                {
                  loader: 'url-loader', // 根据图片大小，把图片优化成base64
                  options: {
                    // 小于 100k 的全部压缩 成 base64
                    limit: 100000
                  }
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      progressive: true,
                      quality: 65
                    },
                    optipng: {
                      enabled: false,
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    webp: {
                      quality: 75
                    }
                  }
                },
              ]
      }
    ]
  },
 plugins: [
    //  压缩 在 生产坏境需要,开发坏境不需要 
  new HtmlWebpackPlugin({
    title: 'SpiritMark 全栈线下实习', // 默认值：Webpack App
    filename: 'main.html', //  最终生成的文件名 默认值： 'index.html'
    template: path.resolve(__dirname, 'src/main.html'),  // 模板位置
    minify: {
      collapseWhitespace: true,
      removeComments: true, //移除注释
      removeAttributeQuotes: true // 移除属性的引号
    }
  }),
  new CleanWebpackPlugin()
]
};
```





在 Common.js 中公共的地方

+ enry 肯定是一样的 入口文件

+ 图片的处理肯定需要,css 在Common.js 中不需要,开发阶段用style-loader 生产环境把他提取成一个单独的css 文件

+ 压缩 在生产环境(prod)需要 在开发环境不需要，原因是可以提高效率 去掉所有 optimization压缩设置

  



**webpack.common.js**



```diff
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```



**webpack.dev.js	**



```diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```



webpack.prod.js



```diff
+ const merge = require('webpack-merge');
+ const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   plugins: [
+     new UglifyJSPlugin()
+   ]
+ });
```

#### js 使用 source map

> 当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 
> c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。



使用 `inline-source-map` 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）：

 生产环境越干净越好

output 

在开发环境使用

![1568813438196](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1568813438196.png)



效果：

![1568813464354](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1568813464354.png)

webpack.config.js



```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

![webpackinline](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\webpackinline.png)





#### 监控文件变化，自动编译。使用观察模式



每次修改完毕后，都手动编译异常痛苦。最简单解决的办法就是启动`watch`。

```shell
npx webpack --watch
```

​	npm run watch![1568813613735](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1568813613735.png)

当然可以添加到 npm 的 script 中

package.json

```diff
{
    "name": "development",
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npx webpack --config webpack.dev.js",
    "dist": "npx webpack --config webpack.prod.js",
 + 	"watch": "npx webpack --watch --config webpack.dev.js"
    },
    "devDependencies": {
      "clean-webpack-plugin": "^0.1.16",
      "css-loader": "^0.28.4",
      "csv-loader": "^2.1.1",
      "file-loader": "^0.11.2",
      "html-webpack-plugin": "^2.29.0",
      "style-loader": "^0.18.2",
      "webpack": "^3.0.0",
      "xml-loader": "^1.2.1"
    }
  }
```

但是有个 bug，就是每次我们修改 js 或者 css 文件后，要看到修改后的 html 的变化，需要我自己重新刷新页面。

如何能不刷新页面，自动更新变化呢？



#### 使用 webpack-dev-server 和热更新

>webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

安装

```sh
npm install --save-dev webpack-dev-server
```

 编译到内存当中,生产环境需要开发环境不需要

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist' // 文件输出路径
+   },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Development'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

启动此 webserver：

```
webpack-dev-server --open
```



[官网其他配置](https://webpack.docschina.org/configuration/dev-server/)：

```js
devServer: {
  clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
  hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
  contentBase:  path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
  compress: true, // 一切服务都启用gzip 压缩
  host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
  port: 8080, // 端口
  open: true, // 是否打开浏览器
  overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
    warnings: true,
    errors: true
  },
  publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
  proxy: {  // 设置代理
    "/api": {  // 访问api开头的请求，会跳转到  下面的target配置
      target: "http://192.168.0.102:8080",
      pathRewrite: {"^/api" : "/mockjsdata/5/api"}
    }
  },
  quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  watchOptions: { // 监视文件相关的控制选项
    poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
    ignored: /node_modules/, // 忽略监控的文件夹，正则
    aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
  }
}
```

如何启用热更新呢？

webpack.config.js



```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
       app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
+     new webpack.HotModuleReplacementPlugin()  // 替换插件
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```



#### JS启用babel转码

虽然现代的浏览器已经兼容了**96%**以上的ES6的语法了，但是为了兼容老式的浏览器（IE8、9）我们需要把最新的ES6的语法转成ES5的。那么`babel`的loader就出场了。



安装

```sh
npm i -D babel-loader babel-core babel-preset-env
```



用法

在webpack的配置文件中，添加js的处理模块。

```js
module: {
  rules: [
    {
        
      test: /\.js$/, //满足js 的文件 就使用 babel-loader 处理
      exclude: /(node_modules)/,  // 加快编译速度，不包含node_modules文件夹内容
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
```

然后，在项目根目录下，添加babel的配置文件 `.babelrc`.

`.babelrc`文件如下：

```json
{
  "presets": ["env"]
}
```



最后，在入口js文件中，添加ES6的❤新语法：

```js
class Temp {
  show() {
    console.log('this.Age :', this.Age);
  }
  get Age() {
    return this._age;
  }
  set Age(val) {
    this._age = val + 1;
  }
}

let t = new Temp();
t.Age = 19;

t.show();
```

最后打包：

```sh
npx webpack
```

最终打包后的js代码：

```js
var a = 1,
    b = 3,
    c = 9;

console.log('a :', a);
console.log('b :', b);
console.log('c :', c);

var Temp = function () {
  function Temp() {
    _classCallCheck(this, Temp);
  }

  _createClass(Temp, [{
    key: 'show',
    value: function show() {
      console.log('this.Age :', this.Age);
    }
  }, {
    key: 'Age',
    get: function get() {
      return this._age;
    },
    set: function set(val) {
      this._age = val + 1;
    }
  }]);

  return Temp;
}();

var t = new Temp();
t.Age = 19;

t.show();
```



#### Babel优化

babel-loader可以配置如下几个options：



+ `cacheDirectory`：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的
  webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation 
  process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true 
  (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 
  node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 
  目录，将会降级回退到操作系统默认的临时文件目录。
+ `cacheIdentifier`：默认是一个由 babel-core 版本号，babel-loader 
  版本号，.babelrc 文件内容（存在的情况下），环境变量 BABEL_ENV 的值（没有时降级到 
  NODE_ENV）组成的字符串。可以设置为一个自定义的值，在 identifier 改变后，强制缓存失效。
+ `forceEnv`：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV。对有不同 babel 配置的，客户端和服务端同构应用非常有用。



>注意：sourceMap 选项是被忽略的。当 webpack 配置了 sourceMap 时（通过 devtool 配置选项），将会自动生成 sourceMap。



babel 在每个文件都插入了辅助代码，使代码体积过大.babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。 默认情况下会被添加到每一个需要它的文件中。你可以引入 `babel runtime` 作为一个独立模块，来避免重复引入。



安装：

```sh
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```



配置：	

webpack.config.js



```js
rules: [
  // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
    }
  }
]
```

修改`.babelrc`

```json
{
  "presets": ["env"],
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

此时，webpack打包的时候，会自动优化重复引入公共方法的问题。



#### ESLint校验代码格式规范

安装



```sh
npm install eslint --save-dev
npm install eslint-loader --save-dev

# 以下是用到的额外的需要安装的eslint的解释器、校验规则等
npm i -D babel-eslint standard
```

使用

```
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
          fix: true
        }
      },
    ],
  },
  // ...
}
```

eslint配置可以直接放到webpack的配置文件中，也可以直接放到项目根目录的 `.eslintrc`中[文档](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)。

```js
// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true  //浏览器
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'  //校验标准 是 standad.js
  ],
  globals: {
    NODE_ENV: false
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 添加，分号必须
    semi: ['error', 'always'],
    'no-unexpected-multiline': 'off',
    'space-before-function-paren': ['error', 'never'],
    // 'quotes': ["error", "double", { "avoidEscape": true }]
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true
      }
    ]
  }
};
```

此时eslint的配置就结束了。



#### 到此为止，一个完整的开发阶段的webpack的配置文件



```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 8085, // 端口
    open: true, // 是否打开浏览器
    overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: { // 设置代理
      "/api": { // 访问api开头的请求，会跳转到  下面的target配置
        target: "http://192.168.0.102:8080",
        pathRewrite: {
          "^/api": "/mockjsdata/5/api"
        }
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
      poll: true, // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'}),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(), // 更容易查看(patch)的依赖
    new webpack.HotModuleReplacementPlugin(), // 替换插件
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true, // 移除属性的引号
      },
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  optimization: {}
};
```

用于生产环境的配置

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: [{
          loader: 'babel-loader'
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [autoprefixer({browsers: ['> 0.15% in CN']})]
            }
          }, {
            loader: 'sass-loader'
          }
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }, {
        test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
        use: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name][hash].css', chunkFilename: '[id][hash].css'}),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true, // 移除属性的引号
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};

```



#### 解析(resolve)

配置模块如何解析。比如： `import _ from 'lodash'` ,其实是加载解析了lodash.js文件。此配置就是设置加载和解析的方式。

+ `resolve.alias`

创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：



```diff
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
+ resolve: {
+   alias: {
+     vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
+     '@': path.resolve(__dirname, 'src/')
+   }
+ }
  ...
}

// index.js
// 在我们的index.js文件中，就可以直接import
import vue from 'vue';
// 等价于
import vue from  'src/lib/vue/dist/vue.esm.js';
```

+ `resolve.extensions`的应用

自动解析确定的扩展。

```
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    alias: {
      vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
      '@': path.resolve(__dirname, 'src/')
    },
+   extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
  }
  ...
}
```



> 给定对象的键后的末尾添加 $，以表示精准匹配



#### 外部扩展(externals)

externals 配置选项提供了「从输出的 bundle 中排除依赖」的方法。 [文档](https://webpack.docschina.org/configuration/externals/)

例如，从 CDN 引入 jQuery，而不是把它打包：

index.html

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

webpack.config.js

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  alias: {
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
    vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
    '@': path.resolve(__dirname, 'src/')
  },
+ externals: {
+   jquery: 'jQuery'
+ },
  ...
}
```

这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：



```javascript
import $ from 'jquery';

$('.my-element').animate(...);
```

具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 CommonJS, AMD, 全局变量和 ES2015 模块。外部 library 可能是以下任何一种形式：



- root：可以通过一个全局变量访问 library（例如，通过 script 标签）。
- commonjs：可以将 library 作为一个 CommonJS 模块访问。
- commonjs2：和上面的类似，但导出的是 module.exports.default.
- amd：类似于 commonjs，但使用 AMD 模块系统。



​	不同的配置方式：

```javascript
externals : {
  react: 'react'
}

// 或者

externals : {
  lodash : {
    commonjs: "lodash",
    amd: "lodash",
    root: "_" // 指向全局变量
  }
}

// 或者

externals : {
  subtract : {
    root: ["math", "subtract"]   // 相当于： window.math.substract
  }
}
```



构建目标(targets)

webpack 能够为多种环境或 target 构建编译。想要理解什么是 target 的详细信息，请阅读 target 概念页面。

`target`: 告知 webpack 为目标(target)指定一个环境。

可以支持以下字符串值：



| 选项              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| async-node        | 编译为类 Node.js 环境可用（使用 fs 和 vm 异步加载分块）      |
| electron-main     | 编译为 Electron 主进程。                                     |
| electron-renderer | 编译为 Electron 渲染进程，使用 JsonpTemplatePlugin, FunctionModulePlugin  来为浏览器环境提供目标，使用 NodeTargetPlugin 和 ExternalsPlugin 为 CommonJS 和 Electron  内置模块提供目标。 |
| node              | 编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk） |
| node-webkit       | 编译为 Webkit 可用，并且使用 jsonp 去加载分块。支持 Node.js 内置模块和 nw.gui 导入（实验性质） |
| web               | 编译为类浏览器环境里可用（默认）                             |
| webworker         | 编译成一个 WebWorker                                         |



例如，当 target 设置为 "electron"，webpack 引入多个 electron 特定的变量.



webpack.config.js



```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, './dist')
  },
  alias: {
    extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
    vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
    '@': path.resolve(__dirname, 'src/')
  },
  externals: {
    jquery: 'jQuery'
  },
+ target: 'node'
  ...
}
```

#### 相关的loader列表

`webpack` 可以使用 loader 来预处理文件。这允许你打包除 JavaScript 之外的任何静态资源。你可以使用 Node.js 来很简单地编写自己的 loader。



#### 文件

- `raw-loader` 加载文件原始内容（utf-8）
- `val-loader` 将代码作为模块执行，并将 exports 转为 JS 代码
- `url-loader` 像 file loader 一样工作，但如果文件小于限制，可以返回 [data URL](https://tools.ietf.org/html/rfc2397)
- `file-loader` 将文件发送到输出文件夹，并返回（相对）URL



#### JSON

- `json-loader` 加载 [JSON](http://json.org/) 文件（默认包含）
- `json5-loader` 加载和转译 [JSON 5](https://json5.org/) 文件
- `cson-loader` 加载和转译 [CSON](https://github.com/bevry/cson#what-is-cson) 文件



#### 转换编译(Transpiling)

- `script-loader` 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
- `babel-loader` 加载 ES2015+ 代码，然后使用 [Babel](https://babeljs.io/) 转译为 ES5
- `buble-loader` 使用 [Bublé](https://buble.surge.sh/guide/) 加载 ES2015+ 代码，并且将代码转译为 ES5
- `traceur-loader` 加载 ES2015+ 代码，然后使用 [Traceur](https://github.com/google/traceur-compiler#readme) 转译为 ES5
- [`ts-loader`](https://github.com/TypeStrong/ts-loader) 或 [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader) 像 JavaScript 一样加载 [TypeScript](https://www.typescriptlang.org/) 2.0+
- `coffee-loader` 像 JavaScript 一样加载 [CoffeeScript](http://coffeescript.org/)



#### 模板(Templating)

- `html-loader` 导出 HTML 为字符串，需要引用静态资源
- `pug-loader` 加载 Pug 模板并返回一个函数
- `jade-loader` 加载 Jade 模板并返回一个函数
- `markdown-loader` 将 Markdown 转译为 HTML
- [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader) 使用 markdown-parse parser(解析器) 将 Markdown 编译为 React 组件
- `posthtml-loader` 使用 [PostHTML](https://github.com/posthtml/posthtml) 加载并转换 HTML 文件
- `handlebars-loader` 将 Handlebars 转移为 HTML
- [`markup-inline-loader`](https://github.com/asnowwolf/markup-inline-loader) 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用。



#### 样式

- `style-loader` 将模块的导出作为样式添加到 DOM 中
- `css-loader` 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
- `less-loader` 加载和转译 LESS 文件
- `sass-loader` 加载和转译 SASS/SCSS 文件
- `postcss-loader` 使用 [PostCSS](http://postcss.org) 加载和转译 CSS/SSS 文件
- `stylus-loader` 加载和转译 Stylus 文件



#### 清理和测试(Linting && Testing)

- `mocha-loader` 使用 [mocha](https://mochajs.org/) 测试（浏览器/NodeJS）
- [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader) PreLoader，使用 [ESLint](https://eslint.org/) 清理代码
- `jshint-loader` PreLoader，使用 [JSHint](http://jshint.com/about/) 清理代码
- `jscs-loader` PreLoader，使用 [JSCS](http://jscs.info/) 检查代码样式
- `coverjs-loader` PreLoader，使用 [CoverJS](https://github.com/arian/CoverJS) 确定测试覆盖率



#### 框架(Frameworks)

- `vue-loader` 加载和转译 [Vue 组件](https://vuejs.org/v2/guide/components.html)
- `polymer-loader` 使用选择预处理器(preprocessor)处理，并且 `require()` 类似一等模块(first-class)的 Web 组件
- `angular2-template-loader` 加载和转译 [Angular](https://angular.io/) 组件
- Awesome 更多第三方 loader，查看 [awesome-webpack 列表](https://github.com/webpack-contrib/awesome-webpack#loaders)。





#### 打包分析优化

`webpack-bundle-analyzer`插件可以帮助我们分析打包后的图形化的报表。

>仅仅在开发环境使用。



安装

```sh
npm install --save-dev webpack-bundle-analyzer
```



```diff
+ const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports = {
    plugins: [
+     new BundleAnalyzerPlugin()
    ]
  }
```



自动生成一个网页报表，如下所示：

![图片报表](E:\Typora\笔记地址\markdown\Webpack4-learning\img\webpackImg\1.gif)



#### other

webpack还是有很多其他需要学习的内容。 请参考官网，或者研究一下`vue-cli`的生成的webpack的相关配置，也很值得学习。

另外其他脚手架生成的相关配置都可以研究一下比如：`create-react-app`、`yo`等