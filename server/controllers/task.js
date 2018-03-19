/**
 * Created by So on 2018/3/17.
 */
const Queue = require('bull')
const _ = require('lodash')
const config = require('../config')
const parser = require('cron-parser');
const {sendEmail} = require('../controllers/email')
const {getDataList} = require('../controllers/house')
const queue = new Queue(config.redis.bullQueueName, config.redis.db)


const emailNewInfo = async (subscribeInfo) => {
  const mailOptions = {
    from: `"房源信息订阅通知 👻" <${config.emailAccounts.user}>`, // sender address
    to: subscribeInfo.email,   // list of receivers
    bcc: config.emailBcc, // 抄送
    subject: `${subscribeInfo.citys.join('、')}房源更新`, // Subject line
    text: '这是一封重要邮件。', // plain text body
  }
  let interval = null
  try {
    interval = parser.parseExpression(subscribeInfo.crontab)
    interval.prev()  //最近一个上一个就是当前这个
  } catch (err) {
    console.log('Error: ' + err.message);
  }
  let cityReg=subscribeInfo.citys.join('|')
  let websiteReg=subscribeInfo.websites.join('|')
  let sourceTypeReg=undefined
  if(subscribeInfo.sourceTypes){
    sourceTypeReg=subscribeInfo.sourceTypes.join('|')
  }
  let createdRange={
    $gte:new Date(interval.prev().toString()),
    // $lte:new Date(parser.parseExpression(subscribeInfo.crontab).next().toString()),
  }
  let dataList = await getDataList(30,0,{
    city:new RegExp(cityReg),
    website:new RegExp(websiteReg),
    sourceType:sourceTypeReg===undefined?undefined:new RegExp(sourceTypeReg),
    areaNumber:{
      $gte:subscribeInfo.areaRange.from||0,
      $lte:subscribeInfo.areaRange.to||99999,
    },
    created:createdRange
  })
  console.log(dataList)
  if(!_.isEmpty(dataList)){
    await sendEmail(mailOptions, dataList)
  }
}
// queue.getJobCounts()
const initQueue = async () => {
  queue && queue.on("error", function (err) {
    console.log("timerJob queue Error " + err);
  });
  queue.process(function (job,done) {
    console.log('hello job', job.data)
    emailNewInfo(job.data).then(()=>{
      done('success')
      console.log('success:',job.data.email)
    }).catch(e=>{
      console.log(e)
      done('error')
    })
  })
}
const addTask = async (subscribeInfo) => {
  let job=await queue.add(subscribeInfo, {
    attempts:3, //失败后重试次数
    repeat: {
      cron: subscribeInfo.crontab
    },
    //重复任务依赖自定义id，无法覆盖
    // jobId:subscribeInfo.id,
  })
  subscribeInfo.jobId=job.id       //添加任务id
  console.log(job.id,)
}
const getJob=async (ctx)=>{
  let jobId=ctx.query.id
  let job=await queue.getJob(jobId)
  ctx.body={
    status:'success',
    data:job
  }
}
const removeJob=async (id)=>{
  let job=await queue.getJob(id)
  if(job){
    await job.remove()
    return true
  }else{
    return false
  }
}
const getDelayed=async (ctx)=>{
  let jobs=await queue.getDelayed()
  ctx.body={
    status:'success',
    data:jobs
  }
}
const getWaiting=async (ctx)=>{
  let jobs=await queue.getWaiting()
  ctx.body={
    status:'success',
    data:jobs
  }
}

const getFailed=async (ctx)=>{
  let jobs=await queue.getFailed()
  ctx.body={
    status:'success',
    data:jobs
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
  getJob,
  removeJob,
  getDelayed,
  getWaiting,
  getFailed
}