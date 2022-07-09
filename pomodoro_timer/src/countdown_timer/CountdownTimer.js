import React, { Component } from 'react'

class CountdownTimer extends Component {
  state = {
    original_time: 59000, // TODO: replace hard code: 5900 ms
    paused_time: 0
  }

  componentDidMount() {
    // ? Run When Component is created/inserted in DOM
    this.interval = setInterval(() => this.tick(), 10); // tick every ms
  }

  componentWillUnmount() {
    // ? Run function when component is destroyed/removed from DOM
    clearInterval(this.interval) // clear interval
  }

  tick() {
    this.setState(state => ({ original_time: state.original_time -= 10 }));
    console.log("current ms left:", this.state.original_time);
  }

  formatTime(secs) {
    let hours = Math.floor(secs / 3600 / 1000);
    let minutes = Math.floor(secs / 60 / 1000);
    let seconds = Math.floor(secs / 1000 % 60);

    return { hours, minutes, seconds }
  }

  handlePause(e) {
    this.setState(state => ({ paused_time: this.state.original_time }));

  }

  render() {
    return (
      <div>
        <h1>Name of the task here</h1>

        <div className='countdown-container'>
          <div className='countdown-element hours-c'>
            <p className='big-text'>{this.formatTime(this.state.original_time).hours}</p>
            <span>hours</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element mins-c'>
            <p className='big-text'>{this.formatTime(this.state.original_time).minutes}</p>
            <span>mins</span>
          </div>

          <div className='countdown-element'>
            <p className='big-text'>:</p>
          </div>

          <div className='countdown-element secs-c'>
            <p className='big-text'>{this.formatTime(this.state.original_time).seconds}</p>
            <span>secs</span>
          </div>
        </div>
        <button onClick={this.handlePause}>Pause!</button>
      </div >
    )
  }
}

export default CountdownTimer;