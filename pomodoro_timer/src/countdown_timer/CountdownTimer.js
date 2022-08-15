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
    temp_value: '',
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
      console.log('TIME!');
    }
  }

  formatTime = (secs) => { // This function fires when timer is started.
    let hours = Math.floor(secs / 3600 / 1000);
    let minutes = Math.floor(secs / 60 / 1000 % 60);
    let seconds = Math.floor(secs / 1000 % 60);

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

  focus_shifter(current_focus) { // Switches focus from one input to another
    switch (current_focus) {
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
    // TODO: ignore inputs other than numbers
    this.setState({
      key_pressed: true,
      temp_value: e.key
    })
  }

  handleChange = (e) => {
    let { name, value, max, maxLength } = e.target;

    // * done
    this.setState({
      [name]: value,
      key_pressed: false,
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
        this.focus_shifter(name); // onBlur handles leading zeros
      }
    }

    // * done
    if (value.toString().length > 1 && this.state.key_pressed === true) { // When key is pressed + 2 digits are reached
      console.log("max char limit");
      this.setState({
        temp_value: '', // reset
        key_pressed: false // reset
      })
      this.focus_shifter(name)
    } else if (value.toString().length < 2 && this.state.key_pressed === false) { // add leading zero When key is not pressed (scrolled)
      this.setState({
        [name]: "0" + value,
        temp_value: '', // reset
        key_pressed: false // reset
      })
    }
  }

  handleOnFocus = e => {
    e.target.select();
  }

  handleScroll = e => {
    console.log(e.target.name)
    this.setState({
      key_pressed: false,
      // [e.target.name]: "0" + e.target.value
    })
  }

  handleBlur = e => {
    console.log('FOCUS OUT')
    let { name, value } = e.target;

    if (value === '') {
      this.setState({ // set the value to state
        [name]: '00'
      })
    }
    else if (value.toString().length === 1) {
      console.log("adding leading zero")
      this.setState({ // set the value to state
        [name]: "0" + value
      })
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
              name='value_hr'
              id="value_hr"
              type="number"
              value={this.state.value_hr}
              min={0}
              max={99}
              onKeyDown={this.handleKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleOnFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onScroll={this.handleScroll.bind(this)}
              className='big-text'
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
              onFocus={this.handleOnFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              className='big-text'
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
              onKeyDown={this.handleKeyDown.bind(this)}
              onChange={this.handleChange.bind(this)}
              onFocus={this.handleOnFocus.bind(this)}
              onBlur={this.handleBlur.bind(this)}
              onClick={this.handleOnFocus.bind(this)}
              className='big-text'
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