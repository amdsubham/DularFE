import {createSelector} from '@reduxjs/toolkit';
import {type ApplicationState} from '../../../core/redux/state';

const getCardsState = ({cards}: ApplicationState) => cards;

export const getCard = createSelector(
  getCardsState,
  cards => {
    return cards;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getLoading = createSelector(
  getCard,
  card => {
    return card.loading;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getCards = createSelector(
  getCard,
  card => {
    return card.cards ?? [];
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getLocation = createSelector(
  getCard,
  card => {
    return card.location ?? {};
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);

export const getError = createSelector(
  getCard,
  card => {
    return card.error;
  },
  {
    devModeChecks: {identityFunctionCheck: 'never'},
  },
);
