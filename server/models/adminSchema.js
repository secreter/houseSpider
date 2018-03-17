/**
 * Created by So on 2018/3/17.
 */
const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema(
  {
    id: String,
    username: String,
    password: String,
    time: String
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
    }
  }
)
//db.getCollection('anjukes').find({created:{$gte:ISODate('2018-03-11')}})
module.exports = AdminSchema
