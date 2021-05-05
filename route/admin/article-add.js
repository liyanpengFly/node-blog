// 引入formidable第三方模块
const formidable = require('formidable')
const path = require('path')
// 引入文章集合 
const { Article } =require('../../model/article')
module.exports =  (req,res)=>{
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm()
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname,'../','../','public','uploads')
    // 3.保留上传文件的后缀
    form.keepExtensions = true
    // 4.解析表单 
    form.parse(req, async (err,fileds,files)=>{
        // 1.err错误对象如果表单解析失败err中存储错误信,如果解析成功err为null
        // 2.fileds对象类型保存普通表单数据
        // 3.files对象类型 保存了和文件上传相关的数据
        // res.send(files.cover.path.split('public')[1])
        var { title,author,publishDate,content } = fileds 
        var cover = files.cover.path.split('public')[1]
        await Article.create({
            title,
            author,
            publishDate,
            cover,
            content
        })
        // 将文章重定向到文章列表页面
        res.redirect('/admin/article')
        
    })
}