/**
 * Created by So on 2017/8/19.
 */
import React, { Component } from 'react';
import { Button, Card,  message, Icon,Modal } from 'antd';
import '../styles/showcard.css';
import axios from 'axios';

class Message extends Component {

  constructor (props) {
    super(props);
    this.state = {
      dataArr: [],
      visible: false,
    } // You can also pass a Quill Delta here

  }
  init(){
    let that=this
    let queryObj= {
      table: 'article',
      field: {
        //查询的域和类型
        id:'i',
        title: 's',
        content: 's',
        image: 's'
      },
      orderby: {
        time: 0   //降序
      },
      limit: {
        from: 0,
        num: 20,
      }
    }
    let query=JSON.stringify(queryObj)
    axios.post('https://project.redream.cn/lafeiya/backend/get_data.php', {
      query
    })
      .then(function (response) {
        console.log(response);
        that.setState({
          dataArr:response.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount(){
    this.init()
  }
  bindDelete=(id)=>{
    let that=this
    console.log(id)
    axios.post('https://project.redream.cn/lafeiya/backend/del_article.php', {
      id
    })
      .then(function (response) {
        console.log(response);
        that.setState({
          visible:true
        })
        this.init()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
    this.init()
  }
  generateCards=()=>{
    let cards=[]
    this.state.dataArr.forEach((item,index)=>{
      let card=(
        <div className="message-preview" key={index}>
          <Card className="message-preview_card" style={{width: 240}} bodyStyle={{padding: 0}}>
            <div className="message-preview_image">
              <img alt="example" width="100%" className="message-cover"
                   src={item.image} />
            </div>
            <div className="message-preview-body">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </Card>
          <div className="message-btn">
            <Button type="primary" onClick={this.bindDelete.bind(this,item.id)}>删除</Button>
          </div>
        </div>
      )
      cards.push(card)
    })
    return cards
  }
  render () {
    return (
      <div className="message-wrap">
        <div className="message">
          {this.generateCards()}
        </div>

        <div>
          <Modal
            title="删除成功"
            visible={this.state.visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确认"
            cancelText="取消"
          >
            <p>你已经删除一张卡片</p>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Message