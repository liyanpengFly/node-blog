module.exports = (req,res,next)=>{
    // 判断用户是访问的是登录页面
    // 判断用户的登录状态
    // 如果用户是登陆的，将请求放行
    // 如果用户不是登陆的，将请求重定向 到登陆页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    }else {
        // 如果用户是登陆状态，且是普通用户
        if (req.session.role == 'normal') {
            // 让它跳转到博客首页，阻止程序向下执行
           return res.redirect('/home/')
        }
        // 用户是登陆状态，且是admin，请求放行
        next()
    }
}