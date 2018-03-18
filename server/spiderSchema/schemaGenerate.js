/**
 * Created by So on 2018/3/18.
 */
const cityMap=require('./cityMap')
const config58=require('./config58')
const configGanjiwang=require('./configGangjiwang')
const _=require('lodash')

//['beijing'],加上网站、城市属性
const schema58List=(citys)=>{
  return citys.map(city=>{
    let shortCity=cityMap[city]
    let newConfig58=_.cloneDeep(config58)
    newConfig58.city=city        //这个是动态加的
    newConfig58.website='house58'        //这个是动态加的
    newConfig58.interval=8000        //这个是动态加的
    newConfig58.seed=`http://${shortCity}.58.com/shangpucz/pn1/`
    newConfig58.urlSchema.url[0].regex=`http:\\/\\/${shortCity}.58.com\\/shangpucz\\/pn[0-2]+\\/\\?.*`
    newConfig58.urlSchema.url[1].regex=`http:\\/\\/${shortCity}.58.com\\/shangpu\\/.+\\.shtml`
    return newConfig58
  })
}
const schemaGanjiwangList=(citys)=>{
  return citys.map(city=>{
    let shortCity=cityMap[city]
    let newConfigGanjiwang=_.cloneDeep(configGanjiwang)
    newConfigGanjiwang.city=city        //这个是动态加的
    newConfigGanjiwang.website='ganjiwang'        //这个是动态加的
    newConfigGanjiwang.interval=8000        //这个是动态加的
    newConfigGanjiwang.seed=`http://${shortCity}.ganji.com/fang6/c2/`
    newConfigGanjiwang.urlSchema.url=[
      {
        regex: `http:\\/\\/${shortCity}\\.ganji\\.com\\/fang6\\/o[2-3]c2\\/$`,
        go: true
      },
      {
        regex: `http:\\/\\/${shortCity}\\.ganji\\.com\\/fang6\\/[0-9a-z]+\\.htm`
      }
  ]
    return newConfigGanjiwang
  })
}


module.exports={
  schema58List,
  schemaGanjiwangList
}