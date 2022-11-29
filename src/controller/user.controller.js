const { createUser, getUserInfo } = require("../service/user.service");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");

class UserController {
  async register(ctx, next) {
    // 1、获取数据
    const { user_name, password } = ctx.request.body;

    // 2、操作数据库
    const res = await createUser(user_name, password);

    // 3、返回结果
    ctx.body = {
      code: 0,
      message: "用户注册成功",
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    };
  }

  async login(ctx, next) {
    const { user_name } = ctx.request.body;

    // 1、获取用户信息（token 的 payload 中，需要记录 id, user_name, is_admin），并剔除 password 属性
    try {
      const { password, ...resUser } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登录成功",
        result: {
          token: jwt.sign(resUser, JWT_SECRET, { expiresIn: "1d" }), // 失效时间
        },
      };
    } catch (err) {
      console.log('用户登录失败', err)
    }
  }
}

module.exports = new UserController();
