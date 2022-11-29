## 流程框架图

router: 负责中间件、接口响应框架<br> 
controller: 负责接口响应框架<br> 
service: 负责操作数据库<br> 
model: 负责数据库模型创建<br> 
middleware: 负责中间件内部逻辑

router <==> controller <==> service <==> model

```js
ctx.app.emit  // EvntEmitter，发出一个类型由第一个参数定义的事件
```

