环境 ：

1. `检查Node  Node.js 版本需不低于 8.6，建议使用 Node.js 10.0 及以上版本)) 、Git,安装就不用再重复安装了`

   +  查看Node 版本  node -v   ![1576894221428](C:\Users\Full Stack developer\AppData\Roaming\Typora\typora-user-images\1576894221428.png)

     ------- > 【如果您的电脑中已经安装上述必备程序，那么恭喜您！接下来只需要使用 npm 即可完成 Hexo 的安装】

   +  安装 cnpm 
     + npm install cnpm -g	 --registry=https://registry.npm.taobao.org      
     + -g: golbal 全局安装 hexo  以`管理员`方式运行  

+ 博客安装： 

  + 全局：  新建一个文件夹 blog 安装 博客 `配置`   ---> npm install hexo-cli  -g , 执行 hexo -v `查看版本`

  + ```bash
    npm update hexo -g #升级  
    ```

  + 局部 ：npm install hexo

  + 跳转进 blog 路径 执行 `初始化博客` 命令  ---> hexo init spiritmark

  + cd blog ： 进入博客目录, `安装依赖` ----> npm install  

  + 安装好之后 运行在服务端 5555 端口 , 就会出现一个自带的默认主题----->hexo s -p 5555 

    + ```
      ├── _config.yml
      ├── package.json
      ├── scaffolds
      ├── source
      |   ├── _drafts
      |   └── _posts
      └── themes
      ```

    + ```
      详细讲解 ===> 
      		[ _config.yml:  文件用于存放网站的配置信息，你可以在此配置大部分的参数  
      		[ scaffolds]是存放模板的文件夹，当新建文章时，Hexo会根据scaffold来建立文件；
      		[ source]是资源文件夹，用于存放用户资源  
      		[ themes]是主题文件夹，存放博客主题，Hexo 会根据主题来生成静态页面。
      ```

      +  具体 配置 ： https://hexo.io/zh-cn/docs/configuration

+ `部署` :  ---->  npm install hexo-deployer-git --save

  + 选择一款 编辑器,打开 我们的 博客 , 我们把 博客发布到Github 上面去, 找到 _config.yml 修改博客内容

  + 在底部 加入 github 的一个地址方便推送上去 

    ```
    deploy:      
      type: git
      repo: <repository url> #https://bitbucket.org/JohnSmith/johnsmith.bitbucket.io
      branch: [branch]
      message: [message]
    ```

    |           |                                                              |                                                              |
    | :-------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
    | 参数      | 描述                                                         | 默认                                                         |
    | `repo`    | 库（Repository）地址                                         |                                                              |
    | `branch`  | 分支名称                                                     | `gh-pages` (GitHub) `coding-pages` (Coding.net) `master` (others) |
    | `message` | 自定义提交信息                                               | `Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}`)            |
    | `token`   | Optional token value to authenticate with the repo. Prefix with `$` to read token from environment variable |                                                              |

    + deploy:
        type: git
        repo: git@github.com:SpiritMark/spiritmark.github.io.git
        branch: master

      OR ： `两个 都可以`

    + deploy:
        type: git
        repository: https://github.com/SpiritMark/northcy.github.io.git
        branch: master

      

  +  修改 URL 

    + 域名

      ​	url: http://[自己的域名].github.io  # 修改成自己的地址
      ​	root: /
      ​	permalink: :year/:month/:day/:title/
      ​	permalink_defaults:

  + 运行

    + 在静态模式下，服务器只处理 `public` 文件夹内的文件，而不会处理文件变动，在执行时，您应该先自行执行 `hexo generate`，此模式通常用于生产环境（production mode）下。
      +  `hexo generate`生成：  简写： hexo g    
      + `hexo deploy`  部署:    简写 :   hexo d ： 
      + **`就可以看到博客啦 ！`**

  + 寻找主题和更换主题：

    +   进入 ：  https://hexo.io/themes/   ,找到心仪的主题 进入 `Github `页面 ，将它下载下来,命名spiritmark

    + 在 _config.yml 中 ,定位到 theme一行 ： 修改 spiritmark ,最后将我们的主题 拖入themes 黏贴

    + 因为我们修改了配置,需要重新`部署生成`一下  `hexo d -g 关于主题的深入,也可以去了解下

    

    
  
  Hexo 常用命令详解
  
    hexo init
  
     + `hexo init  [folder]`  命令用于初始化本地文件夹为网站的根	目录
    
       	+  `folder` 可选参数，用以指定初始化目录的路径，若无指定则默认为当前目录
  
  ​     
  
    hexo new
  
    - `hexo new` 命令用于新建文章，一般可以简写为 `hexo n`
    
      - `layout` 可选参数，用以指定文章类型，若无指定则默认由配置文件中的 default_layout 选项决定
      - `title` 必填参数，用以指定文章标题，如果参数值中含有空格，则需要使用双引号包围
    
    - hexo init
    
      - `hexo init  [folder]`  命令用于初始化本地文件夹为网站的根	目录
      
        - `folder` 可选参数，用以指定初始化目录的路径，若无指定则默认为当前目录
      
        
  
    
  
  