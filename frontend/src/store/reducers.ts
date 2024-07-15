import { createReducer } from '@reduxjs/toolkit';
import { setPrices } from './actions';

interface PriceState {
  prices: {
    _id: string;
    symbol: string;
    price: number;
    timestamp: string;
  }[];
}

const initialState: PriceState = {
  prices: []
};

const priceReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPrices, (state, action) => {
    state.prices = action.payload;
  });
});

export default priceReducer;


