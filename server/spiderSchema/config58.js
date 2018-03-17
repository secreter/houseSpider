/**
 * Created by So on 2018/3/10.
 */
const config58 = {
  seed: 'http://tj.58.com/shangpucz/pn1/?sourcetype=5&area=3000_%2A&sq=1',
  urlSchema: {
    selector: 'a[href]', // 链接所在元素selector
    attribute: 'href', // 链接所在元素属性
    url: [
      {
        regex:
          'http:\\/\\/tj.58.com\\/shangpucz\\/pn[0-1]+\\/\\?sourcetype=5&area=3000_%2A&sq=1',
        go: true // 翻两页
      },
      {
        regex: 'http:\\/\\/tj.58.com\\/shangpu\\/.+\\.shtml', // 普通
        go: false
      },
      {
        regex: 'http:\\/\\/jxjump\\.58\\.com\\/service\\?target=.+', // 精品
        go: false
      },
      {
        regex: 'http:\\/\\/short\\.58\\.com\\/zd_p\\/.+\\/\\?target=', // 置顶
        go: false
      }
    ]
  },
  dataSchema: {
    root: 'html',
    data: [
      {
        name: 'title',
        selector: 'body > div.main-wrap > div.house-title > h1',
        callback: text => {
          return 'success:' + text
        }
      },
      {
        name: 'price_month',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > p.house_basic_title_money > span.house_basic_title_money_num'
      },
      {
        name: 'picture',
        selector: '#smainPic',
        attribute: 'src'
      },
      {
        name: 'price_day',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > p.house_basic_title_money > span.house_basic_title_money_num_chuzu'
      },
      {
        name: 'price',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > p.house_basic_title_money'
      },
      {
        name: 'area',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(1) > span.house_basic_title_content_item2'
      },
      {
        name: 'miankuan',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(2) > span.house_basic_title_content_item2'
      },
      {
        name: 'jingsheng',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(3) > span.house_basic_title_content_item2'
      },
      {
        name: 'cengao',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(4) > span.house_basic_title_content_item2'
      },
      {
        name: 'loucen',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(5) > span.house_basic_title_content_item2'
      },
      {
        name: 'address',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(6)'
      },
      {
        name: 'type',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(1) > a'
      },
      {
        name: 'status',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(2) > span.house_basic_title_content_item3'
      },
      {
        name: 'history',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(3) > span.house_basic_title_content_item3'
      },
      {
        name: 'payWay',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(4) > span.house_basic_title_content_item3'
      },
      {
        name: 'rentWay',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > ul > li:nth-child(5) > span.house_basic_title_content_item3'
      },
      {
        name: 'connectPerson',
        selector:
          'body > div.main-wrap > div.house-basic-info.clearfix > div.house-basic-right.fr > div.house_basic_jingji > p > span'
      },
      {
        name: 'phoneNumber',
        selector: '#houseChatEntry > div > p.phone-num'
      },
      {
        name: 'desc',
        selector: '#generalSound > div'
      },
      {
        name: 'time',
        selector:
          'body > div.main-wrap > div.house-title > p > span:nth-child(1)'
      }
    ]
  }
}
module.exports = config58
