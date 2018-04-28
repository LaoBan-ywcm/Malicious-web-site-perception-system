import style from './style.css';
import React, { Component } from 'react';


import ReactEcharts from 'echarts-for-react'
import getOption from './config.js'
import 'echarts/lib/chart/pie';


class Pie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: getOption(),
    };
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  componentWillMount() {
    this.fetchAPI();
  }

  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/gradeData`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        _data = data;
        let oData = getOption();
        oData['series'][0]['data'][1]['label']['normal']['formatter'] = '\n' + _data['oneGrade']
        oData['series'][1]['data'][1]['label']['normal']['formatter'] = '\n' + _data['twoGrade']
        oData['series'][2]['data'][1]['label']['normal']['formatter'] = '\n' + _data['threeGrade']
        let ttd = oData['series'][2]['data'][1]['label']['normal']['formatter'];
        this.setState({
          option: oData,
        })
      })
      return _data;
  }





  render() {
    return (
      <ReactEcharts
        option={this.state.option}
        style={{height: '100%', width: '100%'}}
        className='react_for_echarts' />
    );
  }
}

export default Pie;
