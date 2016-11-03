import moment from 'moment';

const initialState = {
  isFetching: true,
  list: [],
  page: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  }
};

const auctionReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_AUCTIONS_FINISHED':
    case 'GET_AUCTION_BY_ID_FINISHED':
      return {
        id: action.payload.id,
        name: action.payload.auctionName,
        startDate: moment(action.payload.auctionStart),
        endDate: moment(action.payload.auctionEnd),
        description: action.payload.description,
        items: action.payload.items ? action.payload.items : []
      };
    default:
      return state;
  }
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
        list: action.json._embedded.auctions.map((auction) => auctionReducer({}, { type: action.type, payload: auction }))
      };
    default:
      return state;
  }
};