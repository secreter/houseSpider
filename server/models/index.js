/**
 * Created by So on 2018/3/17.
 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('../config');
const AdminSchema = require('./adminSchema');
const HouseSchema = require('./houseSchema');
// 核心代码，是否开启测试
mongoose.set('debug', true)
const dbConn = mongoose.createConnection(config.mongodb.db)
dbConn.on('error', function (err) {
  console.error(
    'mongodb createTaskdbConnection error: ' +
    err +
    ', url: ' +
    config.mongodb.db
  )
})
dbConn.model('Admin', AdminSchema)
dbConn.model('House', HouseSchema)
module.exports = dbConn
