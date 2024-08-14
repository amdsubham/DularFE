import {createSlice} from '@reduxjs/toolkit';
import {cardsAsyncAction} from './cards-actions';
import {initialState} from './cards-state';

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(cardsAsyncAction.cardsRequest, state => {
      state.loading = true;
      delete state.error;
    });
    builder.addCase(
      cardsAsyncAction.cardsRequestSuccess,
      (state, {payload}) => {
        state.loading = false;
        state.cards = payload.cards;
        state.location = payload.location;
        delete state.error;
      },
    );
    builder.addCase(
      cardsAsyncAction.cardsRequestFailure,
      (state, {payload}) => {
        state.loading = false;
        state.error = payload;
        delete state.cards;
      },
    );
    builder.addCase(cardsAsyncAction.reset, () => {
      return initialState;
    });
  },
});

export const cardsSliceActions = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
