/**
 * Created by So on 2018/3/18.
 */
const _=require('lodash')
const cityMap=require('./cityMap')
const config58=require('./config58')
const configGanjiwang=require('./configGangjiwang')

//['beijing'],加上网站、城市属性
const schema58List=(citys)=>{
  //配置不同城市的schema
  let schemasForCity= citys.map(city=>{
    let shortCity=cityMap[city]
    let newConfig58=_.cloneDeep(config58)
    newConfig58.dataSchema.params={
      city:city,
      website:'house58'
    }        //这个是动态加的
    newConfig58.interval=8000        //这个是动态加的
    // newConfig58.seed=`http://${shortCity}.58.com/shangpucz/pn1/`
    newConfig58.seed=`http://${shortCity}.58.com/shangpucz/`
    newConfig58.urlSchema.url[0].regex=`http:\\/\\/${shortCity}.58.com\\/shangpucz\\/pn[0-1]+\\/\\?.*`
    newConfig58.urlSchema.url[1].regex=`http:\\/\\/${shortCity}.58.com\\/shangpu\\/.+\\.shtml`
    return newConfig58
  })

  //配置不同房源类型的schema（个人、中介）{0:个人房源，1:经纪人房源}
  let sourceMap={
    0:'personal',
    1:'agent'
  }
  let schemaForSourceType=[0,1].map(key=>{
    return schemasForCity.map(schema=>{
      let newSchema=_.cloneDeep(schema)
      newSchema.seed=`${schema.seed}${key}/pn1/`
      newSchema.dataSchema.params.sourceType=sourceMap[key]
      return newSchema
    })
  })
  return _.flatten(schemaForSourceType)
}
const schemaGanjiwangList=(citys)=>{
  let schemasForCity= citys.map(city=>{
    let shortCity=cityMap[city]
    let newConfigGanjiwang=_.cloneDeep(configGanjiwang)
    newConfigGanjiwang.dataSchema.params={
      city:city,
      website:'ganjiwang'
    }                                       //这个是动态加的
    newConfigGanjiwang.interval=6000
    newConfigGanjiwang.seed=`http://${shortCity}.ganji.com/fang6/`
    newConfigGanjiwang.urlSchema.url=[
      // {
      //   regex: `http:\\/\\/${shortCity}\\.ganji\\.com\\/fang6\\/o[2-3]c2\\/$`,
      //   go: true
      // },
      {
        regex: `http:\\/\\/${shortCity}\\.ganji\\.com\\/fang6\\/[0-9a-z]+\\.htm`
      }
  ]
    return newConfigGanjiwang
  })
  //配置不同房源类型的schema（个人、中介）{1:个人房源，2:经纪人房源}
  let sourceMap={
    1:'personal',
    2:'agent'
  }
  let schemaForSourceType=[1,2].map(key=>{
    return schemasForCity.map(schema=>{
      let newSchema=_.cloneDeep(schema)
      newSchema.seed=`${schema.seed}a${key}o1/`
      newSchema.dataSchema.params.sourceType=sourceMap[key]
      return newSchema
    })
  })
  return _.flatten(schemaForSourceType)
}

const getSchemas=(citys)=>{
  let list58=schema58List(citys)
  let listGanjiwang=schemaGanjiwangList(citys)
  let list=[]      //交叉进行，间歇爬取
  //个人和中介，*2
  for(let i=0;i<citys.length*2;i++){
    list.push(list58.shift())
    list.push(listGanjiwang.shift())
  }
  return list
}


module.exports={
  schema58List,
  schemaGanjiwangList,
  getSchemas
}