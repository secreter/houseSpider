/**
 * Created by So on 2018/3/16.
 */
/**
 * 整合所有子路由
 */

const router = require('koa-router')()
const path = require('path')
const fs = require('fs')

// const home = require('./home')
const user = require('./user')
const admin = require('./admin')
const house = require('./house')
const task = require('./task')
// const error = require('./error')

// router.use('/', home.routes(), home.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/house', house.routes(), house.allowedMethods())
router.use('/task', task.routes(), task.allowedMethods())
// router.use('/error', error.routes(), error.allowedMethods())
//解决前端路由刷新404问题
router.get('/:other',async (ctx, next) => {
  let filePath=path.join(__dirname , '..','..','build','index.html')
  ctx.type='html'
  ctx.body=fs.createReadStream(filePath);
})
module.exports = router