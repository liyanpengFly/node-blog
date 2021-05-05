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
            res.app.locals.userInfo = user
            res.redirect('/admin/user')
        }else {
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
        }
    }else {
        res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
    }
}