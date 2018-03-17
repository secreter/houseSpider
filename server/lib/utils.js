/**
 * Created by So on 2018/3/8.
 */
/**
 * 工场函数，根据选择器和返回的属性来生成方法
 * 方法可获取页面上所有的指定选择器元素上的url
 * @param selector
 * @param attribute
 */
const getPageUrlsFnGenerator = (selector, attribute) => async (
  page,
  deepth = 0
) => {
  /*
  page的所有方法都在另一个子进程里，无法传递一个方法进去，于是定义方法就定义在子进程内
   */
  // todo 应该默认a.herf都要，配置的只是而外项
  let urlList = await page.evaluate(
    (selector, attribute, deepth) => {
      let eles = document.querySelectorAll(selector)
      // console.log(eles)
      eles = [...eles]
      let urls = eles.map(ele => {
        return {
          url: attribute === 'href' ? ele.href : ele.getAttribute(attribute), // 获取的元素链接，有的在data-link,link上，有的在href
          deepth // 爬取深度
        }
      })
      // 必须保证获取到的链接是一个合法的url
      urls.filter(item => {
        return /^http(s):\/\/.+/.test(item.url)
      })

      return urls
    },
    selector,
    attribute,
    deepth
  )
  return urlList
}

const getPageAHrefs = getPageUrlsFnGenerator('a[href]', 'href')
const getPageEleLinks = getPageUrlsFnGenerator('[link]', 'link')

/**
 * 根据正则表达式过滤url
 * @param list
 * @param regex
 * @param getKey
 */
const filterUrls = (list, regex, getKey = x => x) => {
  let reg = new RegExp(regex)
  return list.filter(item => {
    return reg.test(getKey(item))
  })
}
/**
 * 休眠
 * @param ms
 * @returns {Promise}
 */
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 去重，抓到的数据里，和数据库前30条数据对比，
 * _url相同的表示之前抓过，不再抓取
 * @param dataList
 * @param oldDataList
 */
const uniqueDataList = (dataList, oldDataList) => {
  return dataList.filter(data => {
    console.log(data._url)
    return !oldDataList.some(item => {
      if (item._url === data._url) {
        console.log(item._url, data._url)
      }
      // 有的地址有时间戳什么的，这时用title和address判断
      return (
        item._url === data._url ||
        (item.title === data.title && item.address === data.address)
      )
    })
  })
}
const timetrans = () => {
  let date = new Date()
  let Y = date.getFullYear() + '-'
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

module.exports = {
  getPageUrlsFnGenerator,
  getPageAHrefs,
  getPageEleLinks,
  filterUrls,
  uniqueDataList,
  timetrans,
  sleep
}
