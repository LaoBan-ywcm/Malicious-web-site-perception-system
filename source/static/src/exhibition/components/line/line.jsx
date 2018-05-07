import style from './style.css';
import React, { Component } from 'react';
import getOption from './config.js'

import ReactEcharts from 'echarts-for-react'



class Line extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: getOption(),
    };
    this.fetchAPI = this.fetchAPI.bind(this)
  }

  componentWillMount() {
    this.fetchAPI();
  }


  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/lineData`, {
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        _data = data;
        let oData = getOption();
        oData['xAxis']['data'] = _data['x'];
        oData['series'][0]['data'] = _data['one'];
        oData['series'][1]['data'] = _data['two'];
        oData['series'][2]['data'] = _data['three'];
        this.setState({
          option: oData,
        })
      })
      .catch(error => {
        console.log(error);
      })
      return _data;
  }

  render() {
    return (
      <div className={style.line}>
        <p>网站检测趋势图</p>
        <ReactEcharts
          option={this.state.option}
          style={{height: '84%', width: '100%'}}
          className='react_for_echarts' />
      </div>
    );
  }
}

export default Line;
