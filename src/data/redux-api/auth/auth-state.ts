import {type UserModel} from '../../model/userSchema';
import {FirebaseAuthTypes} from '@react-native-firebase/auth/lib/index';

export interface RequestAuthData {
  phone_number: string;
  callingCode: string[];
}

export type ConfirmationResult = FirebaseAuthTypes.ConfirmationResult;
export type UserCredential = FirebaseAuthTypes.UserCredential | null;
export type User = FirebaseAuthTypes.User;

export interface Confirmation extends RequestAuthData {
  confirmationResult: ConfirmationResult;
}

export interface AuthState {
  loading: boolean;
  confirmation?: Confirmation;
  error?: string;
  isAuthenicated: boolean;
  user?: UserModel;
  notifications: any[];
  notificationCount: number;
  mySendSeekerRequests: any[];
  seekerRequests: any[];
  seekerUnreadCount: number;
  peopleWhoLiked: any[];
  whoLikedUnreadCount: number;
  conversations: any[];
  conversationCount: number;
}

export const initialState: AuthState = {
  loading: false,
  isAuthenicated: false,
  notifications: [],
  notificationCount: 0,
  mySendSeekerRequests: [],
  seekerRequests: [],
  seekerUnreadCount: 0,
  peopleWhoLiked: [],
  whoLikedUnreadCount: 0,
  conversations: [],
  conversationCount: 0,
};
