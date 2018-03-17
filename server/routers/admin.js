/**
 * Created by So on 2018/3/16.
 */

const router = require('koa-router')()
const adminController = require('./../controllers/admin')

const routers = router
  .post('/getAdmin', adminController.getAdmins)

module.exports = routers