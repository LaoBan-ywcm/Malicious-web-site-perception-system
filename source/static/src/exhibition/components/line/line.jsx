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
    // this.fetchAPI = this.fetchAPI.bind(this)
  }



  // async fetchAPI(inputUrl) {
  //   let _data = '';
  //   const data = await fetch(`/verification?url=${inputUrl}`, {
  //     mode: 'cors',
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       _data = data;
  //       console.log(_data)
  //       this.setState({
  //         virData: _data,
  //         loading: false,
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //     return _data;
  // }
  render() {
    console.log(this.state);
    return (
      <div className={style.line}>
        <ReactEcharts
          option={this.state.option}
          style={{height: '100%', width: '100%'}}
          className='react_for_echarts' />
      </div>
    );
  }
}

export default Line;
