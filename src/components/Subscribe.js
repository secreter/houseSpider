/**
 * Created by So on 2018/3/17.
 */
import React, { Component } from 'react'
import _  from 'lodash'
import { Row, Col, Select, TimePicker ,Button,Icon ,Input,message} from 'antd'
import moment from 'moment'
const Option = Select.Option
import axios from 'axios'
import '../styles/subscribe.css'
const WEBSITES=[{
  key:'house58',
  value:'58同城'
},{
  key:'ganjiwang',
  value:'赶集网'
}]
const CITYS=[{
  key:'beijing',
  value:'北京'
},{
  key:'tianjin',
  value:'天津'
},{
  key:'shanghai',
  value:'上海'
}]
export default class User extends Component {
  constructor (props){
    super(props)
    this.state={
      username:'',
      publishTime:['09:00:00'],
      email:'',
      citys:['beijing'],
      websites:['house58'],
      areaRange:{
        from:50,
        to:200
      }
    }
  }
  componentWillMount(){

  }
  render(){
    const {publishTime,email,citys,websites,areaRange}=this.state
    const inputStyle={
      width:'100%'
    }

    return (
      <div className="subscribe">
        <div className="subscribe-header">
          订阅房源最新信息更新通知
        </div>
        <div className="subscribe-body">
          <Row className="-row" gutter={16}>
            <Col className="-label" span={6}>用户名称：</Col>
            <Col span={14}>
              <Input
                size="large"
                placeholder="输入名称"
                onChange={this.handleInputChange.bind(this,'username')}/>
            </Col>
          </Row>
          <Row className="-row" gutter={16}>
            <Col className="-label" span={6}>订阅邮箱：</Col>
            <Col span={14}>
              <Input
                size="large"
                placeholder="输入邮箱"
                onChange={this.handleInputChange.bind(this,'email')}/>
            </Col>
          </Row>
          <Row className="-row" gutter={16}>
            <Col className="-label" span={6}>房源网站：</Col>
            <Col span={14}>
              <Select
                mode="multiple"
                defaultValue={websites}
                size={'large'}
                onChange={this.handleWebsiteChange}
                style={inputStyle}
              >
                {
                  WEBSITES.map(item=>{
                  return <Option key={item.key}>{item.value}</Option>
                })
                }
              </Select>
            </Col>
          </Row>
          <Row className="-row" gutter={16}>
            <Col className="-label" span={6}>房源城市：</Col>
            <Col span={14}>
              <Select
                mode="multiple"
                size={'large'}
                defaultValue={citys}
                onChange={this.handleCityChange}
                style={inputStyle}
              >
                {
                  CITYS.map(item=>{
                    return <Option key={item.key}>{item.value}</Option>
                  })
                }
              </Select>
            </Col>
          </Row>
          <Row className="-row" gutter={16}>
            <Col className="-label" span={6}>房源面积：</Col>
            <Col span={14}>
              <Input
                size="large"
                onChange={this.handleAreaChange.bind(this,'from')}
                style={{width:'48%'}}
                type="number"
                value={areaRange.from}/>
              <Icon type="minus" />
              <Input
                onChange={this.handleAreaChange.bind(this,'to')}
                style={{width:'48%'}}
                type="text"
                size="large"
                value={areaRange.to}/>
            </Col>
          </Row>
          {
            publishTime.map((time,index)=>{
              return (
                <Row key={index} className="-row" gutter={16}>
                  <Col className="-label" span={6}>通知时间：</Col>
                  <Col span={14}>
                    <TimePicker
                      onChange={this.handleTimeChange.bind(this,index)}
                      size={'large'}
                      style={inputStyle}
                      defaultValue={moment(time, 'HH:mm:ss')}
                      defaultOpenValue={moment(time, 'HH:mm:ss')} />
                  </Col>
                  <Col span={4}>
                    {
                      publishTime.length-1===index&&
                      <Button onClick={this.handleTimeAdd.bind(this,index)}><Icon type="plus" /></Button>
                    }
                    {
                      publishTime.length>1&&publishTime.length-1===index&&
                      <Button onClick={this.handleTimeSub.bind(this,index)}><Icon type="minus" /></Button>
                    }

                  </Col>
                </Row>
              )
            })
          }

        </div>
        <div className="subscribe-footer">
          <Button
            type="primary"
            onClick={this.handleSubmit}
            size="large">提交订阅</Button>
        </div>
      </div>
    )
  }
  handleInputChange=(key,e)=>{
    this.setState({
      [key]:e.target.value
    })
  }
  handleWebsiteChange=(selectedList)=>{
    this.setState({
      websites:selectedList
    })
  }
  handleCityChange=(selectedList)=>{
    this.setState({
      citys:selectedList
    })
  }
  handleAreaChange=(key,e)=>{
    const {areaRange}=this.state
    this.setState({
      areaRange:{
        ...areaRange,
        [key]:e.target.value
      }
    })
  }
  handleTimeChange=(index,time, timeString)=>{
    console.log(time, timeString);
    const {publishTime}=this.state
    publishTime.splice(index,1,timeString)
    this.setState({
      publishTime
    })
  }
  handleTimeAdd=(index)=>{
    const {publishTime}=this.state
    publishTime.splice(index+1,0,'09:00:00')
    console.log(publishTime)
    this.setState({
      publishTime
    })
  }
  handleTimeSub=(index)=>{
    const {publishTime}=this.state
    publishTime.splice(index,1)
    this.setState({
      publishTime
    })
  }
  handleSubmit=()=>{
    const {username,publishTime,email,citys,websites,areaRange}=this.state
    if(!this.validate()){
      return
    }
    axios.post('/user/subscribe',{
      username,
      publishTime,
      email,
      citys,
      websites,
      areaRange
    }).then(response=>{
      message.success('订阅成功！')
      console.log(response.data)
    }).catch(e=>{
      console.error(e)
    })
  }
  validate=()=>{
    const {username,publishTime,email,citys,websites,areaRange}=this.state
    if(!username){
      message.error('用户名称不能为空！')
      return false
    }
    if(_.isEmpty(publishTime)){
      message.error('订阅时间不能为空！')
      return false
    }
    if(_.isEmpty(citys)){
      message.error('房源城市不能为空！')
      return false
    }
    if(_.isEmpty(websites)){
      message.error('房源网站不能为空！')
      return false
    }
    if(!areaRange.from&&!areaRange.to){
      message.error('面积至少填一个！')
      return false
    }
    if(!email){
      message.error('邮箱不能为空！')
      return false
    }
    if(!/\S+@\S+/.test(email)){
      message.error('邮箱格式不能为空！')
      return false
    }
    return true
  }
}