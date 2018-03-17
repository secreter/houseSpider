/**
 * Created by So on 2018/3/16.
 */
/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('../controllers/user')

const routers = router
  .get('/user/getUserInfo.json', userController.getUsers)
  // .post('/user/signIn.json', userController.getUsers)
  // .post('/user/signUp.json', userController.getUsers)

module.exports = routers