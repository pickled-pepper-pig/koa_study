const { getUserInfo } = require("../service/user.service");
const {userFormatterError, userAlreadyExits} = require('../constant/err.type')

// 验证用户合法性
const userValidator = async(ctx, next) => {
  const { user_name, password } = ctx.request.body;

  if(!user_name || !password) {
    console.log('用户名或密码为空')
    ctx.app.emit('error', userFormatterError, ctx)
    return
  }

  await next()
}

// 验证用户合理性（如果已存在该用户）
const velifyUser = async(ctx, next) => {
  try {
    const { user_name } = ctx.request.body;

    const res = await getUserInfo({user_name})

    if(res) {
      ctx.app.emit('error', userAlreadyExits, ctx)
      return
    }
  } catch (err) {

  }
  await next()
}

module.exports = {
  userValidator,
  velifyUser
}