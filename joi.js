const Joi = require('joi')

const schema = {
    username: Joi.string().required().min(2).max(5).error(new Error('未通过'))
}

async function run () {
    try{
        await Joi.validate({username:'ab555555'},schema)
    }
    catch(err){
        console.log(err.message)
        return
    }
    console.log('验证通过')
}

run()