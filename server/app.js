/**
 * Created by So on 2018/3/16.
 */
const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')

const config = require('./config')
const routers = require('./routers/index')

const app = new Koa()

// 配置控制台日志中间件
app.use(convert(koaLogger()))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(convert(koaStatic(
  path.join(__dirname , './../build')
)))

// 配置服务端模板渲染引擎中间件
// app.use(views(path.join(__dirname, './views'), {
//   extension: 'ejs'
// }))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)