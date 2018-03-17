/**
 * Created by So on 2018/3/10.
 */
const uuid = require('uuid/v1')
const dbConn = require('../model/index')
const House58Model = dbConn.model('House58')
const AnjukeModel = dbConn.model('Anjuke')
const GangjiwangModel = dbConn.model('Gangjiwang')
const collections = {
  0: House58Model,
  1: GangjiwangModel,
  2: AnjukeModel
}

exports.insertData = (dataList, index) => {
  let Model = collections[index]
  dataList.forEach(data => {
    let model = new Model({
      id: uuid(),
      ...data
    })
    model.save()
  })
}

exports.getDataList = async (index, limit = 1000) => {
  let Model = collections[index]
  let dataList = await Model.find()
    .sort({ _id: -1 }) // sort方法只能传String或者Object,_id前4个字节是时间戳
    .limit(limit)
    .exec()
  return dataList
}
