import React, { Component } from 'react';


import ReactEcharts from 'echarts-for-react'
import getOption from './config.js'
import 'echarts/lib/chart/pie';



class Liquidfill extends Component {
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
        _data = data;
        let oData = getOption();
        const dangerProp =  (_data['dangerSum'] / (_data['dangerSum'] + _data['securitySum'])).toFixed(2);
        // const securityProp = (_data['securitySum'] / (_data['dangerSum'] + _data['securitySum'])).toFixed(2);
        oData['series'][0]['data'][0]['value'] = dangerProp;
        // oData['series'][0]['data'][1]['value'] = securityProp;
        // console.log(dangerProp, securityProp)
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

export default Liquidfill;
