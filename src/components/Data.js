import React, { Component } from 'react'
import { Table, Button } from 'antd'
import axios from 'axios'
import '../styles/data.css'

class Data extends Component {
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
    axios.post('/house/getData', {
      offset:(page-1)*this.state.size
    })
      .then((response) => {
        console.log(response)
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
        title:'图片',
        dataIndex:'picture',
        key:'picture',
        fixed:'left',
        render: (url, record) => {
            return <img src={url} width={60}></img>
        },
      },
      {
        title: '查看',
        dataIndex: '_url',
        key: '_url',
        width:60,
        fixed:'left',
        render: (_url, record) => {
          return <a href={_url}>查看</a>
        },
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        width:160
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width:80
      }, {
        title: '面积',
        dataIndex: 'area',
        key: 'area',
        width:80,
        sorter: (a, b) => parseInt(a.area) - parseInt(b.area),
        sortOrder: sortedInfo.columnKey === 'area' && sortedInfo.order,
      }, {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        width:80,
        filters: [{
          text: '北京',
          value: 'beijing',
        }, {
          text: '天津',
          value: 'tianjin',
        },{
          text: '上海',
          value: 'shanghai',
        }],
        onFilter: (value, record) => record.city.indexOf(value) === 0,
      }, {
        title: '联系人',
        dataIndex: 'connectPerson',
        key: 'connectPerson',
        width:80
      }, {
        title: '电话',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        width:120
      }, {
        title: '抓取时间',
        dataIndex: 'created',
        key: 'created',
        width:150
      }, {
        title: '网站',
        dataIndex: 'website',
        key: 'website',
        width:100,
        filters: [{
          text: '58同城',
          value: 'house58',
        }, {
          text: '赶集网',
          value: 'ganjiwang',
        }],
        onFilter: (value, record) => record.website.indexOf(value) === 0,
      }, {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width:200,
        render: (text, record) => {
            return <div title={text} className="data-desc">{text}</div>
        },
      },

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
}

export default Data