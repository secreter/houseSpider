/**
 * Created by So on 2018/3/17.
 */
import React, { Component } from 'react'
import { Table, Button,message } from 'antd'
import axios from 'axios'
import '../styles/data.css'

class User extends Component {
  state = {
    filterDropdownVisible: false,
    data: [],
    searchText: '',
    filtered: false,
    total: 0,
    size: 10,
    curPage: 1,
    sortedInfo: {
      order: '',
      columnKey: '',
    },
    filteredInfo:{

    }
  };

  componentWillMount () {
    this.getData()
  }

  getData (page = this.state.curPage) {
    axios.post('/user/getUser', {
      offset:(page-1)*this.state.size
    })
      .then((response) => {
        this.setState({
          total: response.data.data.total,
          data: response.data.data.list
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onPageChange = (page) => {
    console.log(page)
    this.getData(page)
    this.setState({
      curPage: page,
    })
  }
  handleTableChange=(pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
  onInputChange = (e) => {
    this.setState({searchText: e.target.value});
  }
  onSearch = () => {
    const {searchText, data} = this.state;
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

  render () {
    const {sortedInfo}=this.state
    const columns = [
      {
        title:'用户名',
        dataIndex:'username',
        key:'username',
        width:160
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width:240
      }, {
        title: '订阅城市',
        dataIndex: 'citys',
        key: 'citys',
        width:200,
        render: (list, record) => {
          return <div  className="data-desc">{list.join(', ')}</div>
        },
      }, {
        title: '订阅网站',
        dataIndex: 'websites',
        key: 'websites',
        width:200,
        render: (list, record) => {
          return <div  className="data-desc">{list.join(', ')}</div>
        }
      },{
        title: '订阅类型',
        dataIndex: 'sourceTypes',
        key: 'sourceTypes',
        width:200,
        render: (list, record) => {
          return <div  className="data-desc">{list?list.join(', '):''}</div>
        }
      }, {
        title: '订阅面积',
        dataIndex: 'areaRange',
        key: 'areaRange',
        width:160,
        render: (areaRange, record) => {
          return <div  className="data-desc">{areaRange.from}--{areaRange.to}</div>
        }
      }, {
        title: '通知时间',
        dataIndex: 'subscribeTime',
        key: 'subscribeTime',
        width:200,
        render: (list, record) => {
          return <div  className="data-desc">{list.join(', ')}</div>
        }
      }, {
        title: '创建时间',
        dataIndex: 'created',
        key: 'created',
        width:200,
        render: (time, record) => {
          return <div  className="data-desc">{new Date(time).toLocaleString()}</div>
        }
      }, {
        title: '管理',
        dataIndex: 'id',
        key: 'id',
        width:80,
        fixed:'right',
        render: (id, record) => {
          return <Button type={'danger'} onClick={this.bindClickRemove.bind(this,id)}>删除</Button>
        },
      }

    ];
    return <Table columns={columns}
                  rowKey="id"
                  style={{background:'#fff'}}
                  dataSource={this.state.data}
                  onChange={this.handleTableChange }
                  pagination={{
                    showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    pageSize: this.state.size,
                    onChange: this.onPageChange,
                    total: this.state.total
                  }} />;
  }
  bindClickRemove=(id)=>{
    axios.post('/user/deleteUser', {
      id
    })
      .then((response) => {
        if(response.data.status==='success'){
          this.getData()
          message.success('删除成功！')
        }
      })
      .catch( (error) =>{
        console.log(error);
      });
  }
}
export default User