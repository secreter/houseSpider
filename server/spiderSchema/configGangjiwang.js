/**
 * Created by So on 2018/3/10.
 */
const configGangjiwang = {
  seed: 'http://tj.ganji.com/fang6/m3000z99999o2/',
  urlSchema: {
    selector: 'a[href]', // 链接所在元素selector
    attribute: 'href',
    url: [
      {
        regex: 'http:\\/\\/tj\\.ganji\\.com\\/fang6\\/[0-9a-z]+\\.htm'
      }
    ]
  },
  dataSchema: {
    root: 'html',
    data: [
      {
        name: 'title',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > p > i'
      },
      {
        name: 'price',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > div.er-card-pay > div.price-wrap > span'
      },
      {
        name: 'area',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(1) > span.content'
      },
      {
        name: 'payWay',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(2) > span.content'
      },
      {
        name: 'rentWay',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(4) > span.content'
      },
      {
        name: 'type',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(8) > span.content > a'
      },
      {
        name: 'status',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(10) > span.content'
      },
      {
        name: 'history',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(12) > span.content'
      },
      {
        name: 'miankuan',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(3) > span.contentv'
      },
      {
        name: 'jingsheng',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(5) > span.content'
      },
      {
        name: 'cengao',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list.f-clear > li:nth-child(7) > span.content'
      },
      {
        name: 'address',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-top > ul.er-list-two.f-clear > li > span.content'
      },
      {
        name: 'connectPerson',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-info.f-fr > div.card-user > div > div > p'
      },
      {
        name: 'phoneNumber',
        selector: '#full_phone_show > div.phone > a'
      },
      {
        name: 'picture',
        attribute: 'src',
        selector:
          '#f_detail > div:nth-child(5) > div.f-card.f-w1190.f-clear.f-b30 > div.card-img.f-fl.js-basic-imgs-big.basic-imgs > div > div.big-img > div.big-img-wrap > img'
      },
      {
        name: 'desc',
        selector: '#js-house-describe > div > div'
      }
    ]
  }
}
module.exports = configGangjiwang
