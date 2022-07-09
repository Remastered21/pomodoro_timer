import React, { Component } from 'react'

// TODO: Allow user to set the timer value
class CountdownTimer extends Component {

  /* Everything is done in ms (milliseconds!) */

  state = {
    original_time: 0, // TODO: replace hard code: 5900 ms
    running_time: 59000,
    timer_started: false,
    running: false,
    value: '' // ! Temporary; need to give state for each hr:min:sec
  }

  // componentDidMount() {
  //   // ? Run When Component is created/inserted in DOM
  // }

  // componentWillUnmount() {
  //   // ? Run function when component is destroyed/removed from DOM
  // }

  tick() {
    this.setState(state => ({ running_time: state.running_time -= 10 }));
  }

  formatTime(secs) {
    let hours = Math.floor(secs / 3600 / 1000);
    let minutes = Math.floor(secs / 60 / 1000);
    let seconds = Math.floor(secs / 1000 % 60);

    return { hours, minutes, seconds }
  }

  handleStart(e) {
    this.setState({ original_time: this.state.running_time })

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

  handleReset(e) {
    this.setState({
      running_time: this.state.original_time,
      running: false,
      timer_started: false,
      original_time: 0
    })
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      // FIXME: Separate components into "Timer setup" and "Running timer"
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
            <p className='big-text'>{this.formatTime(this.state.running_time).hours}</p>
            <span>hours</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element mins-c'>
            <p className='big-text'>{this.formatTime(this.state.running_time).minutes}</p>
            <span>mins</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element secs-c'>
            <p className='big-text'>{this.formatTime(this.state.running_time).seconds}</p>
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
          <button
            onClick={this.handleReset.bind(this)}
            hidden={(this.state.timer_started === false || this.state.running === true ? true : false)}
          >
            RESET
          </button>
        </div>
        <p hidden={this.state.running}>PAUSED</p>
      </div >
    )
  }
}

export default CountdownTimer;