import React, { Component } from 'react';
import './App.css';
import  Panel  from './components/Panel';
import Login from './components/Login';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import {browserHistory} from 'react-router';


class App extends Component {

  state={
    isLogin:false
  }
  getLoginStatus=(isLogin)=>{
    this.setState({
      isLogin
    })
    console.log(this.state.isLogin)
  }
  componentWillMount(){
    let isLogin=sessionStorage.getItem('house_status')
    this.state.isLogin=isLogin==1
    console.log(this.state.isLogin)

  }
  render() {
    return (
      <Router history={browserHistory}>
        <div className="App">
          <switch>
            {this.state.isLogin ?
              <Route path="/" component={Panel} />:
              <Route path="/" component={Login}/>
            }
          </switch>

        </div>
      </Router>
    );
  }
}

export default App;
