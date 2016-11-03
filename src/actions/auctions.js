import { encodeQueryString } from '../helpers';

function parseJSON(response) {
  return response.json();
}

export const retrieveAuctionById = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_AUCTION_BY_ID',
      payload: {
        isFetching: true
      }
    });

    return fetch(`/api/auctions/${id}`)
      .then(
        response => response.json()
      ).then(
        (auction) => {
          fetch(`/api/auctions/${id}/auctionItems`)
            .then(
              response => response.json()
            ).then(
              auctionItems => {
                dispatch({type: 'GET_AUCTION_BY_ID_FINISHED', payload: { ...auction, items: auctionItems._embedded.items }})
              }
            )
        },
        err => console.log('error occurred while retrieving')
      )
  };
};

export const retrieveAuctions = (page) => {
  return (dispatch) => {
    dispatch({
      type: 'GET_AUCTIONS_REQUEST',
      payload: {
        isFetching: true
      }
    });

    const params = {
      size: page.size,
      page: page.page
    };

    const query = encodeQueryString(params);

    return fetch('/api/auctions?' + query)
      .then(parseJSON)
      .then((json) => dispatch({ type: 'GET_AUCTIONS_FINISHED', json}));
  }
};