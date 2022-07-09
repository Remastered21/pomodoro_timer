import React, { Component } from 'react'

class CountdownTimer extends Component {

  /* Everything is done in ms (milliseconds!) */

  state = {
    original_time: 59000, // TODO: replace hard code: 5900 ms
    paused_time: 0,
    running: false
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
    this.setState({ running: true });
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

  render() {
    return (
      // FIXME: Create as new component
      <div>
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
        <button onClick={this.handleStart.bind(this)}>Start!</button>
        <button onClick={this.handlePause.bind(this)}>Pause!</button>
      </div >
    )
  }
}

export default CountdownTimer;