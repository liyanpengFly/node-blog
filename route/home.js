const express = require('express')
const home = express.Router()

home.get('/',(req,res)=>{
    res.send('文章管理')
})

module.exports = home