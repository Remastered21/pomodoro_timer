import React, { Component } from 'react'

// STRETCH: limit typed in value of minute and second to 59.
// if typed value is > 59, then overwrite it with last typed-in number.
class CountdownTimer extends Component {

  // ! Everything is done in ms (milliseconds!)

  state = {
    total_running_time: 0,
    timer_is_initiated: false,
    running: false,
    value_hr: 0, // TODO: display 00:00:00 as initial value
    value_min: 0, // STRETCH: remember timer value from last time (use cookie)
    value_sec: 0,
  }

  // componentDidMount() {
  //   // ? Run When Component is created/inserted in DOM
  // }

  componentWillUnmount() {
    //  ? Run function when component is destroyed/removed from DOM
    clearInterval(this.interval) // clear interval to prevent memory leak
  }

  tick = () => {
    // tickrate @ 10 ms
    this.setState(state => ({ total_running_time: state.total_running_time -= 10 }));
    if (this.state.total_running_time < 20) { // Check condition at 20 ms to stop properly at 0 second
      clearInterval(this.interval);
      console.log('TIME!');
    }
  }

  formatTime = (secs) => {
    let hours = Math.floor(secs / 3600 / 1000);
    let minutes = Math.floor(secs / 60 / 1000 % 60);
    let seconds = Math.floor(secs / 1000 % 60);

    return { hours, minutes, seconds }
  }

  handleStart = (e) => {

    const totalTime = (Number(this.state.value_hr) * 3600 + Number(this.state.value_min) * 60 + Number(this.state.value_sec)) * 1000 // done in millisecond
    this.setState({
      total_running_time: totalTime,
    })

    // FIXME: timer doesn't pause properly due to 0.5 second timeout.
    setTimeout(function () {
      console.log("Executed after 1 second");
      this.interval = setInterval(() => this.tick(), 10); // tick every ms
    }.bind(this), 500);

    this.setState({
      timer_is_initiated: true,
      running: true
    });
  }

  handlePause = (e) => {
    if (!this.state.running) {
      this.interval = setInterval(() => this.tick(), 10); // tick every ms
      this.setState({ running: true });
    } else {
      clearInterval(this.interval) // clear interval
      this.setState({ running: false });
    }
  }

  handleReset = (e) => {
    this.setState({
      running: false,
      timer_is_initiated: false,
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      // FIXME: Separate components into "Timer setup" and "Running timer"
      <div>
        <h1>Name of the task here</h1>

        <div className='countdown-container'>
          <div className='countdown-element hours-c'>

            <input // HOUR
              name='value_hr'
              id="value_hr"
              type="number"
              value={this.state.value_hr}
              min="0"
              max="99"
              onChange={this.handleChange.bind(this)}
              className='big-text'
              hidden={!this.state.running && !this.state.timer_is_initiated ? false : true}
            />
            <p className='big-text' hidden={!this.state.timer_is_initiated}>{this.formatTime(this.state.total_running_time).hours}</p>
            <span>hours</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element mins-c'>
            <input
              name='value_min'
              id="value_min"
              type="number"
              value={this.state.value_min}
              min="0"
              max="59"
              onChange={this.handleChange.bind(this)}
              className='big-text'
              hidden={!this.state.running && !this.state.timer_is_initiated ? false : true}
            />
            <p className='big-text' hidden={!this.state.timer_is_initiated}>{this.formatTime(this.state.total_running_time).minutes}</p>
            <span>mins</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element secs-c'>
            <input
              name='value_sec'
              id="value_sec"
              type="number"
              value={this.state.value_sec}
              min="0"
              max="59"
              onChange={this.handleChange.bind(this)}
              className='big-text'
              hidden={!this.state.running && !this.state.timer_is_initiated ? false : true}
            />
            <p className='big-text' hidden={!this.state.timer_is_initiated}>{this.formatTime(this.state.total_running_time).seconds}</p>
            <span>secs</span>
          </div>
        </div>
        <div>
          <button
            onClick={this.handleStart.bind(this)}
            hidden={this.state.timer_is_initiated}
          >
            Start!
          </button>

          <button
            onClick={this.handlePause.bind(this)}
            hidden={(this.state.timer_is_initiated === false || this.state.running === false ? true : false)}
          >
            Pause
          </button>
          <button
            onClick={this.handlePause.bind(this)}
            hidden={(this.state.timer_is_initiated === false || this.state.running === true ? true : false)}
          >
            Resume!
          </button>
          <button
            onClick={this.handleReset.bind(this)}
            hidden={(this.state.timer_is_initiated === false || this.state.running === true ? true : false)}
          >
            RESET
          </button>
        </div>
        <p hidden={(this.state.timer_is_initiated === false || this.state.running === false ? true : false)}
        >PAUSED</p>
      </div >
    )
  }
}

export default CountdownTimer;