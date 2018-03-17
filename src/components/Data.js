import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'antd';
import axios from 'axios';


class Data extends Component {
	state = {
    filterDropdownVisible: false,
    data:[],
    searchText: '',
    filtered: false,
    total:0,
    size:10,
    curPage:1
  };
	componentWillMount(){
	  this.getTotal()
    this.init()
  }
  getTotal(){
	  let that=this
    let queryObj= {
      table: 'reserve',
      field: {
        //查询的域和类型
        id:'i',
      },
      orderby: {
        id: 0   //降序
      },
    }
    let query=JSON.stringify(queryObj)
    axios.post('https://project.redream.cn/lafeiya/backend/get_data.php', {
      query
    })
      .then(function (response) {
        that.setState({
          total:response.data.data.length
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  init(page=this.state.curPage){
    let that=this,num=this.state.size
    let queryObj= {
      table: 'reserve',
      field: {
        //查询的域和类型
        id:'i',
        username: 's',
        nickname: 's',
        sex: 's',
        city: 's',
        phonenumber: 's',
        hairstylist: 's',
        date: 's',
        time: 's',
        remark: 's',
        status: 'i',
        curtime:'i'
      },
      orderby: {
        curtime: 0   //降序
      },
      limit: {
        from: (page-1)*num,
        num: num,
      }
    }
    let query=JSON.stringify(queryObj)
    axios.post('https://project.redream.cn/lafeiya/backend/get_data.php', {
      query
    })
      .then(function (response) {
        console.log(response);
        that.setState({
          data:response.data.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onPageChange=(page)=>{
    console.log(page)
    this.init(page)
    this.setState({
      curPage:page
    })
  }
  onInputChange = (e) => {
    this.setState({ searchText: e.target.value });
  }
  onSearch = () => {
    const { searchText,data } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.map((record) => {
        const match = record.name.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  changeStatus(id){
    console.log(id)
    let that=this
    axios.post('https://project.redream.cn/lafeiya/backend/deal.php', {
      id
    })
      .then(function (response) {
        console.log(response);
        that.init()
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const columns = [
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },{
      title: '称呼',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      filters: [{
        text: '男',
        value: '男',
      }, {
        text: '女',
        value: '女',
      }],
      onFilter: (value, record) => record.sex.indexOf(value) === 0,
    }, {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    }, {
      title: '电话',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    }, {
      title: '发型师',
      dataIndex: 'hairstylist',
      key: 'hairstylist',
    }, {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
        render: (status,record )=> {
          if(status==1){
           return <Button disabled>已处理</Button>
          }else{
            return <Button type="primary" onClick={this.changeStatus.bind(this,record['id'])}>未处理</Button>
          }
        },
    }

    ];
    return <Table columns={columns} dataSource={this.state.data} pagination={{pageSize:this.state.size,onChange:this.onPageChange,total:this.state.total}} />;
  }
}

export default Data