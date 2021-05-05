const { Article } = require('../../model/article')
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')
module.exports = async (req,res)=>{

    var { page } = req.query

    // 标识 表示当前访问的是文章管理页面
    req.app.locals.currentLink =  "article"

   let  articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').lean().exec();
   let str = JSON.stringify(articles);
   let json = JSON.parse(str);
    res.render('admin/article.art', {
        articles: json
    })
}