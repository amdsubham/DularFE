import {type UserModel} from '../../model/userSchema';

export interface CardsParams {
  distance: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface CardsState {
  loading: boolean;
  cards?: UserModel[];
  location?: any;
  error?: string;
}

export const initialState: CardsState = {
  loading: false,
};
