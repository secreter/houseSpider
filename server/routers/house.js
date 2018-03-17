/**
 * Created by So on 2018/3/17.
 */
const router = require('koa-router')()
const houseController = require('./../controllers/house')

const routers = router
  .post('/getData', houseController.getData)

module.exports = routers