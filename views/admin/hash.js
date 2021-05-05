const bcrypt = require('bcryptjs');
async function run() {
    // 加密
    // 生成一个盐值
    let salt = await bcrypt.genSalt(10);
    // 用盐值加密
    let result = await bcrypt.hash('123456', salt);
    console.log(result);
    // 对比
    let bool = await bcrypt.compare('123456', result);
    // 输出布尔值
    console.log(bool);
}
run();