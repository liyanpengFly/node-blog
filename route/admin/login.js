const { User} = require('../../model/user') 
const bcrypt = require('bcrypt')

module.exports = async(req,res)=>{
    var  { email, password} = req.body
    console.log(email,password,'看下参数')
    if (email.trim().length == 0 || password.trim().length ==0) return res.status(400).render('admin/error',{msg:'邮件地址或者密码错误'})
    const user = await User.findOne({email})
    if (user) {
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        // true比对成功
        // false比对失败
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            // 登陆成功 
            // 将用户名存储在请求对象中
            req.session.username = user.username
            // 将用户角色存储在session中
            req.session.role = user.role
            res.app.locals.userInfo = user
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表
                res.redirect('/admin/user')
            }else {
                // 重定向到博客首页
                res.redirect('/home/')
            }
            
        }else {
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
        }
    }else {
        res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
    }
}