function parseJSON(response) {
  return response.json();
}

export const retrieveAuctions = () => {
  return (dispatch) => {
    dispatch({
      type: 'GET_AUCTIONS_REQUEST',
      payload: {
        isFetching: true
      }
    });

    return fetch('/auctions')
      .then(parseJSON)
      .then((json) => dispatch({ type: 'GET_AUCTIONS_FINISHED', json}));
  }
};