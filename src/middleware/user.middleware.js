// 用户注册/登录、
const { getUserInfo, updateById } = require("../service/user.service");
const {
  userFormatterError,
  userAlreadyExits,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
  changePasswordFailed,
} = require("../constant/err.type");
const bcrypt = require("bcryptjs");

// 验证用户合法性
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;

  if (!user_name || !password) {
    console.error("用户名或密码为空");
    ctx.app.emit("error", userFormatterError, ctx);
    return;
  }

  await next();
};

// 验证用户合理性（如果已存在该用户）
const velifyUser = async (ctx, next) => {
  try {
    const { user_name } = ctx.request.body;

    const res = await getUserInfo({ user_name });

    if (res) {
      console.error(`用户名已经存在, ${user_name}`);
      ctx.app.emit("error", userAlreadyExits, ctx);
      return;
    }
  } catch (err) {
    console.error("获取用户信息错误", err);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

// 加密
const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // hash保存的是 密文，传入参数（明文密码，盐）
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
};

// 用户登录验证
const velifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name });

    // 1.判断用户是否存在（不存在：报错）
    if (!res) {
      console.error(`用户名不存在, ${user_name}`);
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }

    // 2.密码是否匹配
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit("用户密码错误", invalidPassword, ctx);
      return;
    }
  } catch (err) {
    console.log("用户登录失败", err);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }

  await next();
};

const changePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const { id } = ctx.state.user;

  try {
    const res = await updateById({ id, password });
    if (res) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: "10007",
        message: "修改密码失败",
        result: "",
      };
    }
  } catch (err) {
    ctx.app.emit("error", changePasswordFailed, ctx);
  }
};

module.exports = {
  userValidator,
  velifyUser,
  crpytPassword,
  velifyLogin,
  changePassword,
};
