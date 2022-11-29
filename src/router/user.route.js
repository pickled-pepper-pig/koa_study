const Router = require("koa-router");
const { register, login } = require("../controller/user.controller.js");

const {
  userValidator,
  velifyUser,
  crpytPassword,
  velifyLogin,
  changePassword,
} = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware.js");

const router = new Router({
  prefix: "/users",
});

// 注册接口
router.post("/register", userValidator, velifyUser, crpytPassword, register);

// 登录接口
router.post("/login", userValidator, velifyLogin, login);

// 修改密码
router.patch("/", auth, crpytPassword, changePassword);

module.exports = router;
