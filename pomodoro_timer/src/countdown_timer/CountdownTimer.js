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
    temp_value_typed: '',
    key_pressed: false
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
    }
  }

  formatTime = (ms) => { // This function fires when timer is started.
    let hours = Math.floor(ms / 3600 / 1000);
    let minutes = Math.floor(ms / 60 / 1000 % 60);
    let seconds = Math.floor(ms / 1000 % 60);

    // if minutes is < 10, add leading zero
    // if seconds is < 10, add leading zero
    // if (hours < 10) {
    //   hours = "0" + hours
    // }

    if (minutes < 10) {
      minutes = "0" + minutes
    }

    if (seconds < 10) {
      seconds = "0" + seconds
    }

    return { hours, minutes, seconds }
  }

  shiftFocus(name_currentFocus) { // Switches focus from one input to another
    switch (name_currentFocus) {
      case "value_hr":
        // focus to min
        this.min_input.current.focus();
        break;

      case "value_min":
        // focus to sec
        this.sec_input.current.focus();
        break;

      default:
        break;
    }
  }

  clockStart = (e) => {
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

  clockPause = (e) => {
    if (!this.state.running) {
      this.interval = setInterval(() => this.tick(), 10); // tick every ms
      this.setState({ running: true });
    } else {
      clearInterval(this.interval) // clear interval
      this.setState({ running: false });
    }
  }

  clockReset = (e) => {
    this.setState({
      running: false,
      timer_is_initiated: false,
    })
  }

  handleKeyDown = (e) => {
    // save key pressed as temp_value
    // handleChange() is called after this function is complete
    console.log("keydown fired");
    // TODO: ignore inputs other than numbers
    this.setState({
      key_pressed: true,
      temp_value: e.key
    })
  }
  
  handleChange = (e) => {
    // called after handleKeyDown() function is finished.
    // reset temp_value
    // 
    
    let { name, value, max, maxLength } = e.target;
  
    // * done
    this.setState({
      [name]: value,
      temp_value: false
    })
  
    if (value.toString().length > maxLength) { // If new input will exceed 3 digit
      console.log("maxLength Firing")
      if (name === "value_sec" && this.state.temp_value > max.toString()[0]) {
        this.setState({
          [name]: "0" + this.state.temp_value,
          temp_value: '', // reset
          key_pressed: false // reset
        })
      } else {
        this.setState({
          [name]: this.state.temp_value,
          temp_value: '',
          key_pressed: false // reset
  
        })
        return false;
      }
    }
  
    // * done
    if (this.state.temp_value > max.toString()[0]) { // if the input exceeds first digit of max value
      if (name === "value_sec") {
        this.setState({
          [name]: "0" + this.state.temp_value,
          temp_value: '', // reset
          key_pressed: false // reset
        })
      } else {
        this.shiftFocus(name); // onBlur handles leading zeros
      }
    }
  
    // * done
    if (value.toString().length > 1 && this.state.key_pressed === true) { // When key is pressed + 2 digits are reached
      console.log("max char limit");
      this.setState({
        temp_value: '', // reset
        key_pressed: false // reset
      })
      this.shiftFocus(name)
    } else if (value.toString().length < 2 && this.state.key_pressed === false) { // add leading zero When key is not pressed (scrolled)
      this.setState({
        [name]: "0" + value, 
        temp_value: '', // reset
        key_pressed: false // reset
      })
    }
  }
  
  // * When field in focus
  handleOnFocus = e => {
    // Select all
    e.target.select();
  }

  handleScroll = e => {
    this.setState({
      key_pressed: false,
      // [e.target.name]: "0" + e.target.value
    })
  }

  // * when input field is unfocused (clicked out or focus is moved to next field)
  handleBlur = e => {
    let { name, value } = e.target;

    if (value === '') {
      this.setState({ // set the value to state
        [name]: '00'
      })
    }
    else if (value.toString().length === 1) {
      this.setState({ // set the value to state
        [name]: "0" + value
      })
    }
  }

  handleAddTime = (time, e) => {
    switch (time) {
      case 10:
        this.handleChange("value_min", time,)
      case 1:

      case 15:

      default:
        return

    }
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
              maxLength={2}
              ref={this.hr_input}
              name='value_hr'
              id="value_hr"
              type="number"
              value={this.state.value_hr}
              min={0}
              max={99}
              onKeyDown={this.handleKeyDown.bind(this)}
              onChange={e => this.handleChange(e)} // better way
              onFocus={this.handleOnFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onScroll={this.handleScroll.bind(this)}
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
              maxLength={2}
              ref={this.min_input}
              name='value_min'
              id="value_min"
              type="number"
              value={this.state.value_min}
              min="0"
              max="59"
              onKeyDown={this.handleKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleOnFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
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
              maxLength={2}
              ref={this.sec_input}
              name='value_sec'
              id="value_sec"
              type="number"
              value={this.state.value_sec}
              min="0"
              max="59"
              onKeyDown={this.handleKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleOnFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onClick={e => this.handleOnFocus(e)}
              className='big-text'
              hidden={!this.state.running && !this.state.timer_is_initiated ? false : true}
            />
            <p className='big-text' hidden={!this.state.timer_is_initiated}>{this.formatTime(this.state.total_running_time).seconds}</p>
            <span>secs</span>
          </div>
        </div>
        <div>
          <button
            onClick={this.clockStart.bind(this)}
            hidden={this.state.timer_is_initiated}
          >
            Start!
          </button>

          <button
            onClick={this.clockPause.bind(this)}
            hidden={(this.state.timer_is_initiated === false || this.state.running === false ? true : false)}
          >
            Pause
          </button>
          <button
            onClick={this.clockPause.bind(this)}
            hidden={(this.state.timer_is_initiated === false || this.state.running === true ? true : false)}
          >
            Resume!
          </button>
          <button
            onClick={this.clockReset.bind(this)}
            hidden={(this.state.timer_is_initiated === false || this.state.running === true ? true : false)}
          >
            RESET
          </button>
        </div>
        <p hidden={(this.state.timer_is_initiated === false || this.state.running === true ? true : false)}
        >PAUSED</p>

        <div>
          <div
            onClick={this.handleAddTime.bind(this, 10)}
          >
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