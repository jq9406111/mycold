- 1.创建app.js  public  data
    + app.js是服务器的入口文件
    + public是文件夹存放静态资源的
    + data文件是存放json数据

- 2.写json数据和静态页面的样式
    + data/urse.json
    + index.html 
    + login.html(引入cs样式)
    + register.html
    + css/style.css
    + 完善登录注册页面

- 3.起一个简单的服务并测试
- ！[](1.png)
    + 在浏览器地址栏输入localhost:3000  出来111即成功
    + 补充：本地中localhost===127.0.0.1

- 4.处理主页收藏夹图标及静态资源(if  else)
    +！[](2.jpg)
    +补充:nodemon 插件
       + 全局安装nodemon
        ``` shell
        npm i nodemon -g
        ```
        +以后你所有的node指令变成nodemon 就可以监听ctrl+s,自动重启服务

- 5.写前端的接口
        + 首先引入axios.js,发送接口和数据
        +！[](2.jpg)
        +后台处理接口函数，验证是否传过来
           +验证方式：1.接口一样    2.method请求方式一样
        +如何接受用post方法传递过来的数据
- 6.登录验证
        + 获取数据   json数据可以用require引入
        ``` shell
        const db = require('./data/user.json')
        ```
        + 和输入的数据进行匹配(some方法)
            + 1.判断用户名是否为空=>用户名不能为空
        + 给前端返回结果

