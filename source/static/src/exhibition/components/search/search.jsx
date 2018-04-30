import style from './style.css';
import React, { Component } from 'react';


import ReactEcharts from 'echarts-for-react'
import { Spin, Switch, Alert } from 'antd';



class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      virData: {
        ip: '0.0.0.0',
        virusTotal_message: {
          url: 'www.xxx.com',
          state: '未知',
          scan_date: '2000-00-00',
          code: 1,
        },
      }
    };
    this.fetchAPI = this.fetchAPI.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.fetchAPI(this.state.inputValue)
    this.setState({
      loading: true,
    })
  }

  // componentWillMount() {
  //   this.fetchAPI();
  // }

  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/verification?url=${inputUrl}`, {
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        _data = data;
        console.log(_data)
        this.setState({
          virData: _data,
          loading: false,
        })
      })
      .catch(error => {
        console.log(error);
      })
      return _data;
  }
  render() {
    return (
      <div className={style.searchBox}>
        <div className={style.search}>
          <p>网站检测</p>
          <input type="text" placeholder="www.xxx.com" onChange={ e => {this.setState({'inputValue': e.target.value })}} />
          <button onClick={this.handleClick}>检测</button>
        </div>
        <div className={style.report}>
          <p>检测报告</p>
          {
            this.state.virData.virusTotal_message.code == -1 ? (
                <div>
                  <p className={style.error}>验证失败</p>
                </div>
              ):(
                <div>
                  <Spin spinning={this.state.loading} size="large">
                    <div className={style.reportList}>
                      <p>
                        <span>网站状态</span>
                        <span className={style.bolder} >{this.state.virData.virusTotal_message.state}</span>
                      </p>
                      <p>
                        <span>主机</span>
                        <span className={style.bolder} >{this.state.virData.virusTotal_message.url}</span>
                      </p>
                      <p>
                        <span>ip</span>
                        <span className={style.bolder} >{this.state.virData.ip}</span>
                      </p>
                      <p>
                        <span>上次检测时间</span>
                        <span className={style.bolder} >{this.state.virData.virusTotal_message.scan_date}</span>
                      </p>
                    </div>
                  </Spin>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}

export default Search;
