import style from './style.css';
import React, { Component } from 'react';

import { Row, Col } from 'antd';

import ReactEcharts from 'echarts-for-react'
import 'echarts/map/js/china.js'
import getOption from './config.js'
import Map from './components/map'
import Pie from './components/pie'
import Liquidfill from './components/liquidfill'
import CityInfoTable from './components/cityInfoTable'
import Search from './components/search'
import Line from './components/line'


class Exhibition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      option:{},
    };
  }

  componentWillMount() {
    this.setState({
      height: window.innerHeight,
    })
  }

  render() {
    const fdStyle = {
      height: this.state.height * 0.3,
    }
    const sdStyle = {
      height: this.state.height * 0.7,
    }
    const searchStyle = {
      height: this.state.height * 0.7 * 0.5,
    }
    // const top = this.state.height / 2 - this.state.height * 0.8 / 2 + 'px';
    const mapStyle = {
      height: this.state.height,
      top: '0px',
      left: '0px',
      width: '100%',
    }
    return (
      <div className={style.bg}>
          <div className={style.mapp} style={mapStyle}>
            <Map />
          </div>
          <Row className={style.fd} >
            <Col className={style.logo} span={9} style={fdStyle}>
              <div>
                <h1 className={style.header_title}>恶意网站态势感知</h1>
                <p className={style.header_des}>分析可疑网址以检测病毒、蠕虫和木马等各种恶意软件。</p>
              </div>
            </Col>
            <Col className={style.bar} span={3} offset={4} style={fdStyle}>
              <div style={fdStyle}>
                <Liquidfill />
              </div>
            </Col>
            <Col className={style.bar} span={8}   style={fdStyle}>
              <div style={fdStyle}>
                <Pie />
              </div>
            </Col>
          </Row>
          <Row className={style.sd} >
            <Col span={15} className={style.map} style={sdStyle}>
              <Row>
                <CityInfoTable />
              </Row>
              <Row>
                <Line />
              </Row>
            </Col>
            <Col span={9} className={style.search} style={sdStyle}>
              <Row className={style.search} style={searchStyle}>
                <Search />
              </Row>
            </Col>
          </Row>
      </div>
    );
  }
}

export default Exhibition;
