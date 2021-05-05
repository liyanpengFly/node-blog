// 引用express框架
const express = require('express')
// 处理路径
const path = require('path')
// 引入body-parser模块 用来 处理post请求参数
const bodyPaser = require('body-parser')
// 导入express-session模块
const session = require('express-session')
// 导入art-template模板引擎
const template = require('art-template')
// 导入dateformat第三方模块
const dateFormat = require('dateformat')
// 导入morgan第三方模块
const morgan = require('morgan')
// 创建网站服务器
const app = express()

// 数据库连接
require('./model/connect')

// require('./model/user')

// 处理post请求参数
app.use(bodyPaser.urlencoded({extended: false}))

// 配置session
app.use(session(
    {   
        resave: false,
        secret:'secret key',
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }
    }
    ))

// 开发静态资源
app.use(express.static(path.join(__dirname,'public')))

// 获取系统环境变量返回值是对象
if (process.env.NODE_ENV == 'development') {
    // 开发
    console.log('当前是开发环境')
    app.use(morgan('dev'))
}else {
    // 生产
    console.log('当前是生产环境')
}

// 告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'))
// 告诉express框架模板的默认后缀是什么
app.set('view engine','art')
// 当渲染 后缀为art的 模板时所使用的模板引擎是什么
app.engine('art',require('express-art-template'))
// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat
// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

// 拦截请求判断用户登陆状态
app.use('/admin',require('./middleware/loginGuard'))

// 为路由匹配请求路径
app.use('/home',home)
app.use('/admin',admin)

// 错误处理中间件
app.use((err,req,res,next)=>{
    // 将字符串对象装换为对象类型
    const result = JSON.parse(err)
    let params = []
    for (var attr in result) {
        if(attr != 'path' ){
            params.push(attr + '=' + result[attr])
        }
    }
    return res.redirect(`${result.path}?${params.join('&')}`)
})

// 监听端口
app.listen(3000);
console.log('服务器启动成功')