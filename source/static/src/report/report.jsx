import React, { Component } from 'react';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.fetchAPI = this.fetchAPI.bind(this)
  }

  async componentWillMount() {
    console.log(this.props.location.state.inputValue)
    const result_data = await this.fetchAPI(this.props.location.state.inputValue)
    this.setState({
      d:result_data
    })
    console.log(this.state)
  }

  async fetchAPI(inputUrl) {
    let _data = '';
    const data = await fetch(`/verification?url=${inputUrl}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        _data = data;
      })
      return _data;
  }

  render() {
    return (
      <div id="report">
        <h2>检测报告</h2>
        {
          this.state.d ? (
              this.state.d.virusTotal_message.code == -1 ? (
                  <div>
                    <p>ip:查询不到</p>
                    <p>ip:{this.state.d.virusTotal_message.message}</p>
                  </div>
                ):(
                  <div>
                    <p>ip:{this.state.d.ip}</p>
                    <p>网站状态:{this.state.d.virusTotal_message.state? (<span>安全</span>) : (<span>危险</span>)}</p>
                    <p>检测过的软件个数:{this.state.d.virusTotal_message.software_sum}</p>
                    <p>检测为危险的软件个数:{this.state.d.virusTotal_message.danger_sum}</p>
                    <p>检测为安全的软件个数:{this.state.d.virusTotal_message.security_sum}</p>
                    <ul>
                      <p>检测为危险的软件列表:{this.state.d.virusTotal_message.danger_software.map((i) => <li key={i}>{i}</li>)}</p>
                    </ul>
                    <ul>
                      <p>检测为安全的软件列表:{this.state.d.virusTotal_message.security_software.map((i) => <li key={i}>{i}</li>)}</p>
                    </ul>
                  </div>
                )
            ): (
              <h3>正在检测...</h3>
            )
        }
      </div>
    );
  }
}

export default Report;