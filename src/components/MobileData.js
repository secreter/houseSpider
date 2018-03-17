/**
 * Created by So on 2017/8/19.
 */
import { Card } from 'antd';
import React, { Component } from 'react';
import '../styles/mobiledata.css'
import qr_image from '../images/data_qr.jpg'

class MobileData extends Component{
  render(){
    return (
      <div className="qr-wrap">
        <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
          <div className="custom-image">
            <img alt="example" width="100%" src={qr_image} />
          </div>
          <div className="custom-card">
            <h3>微信扫描进入小程序数据管理</h3>
          </div>
        </Card>
      </div>
    )
  }
}
export default MobileData
