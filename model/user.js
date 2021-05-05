const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// 引入Joi模块
const Joi = require('joi')
// 创建用户集合规则
const userSchema = mongoose.Schema({
    username:{
        type:  String,
        require:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique: true,
        require: true
    },
    password: {
        type:String,
        require: true
    },
    role:{
        type:String,
        require:true,
    },
    // 0启用状态
    // 1禁用状态
    state:{
        type: Number,
        default: 0
    }
})

// 创建集合
const User = mongoose.model('User',userSchema)
mongoose.set('useCreateIndex', true);

async function createUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456',salt)

    // 将用户集合作为模块成员进行导出
    const user = await User.create({
        username:'iteheima',
        email:'itheima@itcast.cn',
        password:pass,
        role:'admin',
        state:0
    })
}

// 验证用户信息
const validateUser = (user)=>{
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(20).required().error(new Error('用户名不符合要求')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role: Joi.string().valid('admin','normal').required().error(new Error('角色不符合要求')),
        state: Joi.number().valid(0,1).required().error(new Error('状态不符合要求'))
    }

    // 实施验证的promise对象返回
    return Joi.validate(user,schema)
}

// createUser()

module.exports = {
    User,
    validateUser
}