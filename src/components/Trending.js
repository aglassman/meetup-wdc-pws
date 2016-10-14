import React from 'react';
import TrendingListItem from './TrendingListItem';

export default ({auctions}) => {
  const content = auctions.map((auction) => {
    return (
      <TrendingListItem key={auction.id} auction={auction} />
    )
  });
  return <div>{content}</div>
};