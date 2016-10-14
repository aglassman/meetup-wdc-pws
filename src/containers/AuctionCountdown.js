import React, { Component } from 'react';
import { debounce } from 'lodash';
import moment from 'moment';

export default class AuctionCountdown extends Component {

  constructor (props) {
    super(props);

    this.getTimeLeft = debounce(this.getTimeLeft, 1000);
    this.formatTimeLeft = this.formatTimeLeft.bind(this);
  }

  componentWillMount() {
    this.setState({
      timeLeft: this.formatTimeLeft()
    });

    this.getTimeLeft();
  }

  formatTimeLeft() {
    const { endDate } = this.props.auction;
    const value = endDate.diff(moment(), 'seconds');

    if (value < 0) { return 'Expired'; }

    let timeLeft = '',
        runningTotal = value;

    const daysLeft = Math.floor(runningTotal / (86400));

    if (daysLeft) {
      timeLeft += `${daysLeft} day(s)`;
      return timeLeft;
    }

    const hoursLeft = Math.floor(runningTotal / (3600));

    if (hoursLeft > 0) {
      timeLeft += ` ${hoursLeft} hours`;
      runningTotal -= (hoursLeft * 3600);
    }

    const minutesLeft = Math.floor(runningTotal / 60);

    if (minutesLeft > 0) {
      timeLeft += ` ${minutesLeft} minutes`;
      runningTotal -= (minutesLeft * 60);
    }



    return timeLeft + ` ${runningTotal} seconds`;
  }

  getTimeLeft() {
    this.setState({
      timeLeft: this.formatTimeLeft()
    });

    this.getTimeLeft();
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <div className="col-md-5">Auction Ends In: {timeLeft}</div>
    );
  }

}