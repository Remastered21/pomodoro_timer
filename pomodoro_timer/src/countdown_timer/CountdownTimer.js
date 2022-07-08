import React, { Component } from 'react'

class CountdownTimer extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <h1>Name of the task here</h1>

                <div className='countdown-container'>
                    <div className='countdown-element hours-c'>
                        <p className='big-text'>0</p>
                        <span>hours</span>
                    </div>

                    <div className='countdown-element'>
                        <p className='big-text'>:</p>
                    </div>

                    <div className='countdown-element mins-c'>
                        <p className='big-text'>0</p>
                        <span>mins</span>
                    </div>

                    <div className='countdown-element'>
                        <p className='big-text'>:</p>
                    </div>

                    <div className='countdown-element secs-c'>
                        <p className='big-text'>0</p>
                        <span>secs</span>
                    </div>
                </div>
            </div >
        )
    }
}

export default CountdownTimer;