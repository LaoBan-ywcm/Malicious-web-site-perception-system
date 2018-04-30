import style from './style.css';
import React, { Component } from 'react';


import ReactEcharts from 'echarts-for-react'
import { Table } from 'antd';


class CityInfoTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'cityData': [{
        'city':'',
        'oneGrade':0,
        'twoGrade':0,
        'threeGrade':0,
        'sum':0,
      }],
    };
    this.fetchAPI = this.fetchAPI.bind(this)
  }

  componentWillMount() {
    this.fetchAPI();
  }

  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/cityData`)
      .then(response => response.json())
      .then(data => {
        _data = data;
        this.setState({
          'cityData': _data,
        })
      })
      return _data;
  }

  render() {
    return (
      <div className={style.cityInfo}>
        <p>网站检测结果汇总</p>
        <div className={style.header}>
          <span className={style.headerCity}>城市</span>
          <span>一级</span>
          <span>二级</span>
          <span>三级</span>
          <span>总数</span>
        </div>
        {
          this.state.cityData.map((data) => {
            return (
                <div key={data.city} className={style.content}>
                  <span className={style.city} >{data.city}</span>
                  <span className={style.one}>{data.oneGrade}</span>
                  <span className={style.two}>{data.twoGrade}</span>
                  <span className={style.three}>{data.threeGrade}</span>
                  <span className={style.sum}>{data.sum}</span>
                </div>
              )
          })
        }
      </div>
    );
  }
}

export default CityInfoTable;
