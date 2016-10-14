import React from 'react';
import './TrendingListItem.css';

import AuctionCountdown from '../containers/AuctionCountdown';

export default ({auction}) => {
  return (
    <div className="trending-list-item-container">
      <div className="row">
        <div className="container-header col-md-7">{auction.name}</div>
        <AuctionCountdown auction={auction} />
      </div>
      <div>
        <hr/>
        <div className="container-description">{auction.description}</div>
      </div>

    </div>
  );
};