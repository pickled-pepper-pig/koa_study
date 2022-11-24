const Router = require("koa-router");
const { register, login } = require("../controller/user.controller.js");

const { userValidator, velifyUser } = require("../middleware/user.middleware");

const router = new Router({
  prefix: "/users",
});

// 注册接口
router.post("/register", userValidator, velifyUser, register);

// 登录接口
router.get("/login", login);

module.exports = router;
