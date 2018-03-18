/**
 * Created by So on 2018/3/16.
 */
const _=require('lodash')
const task=require('./task')
const uuid = require('uuid/v1')
const dbConn = require('../models/index')
const utils = require('../lib/utils')
const UserModel = dbConn.model('User')

exports.getUsers=async (ctx)=>{
  ctx={a:1}
}
exports.subscribe=async (ctx)=>{
  let username=ctx.request.body.username||''
  let email=ctx.request.body.email||''
  let publishTime=ctx.request.body.publishTime||[]
  let citys=ctx.request.body.citys||[]
  let websites=ctx.request.body.websites||[]
  let areaRange=ctx.request.body.areaRange||{from:50,to:200}
  if(username===''||email===''||_.isEmpty(publishTime)||
    _.isEmpty(citys)||_.isEmpty(websites)){
    ctx.body={
      status:'error',
      data:ctx.request.body
    }
    return
  }
  let subscribeInfo={
    id:uuid(),
    username,
    email,
    citys,
    websites,
    areaRange,
    crontab:utils.timeListToCron(publishTime)
    }
  let userModel=new UserModel(subscribeInfo)
  await userModel.save()
  task.addTask(subscribeInfo)
  ctx.body={
    status:'success',
    data:subscribeInfo
  }
}