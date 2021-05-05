// 导入用户集合构造函数
const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req,res,next)=>{
    // 接收客户端传递过来的请求参数（post）
    const { username,email,password,role,state } = req.body
    // 即将要修改的用户id（get）
    const { id } = req.query
    const user = await User.findOne({_id:id})
    let isValid = await bcrypt.compare(password,user.password)
    // 密码 比对
    if (isValid) {
        // 成功
        // 将用户信息更新到数据库中
        await User.updateOne({_id:id},{
            username,
            email,
            role,
            state
        })
        // 重定向到用户列表页面
        res.redirect('/admin/user')
    }else {
        // 失败 
        let params = {
            path:'/admin/user-edit',
            message:'密码比对失败,不能进行用户信息的修改',
            id
        }
        next(JSON.stringify(params))
    }
}