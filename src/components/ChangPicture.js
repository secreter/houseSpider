import React, { Component } from 'react';
import axios from 'axios';
import { Upload, Icon, Modal,Button,message} from 'antd';

class ChangPicture extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentDidMount(){
    let that=this
    let queryObj= {
      table: 'scroll_image',
      field: {
        //查询的域和类型
        url: 's'
      },
      orderby: {
        time: 1   //降序
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
        let dataArr=response.data.data
        let fileList=dataArr.map((item,index)=>{
          return {
            uid: '-'+index,      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
            name: index+'.png',   // 文件名
            status: 'done',  // 状态有：uploading done error removed
            url:item.url,
            response:{
              data:item.url
            }
          }
        })


        that.setState({
          fileList
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
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
  bindSave= ()=>{
    console.log(this.state.fileList)
    if(this.state.fileList.length===0){
      return
    }
    let urlArr=this.state.fileList.map((item)=>{
      return item.response.data
    })
    urlArr=JSON.stringify(urlArr)
    let that=this
    axios.post('https://project.redream.cn/lafeiya/backend/update_url.php', {
      urlArr
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

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="change-picture">
        <div>
          <h2>更改首页滚动图</h2><br />
        </div>
        <div className="clearfix">
          {/*注意，这个name要和后端一样*/}
          <Upload
            action="https://project.redream.cn/lafeiya/backend/upload.php"
            listType="picture-card"
            fileList={fileList}
            name="cover"
            accept="image/*"
            beforeUpload={this.beforeUpload}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 4 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
        <div>
          <br />
          <Button type="primary" onClick={this.bindSave}>保存更改</Button>
        </div>
      </div>
    );
  }
}


export default ChangPicture
