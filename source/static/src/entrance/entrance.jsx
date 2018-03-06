
import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom'
import Search from '../search'
import Report from '../report'



class Entrance extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="entrance">
        <h1>恶意网站态势感知系统</h1>
        <div>
          <Link to='/'></Link>
          <Link to='/report'></Link>
        </div>
        <Route exact path='/' component={ Search }></Route>
        <Route path='/report' component={ Report }></Route>

      </div>
    );
  }
}

export default Entrance;
