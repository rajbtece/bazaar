import * as actionTypes from './actionTypes';

function nodeReducer(state, action) {
  switch (action.type) {
    case actionTypes.REQUEST_NODE:
    case actionTypes.RECEIVE_NODE:
      return Object.assign({}, state, {
        node: action.node,
        loading: action.loading,
      });
      break;

    default:
      return Object.assign({}, state, {});
      break;
  }
}

export default nodeReducer;
