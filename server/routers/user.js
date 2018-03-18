/**
 * Created by So on 2018/3/16.
 */
/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('../controllers/user')

const routers = router
  .post('/getUser', userController.getUsers)
  .post('/subscribe', userController.subscribe)
  .post('/deleteUser', userController.deleteUser)

module.exports = routers