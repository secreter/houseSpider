/**
 * Created by So on 2017/8/19.
 */
import { Input, Icon,Button } from 'antd';
import React, { Component } from 'react';
import '../styles/login.css'
import axios from 'axios';

class MobileData extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    };
  }
  emitEmpty = () => {
    this.usernameInput.focus();
    this.setState({ username: '' });
  }
  onChangeUserName = (e) => {
    this.setState({ username: e.target.value });
  }
  onChangePassword= (e) => {
    this.setState({ password: e.target.value });
  }
  bindLogin=(callback)=>{
    console.log(this.state)
    let that=this
    const {username,password} =this.state
    axios.post('/admin/getAdmin', {
      username,
      password
    })
      .then(function (response) {
        console.log(response.data);
        if(response.data&&response.data.status==="success"){
          // callback(response.data.data)
          // 保存数据到sessionStorage
          sessionStorage.setItem('house_status', 1);
          window.location.reload()
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getInput() {
    const { username ,password} = this.state;
    const suffix = username ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div className="login-box">
        <Input
          placeholder="请输入用户名"
          prefix={<Icon type="user" />}
          suffix={suffix}
          value={username}
          onChange={this.onChangeUserName}
          ref={node => this.usernameInput = node}
        />
        <br />
        <Input
          placeholder="请输入密码"
          prefix={<Icon type="key" />}
          type="password"
          value={password}
          onChange={this.onChangePassword}
          ref={node => this.usernameInput = node}
        />
        <br />
        <Button onClick={this.bindLogin.bind(this,this.props.getLoginStatus)} className="login-button" type="primary">登录</Button>
      </div>
    );
  }
  render(){
    return (
      <div className="login">
        {this.getInput()}
      </div>
    )
  }
}
export default MobileData