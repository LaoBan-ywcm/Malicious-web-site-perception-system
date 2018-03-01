import style from './style.css';
import React, { Component } from 'react';

import { Input, Button } from 'antd';
const Search = Input.Search;


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchAPI = this.fetchAPI.bind(this);
  }

  onSearch(value) {
    console.log(this.state)
    this.fetchAPI(this.state.inputValue)
    this.setState({
      inputValue: ''
    });
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }

  fetchAPI(inputUrl) {
    fetch(`/verification?url=${inputUrl}`)
      .then(response => response.json())
      .then(data => console.log(data))
  }

  render() {
    return (
      <div id="header" className={style.header}>
        <Search
          placeholder="www.baidu.com"
          enterButton="检测"
          value={ this.state.inputValue }
          onSearch = { (value) => this.onSearch(value) }
          onChange = { (event) => this.onChange(event) }
        />
      </div>
    );
  }
}

export default Header;
