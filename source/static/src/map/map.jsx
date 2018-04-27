import React, { Component } from 'react';
import style from './style.css'

import ReactEcharts from 'echarts-for-react'
// import 'echarts/map/js/world.js'
import 'echarts/map/js/china.js'

import getOption from './config.js'



class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: {},
      wHeight: 0,
    }
  }

  async componentWillMount() {
    console.log(window.innerHeight);
    this.setState({
      wHeight: window.innerHeight,
    });
    const data = await this.fetchAPI()
    console.log(data);
    let oData = getOption();
    oData['series'][0]['data'] = data;
    this.setState({
      option: oData,
      wHeight: window.innerHeight,
    })
  }

  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/mapData`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        _data = data;
      })
      return _data;
  }



  render() {
    console.log(this.state);
    const divstyle = {
      height: this.state.wHeight,
    }

    return (
        <div style={divstyle}>
          <ReactEcharts
            option={this.state.option}
            style={{height: '100%', width: '100%'}}
            className='react_for_echarts' />
        </div>
    );
  }
}

export default Maps;