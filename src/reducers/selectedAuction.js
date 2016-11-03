export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_AUCTION_BY_ID':
      return {
        isFetching: true
      };
    case 'GET_AUCTION_BY_ID_FINISHED':
      return { ...action.payload, isFetching: false };
    default:
      return state;
  }
};