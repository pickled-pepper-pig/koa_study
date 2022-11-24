const Koa = require("koa");
const { koaBody } = require("koa-body");
const errHandler = require("./errHandler");

const app = new Koa();
const useRouter = require("../router/user.route");

// 在所有路由route之前注册koaBody()
app.use(koaBody());
app.use(useRouter.routes());

// 统一的错误处理（在middleware层传递error，index层进行监听）
app.on("error", errHandler);

module.exports = app;
