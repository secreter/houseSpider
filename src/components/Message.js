import React, { Component } from 'react';
import { Button, Card, Upload, message, Icon,Modal } from 'antd';
import '../styles/message.css';
import axios from 'axios';

class Message extends Component {

  constructor (props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      visible: false,
      imageUrl: ''
    } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  changeTitle = (e) => {
    this.setState({title: e.target.value})
  }
  changeContent = (e) => {
    this.setState({content: e.target.value})
  }

  handleChange (value) {
    this.setState({content: value})
    console.log(value)
  }

  handleUploadChange = (info) => {
    console.log(info)
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      if(info.file.response&&info.file.response.msg==='success'){
        this.setState({
          imageUrl:info.file.response.data
        })
      }else{
        console.error(info.file.response)
      }
      // this.getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl}));
    }
  }

  createHtmlString () {
    return {__html: this.state.text};
  }

  getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }



  beforeUpload (file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
      message.error('只能选择jpg、png图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 0.8;
    if (!isLt2M) {
      message.error('图片不能超过800k!');
    }
    return isJPG && isLt2M;
  }

  generateUpload () {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="cover"
        showUploadList={false}
        action="https://project.redream.cn/lafeiya/backend/upload.php"
        beforeUpload={this.beforeUpload}
        onChange={this.handleUploadChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
  hindSubmit=()=>{
    let that=this
    axios.post('https://project.redream.cn/lafeiya/backend/publish.php', {
      image: that.state.imageUrl,
      title: that.state.title,
      content: that.state.content
    })
      .then(function (response) {
        console.log(response);
        that.setState({
          visible:true
        })
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
  }
  render () {
    return (
      <div className="message-wrap">
        <div className="message">
          <div className="message-preview">
            <h2 className="message-title">预览</h2>
            <Card className="message-preview_card" style={{width: 240}} bodyStyle={{padding: 0}}>
              <div className="message-preview_image">
                <img alt="example" width="100%" className="message-cover"
                     src={this.state.imageUrl ? this.state.imageUrl : "http://placehold.it/800x500"} />
              </div>
              <div className="message-preview-body">
                <h3>{this.state.title ? this.state.title : '请输入预览标题'}</h3>
                <p>{this.state.content ? this.state.content : '请输入预览内容'}</p>
              </div>
            </Card>

          </div>
          <div className="message_editor">
            <h2 className="message-title">编辑</h2>
            <Card className="message-preview_card" style={{width: 240}} bodyStyle={{padding: 0}}>
              <div className="message-preview_image">
                {this.generateUpload()}
              </div>
              <div className="">
                <input className="title-input" type="text" placeholder="请输入标题" onChange={this.changeTitle} />
                <textarea className="content-input" name="content" cols="30" rows="10" placeholder="编辑内容"
                          onChange={this.changeContent}></textarea>
              </div>
            </Card>

          </div>
        </div>
        <div className="message-btn">
          <Button type="primary" onClick={this.hindSubmit}>发布</Button>
        </div>
        <div>
          <Modal
            title="发布成功"
            visible={this.state.visible}
            onOk={this.hideModal}
            onCancel={this.hideModal}
            okText="确认"
            cancelText="取消"
          >
            <p>发布成功，可在小程序查看</p>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Message