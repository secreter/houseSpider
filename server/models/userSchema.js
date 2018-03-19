/**
 * Created by So on 2018/3/18.
 */
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
  {
    id: String,
    username: String,
    websites: Array,
    sourceTypes: Array,
    email: Array,
    citys: Array,
    areaRange: {
      from:Number,
      to:Number
    },
    subscribeTime:Array,
    remark:String,
    jobId:String,
    crontab: String       // * * * * *
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
  }
)
//db.getCollection('anjukes').find({created:{$gte:ISODate('2018-03-11')}})
module.exports = UserSchema
