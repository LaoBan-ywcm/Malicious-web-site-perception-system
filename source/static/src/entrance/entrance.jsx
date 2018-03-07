
import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom'
import Search from '../search'
import Report from '../report'
import style from './style.css'



class Entrance extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className={style.header_title}>恶意网站态势感知</h1>
        <p className={style.header_des}>分析可疑网址以检测病毒、蠕虫和木马等各种恶意软件。</p>
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
