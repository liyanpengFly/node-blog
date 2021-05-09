// 导入文章构造集合
const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
module.exports = async (req,res)=>{
    // 接受客户端传递过来的文章id值
    let { id }  = req.query
    // 根据id查询文章详情
    var  article = await Article.findOne({_id:id}).populate('author')

    var comment = await Comment.find({aid:id}).populate('uid')
    // res.send(comment)
    // return 
    // 将数据传入模板
    article = JSON.stringify(article)
    article = JSON.parse(article)

    comment = JSON.stringify(comment)
    comment = JSON.parse(comment)
    res.render('home/article.art', { article,comment })
}