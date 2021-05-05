const express = require('express')
const admin = express.Router()

// admin.get('/',(req,res)=>{
//     res.send('用户管理')
// })

admin.get('/login',require('./admin/loginPage'))

// 用户登录
admin.post('/login',require('./admin/login'))

// 创建用户列表路由
admin.get('/user',require('./admin/userPage'))

// 实现用户退出
admin.get('/logout',require('./admin/logout'))

// 创建用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'))

// 创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'))

// 用户修改功能路由
admin.post('/user-modify',require('./admin/user-modify'))

// 用户删除功能路由
admin.get('/user-delete', require('./admin/user-delete'))

// 文章列表页面路由
admin.get('/article',require('./admin/article'))

// 文章编辑页面路由 
admin.get('/article-edit',require('./admin/article-edit'))

// 文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))


module.exports = admin