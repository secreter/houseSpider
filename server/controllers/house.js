/**
 * Created by So on 2018/3/17.
 */
const uuid = require('uuid/v1')
const dbConn = require('../models/index')
const utils = require('../lib/utils')
const HouseModel = dbConn.model('House')

const insertData = async (dataList) => {
  for(let i=0;i<dataList.length;i++){
    let model = new HouseModel({
      id: uuid(),
      ...dataList[i]
    })
    await model.save()
  }
}

const getDataList = async ( limit = 300,offset=0,filter={}) => {
  let dataList = await HouseModel.find(filter)
    .sort({ _id: -1 }) // sort方法只能传String或者Object,_id前4个字节是时间戳
    .skip(offset)
    .limit(limit)
    .exec()
  return dataList
}
const getData=async (ctx)=>{
  const query=ctx.request.body
  let limit=query.limit||10
  let offset=query.offset||0
  console.log(query)
  let filter = {}
  if (query.city) {
    filter.city = new RegExp(utils.escapeStringRegExp(query.city))
  }
  let dataList=await getDataList(limit,offset,filter)
  let total =await HouseModel.find(filter).count()
  ctx.body= {
    status:'success',
    data:{
      total,
      list:dataList
    }
  }
}
module.exports={
  insertData,
  getDataList,
  getData
}
