import style from './style.css';
import React, { Component } from 'react';


import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china.js'
import getOption from './config.js'


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option:getOption(),
    };
    this.fetchAPI = this.fetchAPI.bind(this);
    this.sortMapData = this.sortMapData.bind(this);
  }

  componentWillMount() {
    this.fetchAPI();
  }

  sortMapData(data) {
    const _data = data.sort((a, b) => {
      return b['value'][2] - a['value'][2]
    })
    return _data.slice(0,3)
  }

  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/mapData`)
      .then(response => response.json())
      .then(data => {
        _data = data;
        let oData = getOption();
        const sortData = this.sortMapData(_data);
        oData['series'][0]['data'] = _data;
        oData['series'][1]['data'] = sortData;
        console.log(oData);
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

export default Map;
