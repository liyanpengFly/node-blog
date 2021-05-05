const { User } = require('../../model/user')
module.exports = async (req,res)=>{

    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user'

    // 获取地址栏中的参数
    const { message, id } = req.query
    const user = await User.findOne({_id:id})
    // 判断是修改还是添加操作
    if (id) {
        // 修改
        // 渲染用户编辑页面（修改）
        res.render('admin/user-edit',
        { 
            message,
            user,
            link:'/admin/user-modify?id='+id,
            button:'修改'
        })
    }else {
        // 添加
        res.render('admin/user-edit',
        { 
            message,
            link:'/admin/user-edit',
            button:'添加'
        })
    }
}