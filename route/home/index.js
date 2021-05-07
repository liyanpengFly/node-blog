const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (req,res)=>{
    const result = await pagination(Article).page(1).size(4).display(2).find().populate('author').exec()
    var newResult = JSON.stringify(result)
    newResult = JSON.parse(newResult)
    res.render('home/default.art',{ result:newResult })
}