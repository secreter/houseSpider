import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Data from './Data';
import User from './User';
import Subscribe from './Subscribe';
import MyEditor from './Editor';
import ChangPicture from './ChangPicture';
import ShowCard from './ShowCard';
import MobileData from './MobileData';
import '../styles/panel.css';
import {
  // BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
// import {browserHistory} from 'react-router';

class Panel extends Component {
  state = {
    current: 'mail',
		dev:window.location.host=='localhost:3000'
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  onSelect = (selectedKeys, info) => {
  }
  logout=(item)=>{
    if(item.key!=="6"){
  		return
		}
    sessionStorage.setItem('house_status', 0);
    window.location.href='/'

	}
	render(){
    let publicPath=this.state.dev?'':''

    return (
      <Layout className="panel">
        <Header className="header">
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="appstore" >
              <Icon type="appstore" />房源数据订阅系统
            </Menu.Item>
            <Menu.Item key="area-chart">
              <Icon type="home" />
              <a href="http://www.longfor.com/" style={{'display':'inline-block'}} target="_blank" rel="noopener noreferrer">龙湖地产</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#404040' }}>
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              onClick={this.logout}
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1">
                <Link to={publicPath+"/Subscribe"}>
                  <Icon type="notification" />
                  <span>增加订阅</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={publicPath+"/User"}>
                  <Icon type="inbox" />
                  <span>管理订阅</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to={publicPath+"/data"}>
                  <Icon type="desktop" />
                  <span>查看数据</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="6" >
                <Icon type="poweroff" />
                <span>退出登录</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <div className="panel_main">
            <Switch>
              <Route path={publicPath+"/data"} component={Data}/>
              <Route path={publicPath+"/Subscribe"} component={Subscribe}/>
              <Route path={publicPath+"/User"} component={User}/>
              <Route path={publicPath+"/picture"} component={ChangPicture}/>
              <Route path={publicPath+"/myEditor"} component={MyEditor}/>
              <Route path={publicPath+"/mobileData"} component={MobileData}/>
              {/*<Route path={publicPath+"/*"} component={Subscribe}/>*/}
            </Switch>
          </div>
        </Layout>
      </Layout>
    )
  }
  render2() {
  	let publicPath=this.state.dev?'':'/lafeiya'
    return (
	      <div className="panel">
          <div className="logo" ></div>
	      	<Menu
		        onClick={this.handleClick}
		        selectedKeys={[this.state.current]}
		        mode="horizontal"
		        theme="dark"
		      >
		        <Menu.Item key="appstore" >
		          <Icon type="appstore" />拉菲亚小程序管理系统
		        </Menu.Item>
		        <Menu.Item key="area-chart">
		          <Icon type="area-chart" />
							<a href="https://mp.weixin.qq.com" style={{'display':'inline-block'}} target="_blank" rel="noopener noreferrer">小程序微信后台数据</a>
		        </Menu.Item>
		        <Menu.Item key="customer-service">
							<Icon type="customer-service" />
		          <a href="https://mpkf.weixin.qq.com/"  style={{'display':'inline-block'}}  target="_blank" rel="noopener noreferrer">小程序客服登陆</a>
		        </Menu.Item>
		      </Menu>
	 	    <div className="panel_body">
	 	    	<div className="panel_side-menu">
			    	<Menu
			          defaultSelectedKeys={['1']}
			          defaultOpenKeys={['sub1']}
			          mode="inline"
			          theme="dark"
								onClick={this.logout}
			          inlineCollapsed={this.state.collapsed}
			        >
			          <Menu.Item key="1">
			            <Link to={publicPath+"/message"}>
				            <Icon type="notification" />
				            <span>发布活动</span>
			            </Link>
			          </Menu.Item>
							<Menu.Item key="2">
								<Link to={publicPath+"/ShowCard"}>
									<Icon type="inbox" />
									<span>管理活动</span>
								</Link>
							</Menu.Item>
			          <Menu.Item key="3">
			            <Link to={publicPath+"/picture"}>
				            <Icon type="picture" />
				            <span>更换图片</span>
			            </Link>
			          </Menu.Item>
			          <Menu.Item key="4">
			            <Link to={publicPath+"/data"}>
				            <Icon type="desktop" />
				            <span>查看数据</span>
			            </Link>
			          </Menu.Item>
							<Menu.Item key="5">
								<Link to={publicPath+"/mobileData"}>
									<Icon type="mobile" />
									<span>手机查看数据</span>
								</Link>
							</Menu.Item>
							<Menu.Item key="6" >
								<Icon type="poweroff" />
								<span>退出登录</span>
							</Menu.Item>
						</Menu>
			    </div>
			    <div className="panel_main">
			    	<Switch>
							<Route path={'/lafeiya'+"/data"} component={Data}/>
							<Route path={publicPath+"/data"} component={Data}/>
				    	<Route path={publicPath+"/message"} component={Message}/>
				    	<Route path={publicPath+"/ShowCard"} component={ShowCard}/>
				    	<Route path={publicPath+"/picture"} component={ChangPicture}/>
				    	<Route path={publicPath+"/myEditor"} component={MyEditor}/>
				    	<Route path={publicPath+"/mobileData"} component={MobileData}/>
				    	<Route path={publicPath+"/*"} component={Data}/>
				    </Switch>
			    </div>
	 	    </div>
	      </div>
    );
  }
}

export default Panel;

