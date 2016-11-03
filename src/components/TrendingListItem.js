import React from 'react';
import { Link } from 'react-router';
import './TrendingListItem.css';

export default ({auction}) => {
  return (
    <div className="trending-list-item-container">
      <div className="row">
        <div className="container-header col-md-7"><Link to={`/auction/${auction.id}`}>{auction.name}</Link></div>
      </div>
      <div>
        <hr/>
        <div className="container-description">{auction.description}</div>
      </div>

    </div>
  );
};