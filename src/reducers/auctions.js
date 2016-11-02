import moment from 'moment';

const initialState = {
  isFetching: true,
  list: [],
  page: {
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
  }
};

const mapResponse = (response) => {
  return response._embedded.auctions.map((auction) => {
    return {
      id: auction.id,
      name: auction.auctionName,
      startDate: moment(auction.auctionStart),
      endDate: moment(auction.auctionEnd),
      description: auction.description
    }
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_AUCTIONS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'GET_AUCTIONS_FINISHED':
      return {
        ...state,
        isFetching: false,
        list: mapResponse(action.json)
      };
    default:
      return state;
  }
};