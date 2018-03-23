/**
 * Created by So on 2018/3/17.
 */
const puppeteer = require('puppeteer')
const Spider = require('../lib/Spider')
const config = require('../config')
const utils = require('../lib/utils')
const houseController = require('../controllers/house')
const {schema58List,schemaGanjiwangList,getSchemas} = require('../spiderSchema/schemaGenerate')
const config58 = require('../spiderSchema/config58')
const configAnjuke = require('../spiderSchema/configAnjuke')
const configGangjiwang = require('../spiderSchema/configGangjiwang')
// configAnjuke 在ubuntu下报Error: net::ERR_TOO_MANY_REDIRECTS
let userAgent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36'
let schemas = [ configAnjuke]
const CITYS=['beijing','tianjin']
const main = async () => {
  let browser = await puppeteer.launch({
    // slowMo:2000,               //Slows down Puppeteer operations by the specified amount of milliseconds
    // devtools:true,              //auto-open a DevTools panel
    ignoreHTTPSErrors:true,      // ignore HTTPS errors
    headless: true
  })
  let page = await browser.newPage()
  page.setUserAgent(userAgent)
  let spider = new Spider(page)
  // let dataList = await spider.start(config_58)
  // length-1 跳过安居客
  //几个网站交叉爬，避免过于频繁
  schemas=getSchemas(CITYS)
  for (let i = 0; i < schemas.length ; i++) {
    let dataList = await spider.start(schemas[i])
    await houseController.insertDataList(dataList)
    console.log('i', i)
  }
  console.log(new Date())
  utils.sleep(config.closeDelay)
  await browser.close()
}
main()
  .then(() => {
    process.exit()
  })
  .catch(e => {
    console.log('catch')
    console.error(e)
    process.exit(1) // 异常退出
  })

