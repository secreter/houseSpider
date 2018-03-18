/**
 * Created by So on 2018/3/16.
 */
const _=require('lodash')
const task=require('./task')
const uuid = require('uuid/v1')
const dbConn = require('../models/index')
const utils = require('../lib/utils')
const {removeJob} = require('../controllers/task')
const UserModel = dbConn.model('User')

exports.getUsers=async (ctx)=>{
  const query=ctx.request.body
  let limit=query.limit||10
  let offset=query.offset||0
  let userList = await UserModel.find({})
    .sort({ _id: -1 }) // sort方法只能传String或者Object,_id前4个字节是时间戳
    .skip(offset)
    .limit(limit)
    .exec()
  let total =await UserModel.find().count()
  ctx.body={
    status:'success',
    data:{
      list:userList,
      total
    }
  }
}
exports.deleteUser=async (ctx)=>{
  let id=ctx.request.body.id
  let user=await UserModel.findOne({id})||{}
  let isSuccess=await removeJob(user.jobId)
  let result=await UserModel.remove({id})
  ctx.body={
    status:'success',
    data:{
      remove:isSuccess,
      result
    }
  }
}
exports.subscribe=async (ctx)=>{
  let username=ctx.request.body.username||''
  let email=ctx.request.body.email||''
  let publishTime=ctx.request.body.publishTime||[]
  let citys=ctx.request.body.citys||[]
  let websites=ctx.request.body.websites||[]
  let areaRange=ctx.request.body.areaRange||{from:50,to:200}
  areaRange.from=areaRange.from||0
  areaRange.to=areaRange.to||99999
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
    subscribeTime:publishTime,
    jobId:'',                      //添加job 的时候加上
    crontab:utils.timeListToCron(publishTime)
    }
  await task.addTask(subscribeInfo)
  let userModel=new UserModel(subscribeInfo)
  await userModel.save()

  ctx.body={
    status:'success',
    data:subscribeInfo
  }
}