
import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom'
import Search from '../search'
import Report from '../report'
import Maps from '../map'
import style from './style.css'



class Entrance extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          <Link to='/'></Link>
          <Link to='/report'></Link>
          <Link to='/maps'></Link>
        </div>
        <Route exact path='/' component={ Search }></Route>
        <Route path='/report' component={ Report }></Route>
        <Route path='/maps' component={ Maps }></Route>
      </div>
    );
  }
}

export default Entrance;
