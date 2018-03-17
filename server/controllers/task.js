/**
 * Created by So on 2018/3/17.
 */
const Queue = require('bull')
const config = require('../config')
const dbConn = require('../models/index')
const {sendEmail} = require('../controllers/email')
const queue = new Queue('send task', config.redis.db)
const HouseModel = dbConn.model('House')

const emailNewInfo=async ()=>{
  const mailOptions={
    from: `"test 👻" <${account.user}>`, // sender address
    to: config.emailTo, // list of receivers
    bcc: config.emailBcc, // 抄送
    subject: `通知--${time}`, // Subject line
    text: '这是一封测试邮件。', // plain text body
  }
  await sendEmail(mailOptions)
}
// queue.getJobCounts()
exports.initQueue=async ()=>{
  queue && queue.on("error", function (err) {
    console.log("timerJob queue Error " + err);
  });
  queue.process(function(job) {
    console.log('hello job')
    return Promise.resolve()
  })
  queue.process('aa',function(job) {
    console.log('hello job2')
    return Promise.resolve()
  })
  queue.add({a:1},{
    repeat: {cron: '*/1 * * * *'}
  })
}