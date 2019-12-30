###  Vue-cli 工具的使用

```shell
2.0
​#全局安装  vue-cli
​npm install ---global  vue-cli  or cnpm
​# 创建一个基于webpack模板的新项目
vue init webpack my-project​           [webpack-simple]   区别就是-simple比较简单
# 切换到项目地址  安装依赖  启动 start
 cnpm install ​
cd ​ my-project
npm run dev​
3.0
https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create​
npm install -g  @vue/cli
​
OR  :  cnpm install -g @vue/cli
OR:   yarn global add @vue/cli
创建项目 必须cd 到对应的一个项目里面
vue create hello-world
运行： npm run serve​​​​​​
编译 ：npm run build​
​​
图形化界面创建项目     vue ui​​​
拿到一个新的脚手架项目 默认是 没有 node_modules 运行 :
必须 cd 到项目目录中 npm install OR  cnpm install  过程稍微漫长,请等待​​

​
  1.npm 开启了npm run dev以后怎么退出或关闭？
    ctrl+c
  2.--save-dev
    自动把模块和版本号添加到模块配置文件package.json中的依赖里devdependencies部分
  3. --save-dev 与 --save 的区别
    --save     安装包信息将加入到dependencies（生产阶段的依赖）
    --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
    
   vue 2.0 和 vue3.0 是有天壤之别的,vue3.0 主要是基于webpack 的零配置特性
```

####  npm install -S -D -g 区别

---

npm install module_name -S    即    npm install module_name --save    写入dependencies

npm install module_name -D    即    npm install module_name --save-dev 写入devDependencies

npm install module_name -g 全局安装(命令行使用)

npm install module_name 本地安装(将安装包放在 ./node_modules 下)



dependencies与devDependencies有什么区别呢？

devDependencies 里面的插件只用于开发环境，不用于生产环境

dependencies 是需要发布到生产环境的

有点儿不好理解，别怕，举个例子就好：

你开发一个前端项目，在项目中你需要使用gulp构建你的开发和本地运行环境,这时你就要放到dependencies里。gulp是你用来压缩代码，打包等需要的工具，程序实际运行的时候并不需要，所以放到dev里就ok了。

你写程序要用element-ui,生产环境运行项目时肯定要用到element-ui,这时element-ui就应该安装到dependencies中去。

---

#### Vue-ui 的步骤

执行命令

```
vue ui
```

该命令会自动打开你的浏览器，默认地址为: **localhost:8000/project/select**,浏览器展示的页面如下：

![img](E:\Typora\note-local\markdown\前端\Vue\img\c294c6e6gy1fyskj64mjgj20so0ibt93.jpg)

切换界面到创建,点击下面**在此创建新项目按钮**

```
输入项目文件夹名称
包管理器，如果你已经安装了yarn，vue ui的默认包管理器是yarn
```

![img](E:\Typora\note-local\markdown\前端\Vue\img\c294c6e6gy1fyskyxqp6zj20g10l5ab6.jpg)

![img](E:\Typora\note-local\markdown\前端\Vue\img\c294c6e6gy1fysl2nhwulj20qs0l0abk.jpg)

上面的两项不用管，是我之前创建过玩的。可能你打开不是这样的，只有默认，手动和远程预设这三项。这里选择手动，下一步。

接下来，你会被要求配置预装选项，根据你自己项目需求勾选即可。一般来说，`Babel` ：可以将我们ES5、6  不能识别的代码转换成浏览器能识别的 ,Router,Vuex,Linter 、CSS PRE-processors这四项是必装的，另外我还勾选了下使用配置文件，可能有的人看不惯项目生成很多的.babelrc
这样单独的配置文件，也可以不勾，这样的话会统一到package.json中去配置

![img](E:\Typora\note-local\markdown\前端\Vue\img\c294c6e6gy1fysl8xpqwdj20sg0kxjz8.jpg)

![img](E:\Typora\note-local\markdown\前端\Vue\img\c294c6e6gy1fyslbi2d6gj20sb0kwabr.jpg)

第一个是问你router的mode要不要设成history模式，一般正式项目都会设成这种模式的
 第二个问你选用哪种Eslint风格，从vue-cli@2.x似乎就是standard选的多一些。
 第三个是表示当你保存/提交时自动做Lint

接下来会弹窗问你要不要保存为新预设，如果保存的话以后创建项目就可以像2.3中的那种图一样直接选择预设创建项目了

因为我使用vue ui整个创建项目过程实在过于简单，都是中文版的，直接介绍一下我认为的几个亮点吧。

3.1 关于插件与预设
 以前vue-cli@2.x是只提供6种默认模板供大家下载使用，如果想要自己高度自定义，比如你想基于typescritp去做项目，只能去fork官方模板，然后自己修改它，基本上没有生态圈可言。而现在vue-cli@3.x很多特性都是基于插件来灵活扩展的，会有很多大佬去开发各种各样的插件体系，相当于一个插件就可以是一种模板了，比如你在插件面板中可以搜一下elementUI,安装它的话就可以直接帮你生成一套整个基于elementUI的模板了。下载了就能用，基本上零配置。这是因为

- 每个插件都可以对项目文件操作
- 每个插件都可以对项目中已有的webpack配置进行操作
- 每个插件都可以对项目中注入一些script命令，比如serve,build之类的，还可以往一些钩子上注入一些想要执行的事件，比如install之后要做什么
- 每个插件都可以引入其他插件

以前每次创建一个新项目，都需要自己手动去安装各种依赖什么的，然后又一顿配置改改改。而有了预设之后，下次创建项目的时候都出现在选项列表里，只要勾选了就可以创建一个和之前一样配置和依赖的项目。

3.2 关于依赖
 以前安装插件，需要在vscode编辑器的命令行里执行 yarn add axios 等依赖，
 现在可以直接去vue ui 的依赖面板中点右上角的添加依赖，来搜索你想要安装的依赖直接安装。

3.3 关于项目配置

vue-cli@3.x可以让vue  ui的界面上直接通过勾选还是不勾选来决定开启还是关闭某些功能(我估计是官方实在是看不惯vue-cli@2.x中一群人瞎改它build目录里的配置然后玩崩了之后去github提各种乱七八糟的issue了，哈哈哈)，这种图形化界面的操作方式无疑对我这种战无渣更友好了...再也不用去记一些乱七八糟的命令，百度各种不怎么靠谱的解决方式。

3.4 关于vue ui的任务面板
 这个让我感觉特神奇的就是，再也不用在我的编辑器里去执行yarn dev 或者npm run  dev了，敲个业务代码还得特意留四分之一的窗口去看它命令行有没有报错...它可以直接在一个网页里跑起来我的项目，还有各种报告生成（虽然我现在很多功能也看不太懂，但是很酷炫有木有）。



3.5 关于生成的项目文件夹

```
.
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── views
│   │   ├── About.vue
│   │   └── Home.vue
│   ├── App.vue
│   ├── main.js
│   ├── router.js
│   └── store.js
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── README.md
├── babel.config.js
├── package.json
├── postcss.config.js
└── yarn.lock
```

相比于vue-cli@2.x也简洁了很多，没有build和config目录。
后期遇到坑点应该会记录一下。

#### Vue 目录讲解

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\as.png)

**vscode工具编辑器配置文件**

 

```.editorcongig
# 使下面配置生效
root= true
# 对所有文件都有效
[*]
# 所有文件 utf-8
charset utf-8
# 缩进 空格是 space
indent_style = tabs   
# 缩进两格
indent_size =2

安装 插件 editorConfig for VS Code

建议 补全文件夹

-- src
	-- api +  项目的请求例如 request 
	-- assets
		-- img + 图片 可以统一放入 img 文件夹
		-- font + 图标字体可以放入font 文件夹
	-- config 
    	--index.js + 项目的一些配置 
    	        > export default { } 使用 export 导出一个模块对象
				如果你在别的地方需要引入 可以使用 import  config from 					'./config'   node 会自动去里面找 index.js
     -- directive 
     	-- index.js + 存放自定义指令
     -- lib
     	-- util.js   与业务有关系的工具方法 放入这里 
     	-- tools.js  与业务无关的工具方法 放入这里
     -- router
     	-- index.js   
     	-- router.js  将内部代码抽出来放入index.js,只做路由列表配置 看图1,
     				    实际在index.js 进行操作  看图2
     		
    
    
	
```

​													图一

![1574235163358](C:\Users\Full Stack developer\AppData\Roaming\Typora\typora-user-images\1574235163358.png)

​											图二

![1574235289964](C:\Users\Full Stack developer\AppData\Roaming\Typora\typora-user-images\1574235289964.png)



![1574235492345](C:\Users\Full Stack developer\AppData\Roaming\Typora\typora-user-images\1574235492345.png)

模块

1

![1574235615618](C:\Users\Full Stack developer\AppData\Roaming\Typora\typora-user-images\1574235615618.png)

2![1574235649179](C:\Users\Full Stack developer\AppData\Roaming\Typora\typora-user-images\1574235649179.png)

二、主要项目目录介绍
1.build目录是webpack主要的配置目录

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\asdsa.png)

其中比较重要是 webpack.base.conf.js
兼容ES6配置


  ![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\AS.P)

配置地址常量

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\kp.png)

配置自定义loader

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\va.png)

2.config目录是对webpack和node最基础的配置，定义了当前所属环境，监听的端口号，生成静态文件目录位置等

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\vas.png)

其中比较重要是 index.js
配置node监听端口、静态文件位置，静态文件引用前缀、node代理等

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\asva.png)

3.js目录是项目开发过程中的自行开发或引用的小型js库

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\show.png)

其中比较重要的是 http.js，封装了axios库的常见用法，可以配置统一的request拦截器和response拦截器，其他的有类似日期类库，echarts封装类，vue的mixin库等

4.stylus目录是css预处理语言目录

![clipboard.png](E:\Typora\note-local\markdown\前端\Vue\img\spiritmark.png)

主要的样式文件
base --- 基础组件样式
mixin --- 混合函数库
reset --- 重置样式库
variable --- 全局变量声明

5.其他components、router、store目录
这三个目录结构是vue项目开发过程中独有的，分别代表vue组件目录，vue-router配置目录、以及vuex配置目录。
具体规范见
vue组件开发规范
vue-router配置规范
vuex配置规范

三、结语
目前开发vue项目的前端目录结构大致与此文大档介绍的架构一致，可能由于不同项目有具体需求会进行微量修改，但大体目录骨架与此一致，若后续进行vue项目开发，需遵循此目录架构，以方便各位同事快速在不同项目间开展工作。