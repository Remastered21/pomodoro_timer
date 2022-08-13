import React, { Component } from 'react'

// STRETCH: if typed value exceeds 59, revert to last value typed.
// STRETCH: remember timer value from last time (use cookie)
class CountdownTimer extends Component {

  // ! Everything is done in ms (milliseconds!)

  state = {
    total_running_time: 0,
    timer_is_initiated: false,
    running: false,
    value_hr: '00',
    value_min: '00',
    value_sec: '00',
  }

  min_input = React.createRef();
  sec_input = React.createRef();

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
      alert("TIME!");
      console.log('TIME!');
    }
  }

  formatTime = (secs) => {
    let hours = Math.floor(secs / 3600 / 1000);
    let minutes = Math.floor(secs / 60 / 1000 % 60);
    let seconds = Math.floor(secs / 1000 % 60);

    // if minutes is < 10, add leading zero
    // if seconds is < 10, add leading zero
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }

    return { hours, minutes, seconds }
  }

  focus(time_type) {

    switch (time_type) {
      case "value_hr":
        this.min_input.current.focus();
        console.log("focus to min")
        break;

      case "value_min":
        this.sec_input.current.focus();
        console.log("focus to sec")
        break;

      default:
        break;
    }
  }

  handleStart = (e) => {
    const totalTime = (Number(this.state.value_hr) * 3600 + Number(this.state.value_min) * 60 + Number(this.state.value_sec) + 1) * 1000 // done in millisecond, 1 second is buffer
    this.setState({
      total_running_time: totalTime,
    })

    this.interval = setInterval(() => this.tick(), 10); // tick every ms

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

  handleKeyDown = (e) => {
    // handles focus change of the input field
    console.log("keydown fired");
    if (e.key > 5) { // we skip to next field since next input after this will be over 60
      console.log("keydown > 5")
      this.setState({
        [e.target.name]: "0" + e.key
      })
      this.focus(e.target.name);
    } else if (e.target.value.toString().length > 1 && e.key >= 0) {
      console.log("over 59")
      this.setState({
        [e.target.name]: parseInt(e.target.value.toString() + e.key.toString())
      })
      this.focus(e.target.name);
    }
  }

  handleChange = (e) => {
    console.log("change of field handled")
    let { name, value } = e.target;
    let parsed_value = parseInt(value);
    // console.log("key pressed", e.key)

    switch (name) { // set max value depending on type (name) of value
      case "value_hr":
        if (parsed_value.toString().length > 1) {
          this.focus(name);
        }
        break;

      case "value_min":
        // If next typed digit will make the value >= 60, focus the next input field.
        // FIXME: scrolling will cause focus shift past 6
        // console.log("parsed value", parsed_value);
        // console.log("strign length", parsed_value.toString().length);
        if (parsed_value > 59 && parsed_value.toString().length > 1) {
          console.log("condition met");
          this.focus(name);
        }
        break;

      case "value_sec":
        // console.log(parsed_value)
        if (parsed_value > 5) { //
          e.target.select();
          value = this.state.value_sec // revert to previous digit
        }
        break;

      default:
        break;
    }

    if (parsed_value < 10) { // add leading zeroes when single digit
      value = "0" + parsed_value;
    }
    else if (parsed_value > 9) { // parse it back to string (leading zero removed)
      value = parsed_value.toString();
    }

    console.log("value: ", value)
    this.setState({ // set the value to state
      [name]: value
    })
  }

  handleFocus = e => {
    e.target.select();
  }

  render() {
    return (
      // FIXME: Separate components into "Timer setup" and "Running timer"
      // FIXME: Separate functions and rendered element components
      <div className='page-container'>
        <h1>Name of the task here</h1>

        <div className='countdown-container'>
          <div className='countdown-element hours-c'>

            <input // HOUR
              name='value_hr'
              id="value_hr"
              type="number"
              value={this.state.value_hr}
              min={0}
              max={99}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              className='big-text'
              placeholder='00'
              maxLength={2}
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
              ref={this.min_input}
              name='value_min'
              id="value_min"
              type="number"
              value={this.state.value_min}
              min="0"
              max="59"
              onKeyDown={this.handleKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              className='big-text'
              placeholder='00'
              maxLength={2}
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
              ref={this.sec_input}
              name='value_sec'
              id="value_sec"
              type="number"
              value={this.state.value_sec}
              min="0"
              max="59"
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
              className='big-text'
              placeholder='00'
              maxLength={2}
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
        <p hidden={(this.state.timer_is_initiated === false || this.state.running === true ? true : false)}
        >PAUSED</p>

        <div>
          <div>
            Add 10 min
          </div>
          <div>
            Add 1 min
          </div>
          <div>
            Add 15 sec
          </div>
        </div>
      </div >
    )
  }
}

export default CountdownTimer;