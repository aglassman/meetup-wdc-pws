import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrendingListItem from './TrendingListItem';

import { retrieveAuctions } from '../actions/auctions';

class Trending extends Component {

  componentDidMount() {
    this.props.retrieveAuctions(this.props.auctions.page);
  }

  render() {
    let content = <span>Loading</span>;
    if (!this.props.auctions.isFetching) {
      content = this.props.auctions.list.map((auction) => {
        return (
          <TrendingListItem key={auction.id} auction={auction} />
        )
      });
    }
    return <div className="trending-list container">{content}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auctions: state.auctions
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveAuctions: (page) => {
      dispatch(retrieveAuctions(page));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Trending);