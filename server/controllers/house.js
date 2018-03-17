/**
 * Created by So on 2018/3/17.
 */
const uuid = require('uuid/v1')
const dbConn = require('../models/index')
const HouseModel = dbConn.model('House')

exports.insertData = async (dataList) => {
  for(let i=0;i<dataList.length;i++){
    let model = new HouseModel({
      id: uuid(),
      ...dataList[i]
    })
    await model.save()
  }
}

exports.getDataList = async (index, limit = 300) => {
  let dataList = await HouseModel.find()
    .sort({ _id: -1 }) // sort方法只能传String或者Object,_id前4个字节是时间戳
    .limit(limit)
    .exec()
  return dataList
}
