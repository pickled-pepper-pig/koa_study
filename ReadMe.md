## 流程框架图

router: 负责中间件、接口响应框架
controller: 负责接口响应框架
service: 负责操作数据库
model: 负责数据库模型创建
middleware: 负责中间件内部逻辑

router <==> controller <==> service <==> model

```js
ctx.app.emit  // EvntEmitter，发出一个类型由第一个参数定义的事件
```

