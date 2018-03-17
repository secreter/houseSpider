/**
 * Created by So on 2018/3/16.
 */
const AdminModel=require('../models').model('Admin')
const _=require('lodash')
exports.getAdmins=async (ctx)=>{
  let username=ctx.request.body.username
  let password=ctx.request.body.password
  let result=await AdminModel.find({username,password})
  if(_.isEmpty(result)){
    ctx.body={
      status:'error',
      data:'用户不存在'
    }
  }else{
    ctx.body={
      status:'success',
      data:{
        username
      }
    }
  }
}