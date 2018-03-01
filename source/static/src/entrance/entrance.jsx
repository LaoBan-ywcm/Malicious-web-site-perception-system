
import React, { Component } from 'react';
import Search from '../search'


class entrance extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="entrance">
        <span>恶意网站态势感知系统</span>
        <Search/>
      </div>
    );
  }
}

export default entrance;
