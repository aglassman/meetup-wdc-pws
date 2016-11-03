import React from 'react';
import TrendingListItem from './TrendingListItem';

export default ({auctions}) => {
  let content = <span>Loading</span>;
  if (!auctions.isFetching) {
    content = auctions.list.map((auction) => {
      return (
        <TrendingListItem key={auction.id} auction={auction} />
      )
    });
  }
  return <div>{content}</div>;
};