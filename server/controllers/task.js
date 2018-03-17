/**
 * Created by So on 2018/3/17.
 */
const Queue = require('bull')
const config = require('../config')
const dbConn = require('../models/index')
const queue = new Queue('send task', config.redis.db)
const HouseModel = dbConn.model('House')
queue.process(function(job) {
  console.log('hello job')
  return Promise.resolve()
})
queue.process('aa',function(job) {
  console.log('hello job2')
  return Promise.resolve()
})
queue.add({a:1},{
  repeat: {cron: '15 3 * * *'}
})