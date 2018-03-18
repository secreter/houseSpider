/**
 * Created by So on 2018/3/17.
 */

const router = require('koa-router')()
const taskController = require('../controllers/task')

const routers = router
  .get('/getTaskInfo', taskController.getTaskInfo)
  .get('/getJob', taskController.getJob)
// .post('/user/signUp.json', userController.getUsers)

module.exports = routers