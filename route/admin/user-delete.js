const { User } = require('../../model/user')
module.exports = async (req,res)=>{
    // 获取到要删除的 用户id,根据id删除用户
    await User.findOneAndDelete({_id:req.query.id})
    // 将页面重定向到用户列表页面
    res.redirect('/admin/user')
}