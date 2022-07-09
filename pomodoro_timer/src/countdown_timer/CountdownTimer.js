import React, { Component } from 'react'

class CountdownTimer extends Component {

  /* Everything is done in ms (milliseconds!) */

  state = {
    original_time: 59000, // TODO: replace hard code: 5900 ms
    paused_time: 0,
    timer_started: false,
    running: false,
    value: ''
  }

  // componentDidMount() {
  //   // ? Run When Component is created/inserted in DOM
  // }

  // componentWillUnmount() {
  //   // ? Run function when component is destroyed/removed from DOM
  // }

  tick() {
    this.setState(state => ({ paused_time: state.paused_time -= 10 }));
  }

  formatTime(secs) {
    let hours = Math.floor(secs / 3600 / 1000);
    let minutes = Math.floor(secs / 60 / 1000);
    let seconds = Math.floor(secs / 1000 % 60);

    return { hours, minutes, seconds }
  }

  handleStart(e) {
    // TODO: make the button disappear when timer starts
    this.setState({ paused_time: this.state.original_time })
    setTimeout(function () {
      console.log("Executed after 1 second");
      this.interval = setInterval(() => this.tick(), 10); // tick every ms
    }.bind(this), 1000);

    this.setState({
      timer_started: true,
      running: true
    });
  }

  handlePause(e) {
    if (!this.state.running) {
      this.interval = setInterval(() => this.tick(), 10); // tick every ms
      this.setState({ running: true });
    } else {
      clearInterval(this.interval) // clear interval
      this.setState({ running: false });
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      // FIXME: Create as new component
      <div>
        <div className='user-input'>
          <form onSubmit={this.handleStart}>
            <label>
              Hour:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          </form>
        </div>

        <h1>Name of the task here</h1>

        <div className='countdown-container'>
          <div className='countdown-element hours-c'>
            <p className='big-text'>{this.formatTime(this.state.paused_time).hours}</p>
            <span>hours</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element mins-c'>
            <p className='big-text'>{this.formatTime(this.state.paused_time).minutes}</p>
            <span>mins</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element secs-c'>
            <p className='big-text'>{this.formatTime(this.state.paused_time).seconds}</p>
            <span>secs</span>
          </div>
        </div>
        <div>
          <button
            onClick={this.handleStart.bind(this)}
            hidden={this.state.timer_started}
          >
            Start!
          </button>

          <button
            onClick={this.handlePause.bind(this)}
            hidden={(this.state.timer_started === false || this.state.running === false ? true : false)}
          >
            Pause
          </button>
          <button
            onClick={this.handlePause.bind(this)}
            hidden={(this.state.timer_started === false || this.state.running === true ? true : false)}
          >
            Resume!
          </button>
        </div>
        <p hidden={this.state.running}>PAUSED</p>
      </div >
    )
  }
}

export default CountdownTimer;