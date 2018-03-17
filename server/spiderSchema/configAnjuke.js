/**
 * Created by So on 2018/3/10.
 */
const configAnjuke = {
  seed: 'https://tj.sp.anjuke.com/zu/from_area3000-p1/',
  urlSchema: {
    selector: 'div[link]', // 链接所在元素selector
    attribute: 'link',
    url: [
      {
        regex: 'https:\\/\\/tj\\.sp\\.anjuke\\.com\\/zu\\/[0-9]+\\/'
      }
    ]
  },
  dataSchema: {
    root: 'html',
    data: [
      {
        name: 'title',
        selector: '#content > div > h1'
      },
      {
        name: 'price',
        selector: '#content > div > div'
      },
      {
        name: 'price_month',
        selector: '#content > div > div > span.price-tag'
      },
      {
        name: 'area',
        selector: '#fy_info > ul > li.litem > span.desc'
      },
      {
        name: 'picture',
        attribute: 'src',
        selector:
          '#picMove > div > div > li.slick-slide.slick-current.slick-active > a > img'
      },
      {
        name: 'jingsheng',
        selector: '#fy_info > ul > li:nth-child(7) > span.desc'
      },
      {
        name: 'qizhuqi',
        selector: '#fy_info > ul > li:nth-child(10) > span.desc'
      },
      {
        name: 'address',
        selector: '#fy_info > ul > li:nth-child(13) > span.desc.addresscommu'
      },
      {
        name: 'zhuanrangfei',
        selector: '#fy_info > ul > li:nth-child(2) > span.desc'
      },
      {
        name: 'miankuan',
        selector: '#fy_info > ul > li:nth-child(5) > span.desc'
      },
      {
        name: 'loucen',
        selector: '#fy_info > ul > li:nth-child(8) > span.desc'
      },
      {
        name: 'mianzhuqi',
        selector: '#fy_info > ul > li:nth-child(14) > span.desc'
      },
      {
        name: 'wuyefei',
        selector: '#fy_info > ul > li:nth-child(3) > span.desc'
      },
      {
        name: 'cengao',
        selector: '#fy_info > ul > li:nth-child(6) > span.desc'
      },
      {
        name: 'status',
        selector: '#fy_info > ul > li:nth-child(9) > span.desc'
      },
      {
        name: 'payWay',
        selector: '#fy_info > ul > li:nth-child(12) > span.desc'
      },
      {
        name: 'type',
        selector: '#fy_info > ul > li:nth-child(15) > span.desc'
      },
      {
        name: 'connectPerson',
        selector:
          '#content > div > em > div.mainbox.clearfix > div.rt-box > div.broker_info.clearfix > div.bro-info.clearfix > h5'
      },
      {
        name: 'phoneNumber',
        selector:
          '#content > div > em > div.mainbox.clearfix > div.rt-box > div.broker_tel'
      },
      {
        name: 'desc',
        selector: '#xzl_desc > div'
      }
    ]
  }
}
module.exports = configAnjuke
