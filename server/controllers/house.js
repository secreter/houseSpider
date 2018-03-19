/**
 * Created by So on 2018/3/17.
 */
const uuid = require('uuid/v1')
const dbConn = require('../models/index')
const utils = require('../lib/utils')
const HouseModel = dbConn.model('House')

const insertDataList = async (dataList) => {
  let insertNum=0
  for(let i=0;i<dataList.length;i++){
    let result = await HouseModel.update({
      _url:dataList[i]._url,
    },{
      $setOnInsert:{
        id: uuid(),
        ...dataList[i]
      }
    },{
      upsert:true   //whether to create the doc if it doesn't match (false)
    })
    console.log(result)
    insertNum+=result.n
  }
  console.log(`total: ${dataList.length},insert: ${insertNum}`)
}

/**
 * 用_url作为key,没有的数据才插入数据库
 * @param data
 * @returns {Promise.<void>}
 */
const insertData=async(data)=>{
  /**
   db.collection.update(
   <query>,
   { $setOnInsert: { <field1>: <value1>, ... } },
   { upsert: true }
   )
   */
  let result = await HouseModel.update({
    _url:data._url,
  },{
    id: uuid(),
    data
  })
  console.log(result)
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
  insertDataList,
  getDataList,
  getData
}
