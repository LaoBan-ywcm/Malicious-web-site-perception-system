import style from './style.css';
import React, { Component } from 'react';

import { Input, Button, Icon } from 'antd';
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
      <div className={style.search}>
        <input
          className={style.search_input}
          placeholder="www.baidu.com"
          enterButton
          value={ this.state.inputValue }
          onSearch = { (value) => this.onSearch(value) }
          onChange = { (event) => this.onChange(event) }
        />
        <Icon type="search" />
      </div>
    );
  }
}

export default InputSearch;
