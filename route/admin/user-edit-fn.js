const { User, validateUser } = require('../../model/user')
// 引入加密模块
const bcrypt = require('bcrypt')

module.exports = async (req,res,next)=>{
    
    try{
        // 实施验证
        await validateUser(req.body)
    }catch(error) {
        // 验证未通过
        // 重定向到用户添加
        // return res.redirect('/admin/user-edit?message=' + error.message)
        return next(JSON.stringify({path:'/admin/user-edit',message:error.message}))
    }
    // res.send(req.body)
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({email:req.body.email})
    // 存在即邮箱已被占用
    if (user) {
        // 重定向至用户添加
        //   return res.redirect('/admin/user-edit?message=' + '邮箱已经被占用')
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱已经被占用'}))
    }
    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10)
    // 加密
    const password = await bcrypt.hash(req.body.password,salt)
    // 替换密码
    req.body.password = password
    // 将用户信息添加到数据库中
    await User.create(req.body)
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user')
}