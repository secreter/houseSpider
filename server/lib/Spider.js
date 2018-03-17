/**
 * Created by pengchaoyang on 2018/3/9
 */
const utils = require('./utils')
const Queue = require('./Queue')

class Spider {
  constructor (page) {
    this.page = page
    this.seed = null
    this.interval = null
    this.maxDeepth = null
    this.queue = null
    this.historySet = null // 记录爬过的url
  }

  /**
   * 通过传递一个配置项，初始化spider并阻塞式执行
   * @param config
   * @returns {Promise.<Array>}
   */
  async start (config) {
    this.seed = config.seed
    this.interval = config.interval || 4000
    this.maxDeepth = config.maxDeepth || 3
    this.queue = new Queue(true, item => item.url)
    this.historySet = new Set() // 记录爬过的url
    let dataList = []
    console.log('start from: ', this.seed)
    this.getPageUrls = utils.getPageUrlsFnGenerator(
      config.urlSchema.selector || 'a[href]',
      config.urlSchema.attribute || 'href'
    )
    await this.spideUrls(config.urlSchema.url || [])
    dataList = await this.spideData(config.dataSchema || {})
    return dataList
  }

  /**
   * 从种子开始，爬取需要爬的数据的url
   * 暂时设计为同步执行的，先爬完所有url再开始爬data
   * @param regexList
   * @param deepth
   * @param link
   * @returns {Promise.<*>}
   */
  async spideUrls (regexList = [], deepth = 0, link = this.seed) {
    if (deepth > this.maxDeepth) return []
    await this.page.goto(link, { timeout: 0 })
    // 休眠，反爬虫，同时为了加载完成
    await utils.sleep(this.interval)
    // 爬取页面所有urls
    let urls = await this.getPageUrls(this.page, deepth)
    // 根据正则过滤urls
    let filtedUrls = regexList.reduce((accumulator, item) => {
      return accumulator.concat(utils.filterUrls(urls, item.regex, x => x.url))
    }, [])
    filtedUrls.forEach(item => {
      this.push(item)
    })
    // 根据正则寻找需要继续爬的urls
    let nextGoUrls = regexList.reduce((accumulator, item) => {
      if (item.go === true) {
        // 从队列中获取并删除
        return accumulator.concat(this.queue.getList(item.regex, true))
      } else {
        return accumulator
      }
    }, [])
    // 保证同步执行
    for (let i = 0; i < nextGoUrls.length; i++) {
      await this.spideUrls(regexList, deepth++, nextGoUrls[i].url)
    }
    console.log('queue: ', this.queue.length)
    this.queue.getList()
    return this.queue
  }

  async spideData (schema) {
    let urlItem = null
    // let i = 0
    let dataList = []
    while ((urlItem = this.pop())) {
      // if (i++ > 2) break
      console.log('queue: ', this.queue.length)
      await this.page.goto(urlItem.url, { timeout: 0 })
      await utils.sleep(this.interval)
      let data = await this.page.evaluate(
        (schema, urlItem) => {
          let json = {}
          json['_url'] = urlItem.url
          schema.data.forEach(node => {
            let ele = document.querySelector(node.selector)
            if (ele === null) {
              json[node.name] = null
              return
            }
            if (node.attribute) {
              json[node.name] = ele.getAttribute(node.attribute)
            } else {
              json[node.name] = ele.innerText
            }
          })
          return json
        },
        schema,
        urlItem
      )
      dataList.push(data)
    }
    return dataList
  }

  /**
   * 不能直接用this.queue.push(item)，
   * 需要一个记录爬取历史的集合，爬过的不再爬，用url当集合值
   * @param item
   */
  push (item) {
    if (this.historySet.has(item.url)) {
      return
    }
    this.historySet.add(item.url)
    this.queue.push(item)
  }
  pop () {
    return this.queue.pop()
  }
}
module.exports = Spider
