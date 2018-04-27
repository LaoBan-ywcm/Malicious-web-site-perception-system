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

  onSearch(value) {
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
      <div>
        <h1 className={style.header_title}>恶意网站态势感知</h1>
        <p className={style.header_des}>分析可疑网址以检测病毒、蠕虫和木马等各种恶意软件。</p>
        <div className={style.search}>
          <Search
            placeholder="www.baidu.com"
            enterButton
            value={ this.state.inputValue }
            onSearch = { (value) => this.onSearch(value) }
            onChange = { (event) => this.onChange(event) }
          />
        </div>
      </div>
    );
  }
}

export default InputSearch;
