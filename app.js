// 引入内置模块
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
const db = require('./data/user.json')

let server = http.createServer((req, res) => { //创建服务器
    let { pathname, query } = url.parse(req.url, true)
        // pathname与req.url的异同  长得一样req.url带数据,pathname不带参数
    if (pathname === '/favicon.ico') { return res.end() } //处理收藏夹图标
    pathname = pathname == '/' ? '/login.html' : pathname; //将主页与静态资源
    if (path.extname(pathname)) { //判断请求的接口是否有后缀
        res.end(fs.readFileSync(path.join('./public', pathname))) //开放静态(拼接./public加上后边的文件名)
    } else { //这里专门存放咱们的前端发送的接口  例如：/dl /zc
        if (pathname === '/dl' && req.method == 'POST') {
            // req里边有一个method的属性，
            // 指定了前端是以什么的请求方式发送的数据  注意GET POST 要大写
            let str = ''
            req.on('data', chunk => {
                str += chunk;
            })
            req.on('end', () => {
                let obj = JSON.parse(str)
                    // console.log(db);
                if (obj.user === '') {
                    res.end(JSON.stringify({ code: 209, msg: '用户名不能为空' }))
                } else {
                    let flag = db.some(item => {
                        return item.user == obj.user
                    })
                    if (!flag) {
                        res.end(JSON.stringify({ code: 208, msg: '用户名不存在' }))
                    } else {
                        let flag = db.some(item => {
                            return item.urse == obj.urse && item.pwd == obj.pwd
                        })
                        if (flag) {
                            res.end(JSON.stringify({ code: 207, msg: "登录成功" }))
                        } else if (!flag) {
                            res.end(JSON.stringify({ code: 206, msg: "密码错误" }))
                        }
                    }
                }
            })
        } else if (pathname === '/zc' && req.method == 'GET') {
            // console.log(query);
            let flag = db.some(item => {
                return item.user == query.user
            })
            if (flag) {
                res.end(JSON.stringify({ code: 205, msg: '用户已存在' }))
            } else {
                db.push(query)
                fs.writeFileSync('./data/user.json', JSON.stringify(db))
                res.end(JSON.stringify({ code: 204, msg: '注册成功' }))
            }

        }
    }
})

server.listen(3000, () => {
    console.log("running at 3000");

})