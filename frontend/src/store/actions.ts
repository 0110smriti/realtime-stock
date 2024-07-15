import axios from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

interface PriceData {
  _id: string;
  symbol: string;
  price: number;
  timestamp: string;
}

// Create an action to set the prices in the Redux store
export const setPrices = createAction<PriceData[]>('SET_PRICES');

export const fetchPrices = createAsyncThunk(
  'prices/fetchPrices',
  async (symbol: string, { dispatch }) => {
    try {
      const response = await axios.get<PriceData[]>(`http://localhost:5000/prices/${symbol}`);
      dispatch(setPrices(response.data));
    } catch (error) {
      console.error(error);
    }
  }
);
