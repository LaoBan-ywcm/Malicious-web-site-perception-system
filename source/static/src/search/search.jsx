import style from './style.css';
import React, { Component } from 'react';

import { Input, Button } from 'antd';
const Search = Input.Search;


class InputSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
    this.onSearch = this.onSearch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSearch(value) {
    console.log(this.state)
    // const _data = await this.fetchAPI(this.state.inputValue);

    this.props.history.push({ pathname:'/report', state:this.state })
    this.state = {};
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value
    });
  }



  render() {
    return (
      <div id="search" className={style.search}>
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

export default InputSearch;
