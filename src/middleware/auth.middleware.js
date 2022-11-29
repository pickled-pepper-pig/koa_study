const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, invalidToken } = require("../constant/err.type");

// 用户登录token校验
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");

  try {
    // user 中包含 id, user_name, is_admin 信息
    const user = jwt.verify(token, JWT_SECRET);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case "TokenExpiredError":
        console.log("token已过期", err);
        ctx.app.emit("error", tokenExpiredError, ctx);
        return;
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }

  await next();
};

module.exports = {
  auth,
};
