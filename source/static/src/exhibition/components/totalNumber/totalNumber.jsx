import style from './style.css';
import React, { Component } from 'react';

class TotalNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      option: 0,
    };
    this.fetchAPI = this.fetchAPI.bind(this)
  }

  componentWillMount() {
    this.fetchAPI();
  }


  async fetchAPI() {
    let _data = '';
    const data = await fetch(`/totalNumber`, {
      mode: 'cors',
    })
      .then(response => response.json())
      .then(data => {
        _data = data;
        this.setState({
          option: _data,
        })
      })
      .catch(error => {
        console.log(error);
      })
      return _data;
  }

  render() {
    return (
      <div className={style.totalnumber}>
        <p className={style.describe}>检测网站数</p>
        <p className={style.number}>{this.state.option}</p>
      </div>
    );
  }
}

export default TotalNumber;
