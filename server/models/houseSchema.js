/**
 * Created by So on 2018/3/17.
 */
/**
 * Created by So on 2018/3/10.
 */
const mongoose = require('mongoose')
const HouseSchema = new mongoose.Schema(
  {
    id: String,
    _url: String,
    city:String,
    title: String,
    price: String,
    price_month: String,
    price_day: String,
    picture: String,
    area: String,
    miankuan: String,
    jingsheng: String,
    cengao: String,
    loucen: String,
    address: String,
    type: String,
    status: String,
    history: String,
    payWay: String,
    rentWay: String,
    connectPerson: String,
    phoneNumber: String,
    desc: String,
    qizhuqi: String,
    mianzhuqi: String,
    wuyefei: String,
    zhuanrangfei: String,
    time: String
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
  }
)
module.exports = HouseSchema
