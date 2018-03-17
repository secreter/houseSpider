/**
 * Created by So on 2018/3/17.
 */
const puppeteer = require('puppeteer')
const utils = require('../lib/utils')
const emailController = require('../controllers/email')
const Spider = require('../lib/Spider')
const houseController = require('../controllers/house')
const config58 = require('../spiderSchema/config58')
const configAnjuke = require('../spiderSchema/configAnjuke')
const configGangjiwang = require('../spiderSchema/configGangjiwang')
// configAnjuke 在ubuntu下报Error: net::ERR_TOO_MANY_REDIRECTS
// const schemas = [config58, configGangjiwang, configAnjuke]
const schemas = [ configAnjuke]
const main = async () => {
  let browser = await puppeteer.launch({ headless: false })
  let page = await browser.newPage()
  let spider = new Spider(page)
  let sendList = [] // 新增的信息发送邮件
  // let dataList = await spider.start(config_58)
  // length-1 跳过安居客
  for (let i = 0; i < schemas.length ; i++) {
    let dataList = await spider.start(schemas[i])

    let oldDataList = await houseController.getDataList(i)
    let newDataList = utils.uniqueDataList(dataList, oldDataList)
    console.log('dataList.length:', dataList.length)
    await houseController.insertData(newDataList, i)
    console.log('newDataList.length:', newDataList.length)
    sendList = sendList.concat(newDataList)
    console.log('i', i)
  }
  // sendList = sendList.filter(item => {
  //   // 描述里带酒店、公寓的
  //   return /酒店|公寓/.test(item.desc)
  // })
  // console.log(sendList)
  if (sendList.length > 0) {
    await emailController.sendTest(sendList)
  }
  await browser.close()
}
main()
  .then(() => {
    process.exit()
  })
  .catch(e => {
    console.log('catch')
    console.error(e)
    process.exit() // 异常退出
  })

// module.exports = Spider
