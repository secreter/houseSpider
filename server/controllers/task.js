/**
 * Created by So on 2018/3/17.
 */
const Queue = require('bull')
const config = require('../config')
const dbConn = require('../models/index')
const {sendEmail} = require('../controllers/email')
const queue = new Queue('send task', config.redis.db)
const HouseModel = dbConn.model('House')
const UserModel = dbConn.model('User')

const emailNewInfo = async () => {
  const mailOptions = {
    from: `"test 👻" <${config.emailAccounts.user}>`, // sender address
    to: config.emailTo, // list of receivers
    bcc: config.emailBcc, // 抄送
    subject: `通知`, // Subject line
    text: '这是一封测试邮件。', // plain text body
  }
  let dataList = [{title: 'hhhhh'}]
  await sendEmail(mailOptions, dataList)
}
// queue.getJobCounts()
const initQueue = async () => {
  queue && queue.on("error", function (err) {
    console.log("timerJob queue Error " + err);
  });
  queue.process(function (job) {
    console.log('hello job', job.data)
    // emailNewInfo()
    return Promise.resolve()
  })
  queue.process('aa', function (job) {
    console.log('hello job2')
    return Promise.resolve()
  })
  // queue.add({a:1},{
  //   repeat: {cron: '*/1 * * * *'}
  // })
}
const addTask = async (subscribeInfo) => {
  queue.add(subscribeInfo, {
    jobId:subscribeInfo.id,
    repeat: {cron: subscribeInfo.crontab}
  })
}
const getJob=async (ctx)=>{
  let jobId=ctx.query.id
  console.log(ctx.query)
  let job=await queue.getJob(jobId)
  ctx.body={
    status:'success',
    data:job
  }
}
/**
 * 清除所有任务，慎用
 * @returns {Promise.<void>}
 */
const clearTask=async ()=>{
  await queue.empty()
}
const getTaskInfo = async (ctx) => {
  ctx.body = {
    jobCounts: await queue.getJobCounts()
  }
}

initQueue().then(data => {
  // clearTask().then(()=>{
  //
  // }).catch(e=>{
  //
  // })
}).catch(e => {
  console.log(e)
})
module.exports = {
  initQueue,
  addTask,
  getTaskInfo,
  getJob
}