import { handleActions } from 'redux-actions';

import * as actions from './actions';

const pricesInitialState = {
  prices: [
    {
      instalments: 0, // This allows future support for custom prices per instalment
      price: null
    }
  ]
};

const initialState = {
  status: 'init',
  error: '',
  list: [pricesInitialState],
  ui: {}
};

const reducer = handleActions({
  [actions.onChangePrice.type]: (state, action) => {
    const list = [
      ...state.list,
    ];

    // Update price in list
    list[action.payload.id].prices[0] = { // It's always the first element since alternative prices are never saved to state
      ...state.list[action.payload.id].prices[0],
      price: Number(action.payload.price)
    };

    return {
      ...state,
      list
    };
  },

  [actions.addPrice.type]: (state, action) => ({
    ...state,
    list: [
      ...state.list,
      {
        prices: [
          {
            instalments: 0,
            price: null
          }
        ]
      }
    ]
  }),

  [actions.removePrice.type]: (state, action) => ({
    ...state,
    list: [
      ...state.list
        .filter((price, i) => i !== action.payload.id)
    ]
  }),

  [actions.cleanState.type]: (state, action) =>
    initialState

}, initialState);

export default reducer;
