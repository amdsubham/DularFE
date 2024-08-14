import {createAction} from '@reduxjs/toolkit';
import {type ActionsFromObject} from '../../../core/redux/actions';
import {Confirmation, type RequestAuthData} from './auth-state';
import {UserModel} from '../../model/userSchema';

export const authAsyncAction = {
  loginRequest: createAction<RequestAuthData>('auth/LOGIN_REQUEST'),
  loginRequestSuccess: createAction<Confirmation>('auth/LOGIN_REQUEST/SUCCESS'),
  loginRequestFailure: createAction<string | undefined>(
    'auth/LOGIN_REQUEST/FAILURE',
  ),
  verifyCodeRequest: createAction<string>('auth/VERIFY_CODE_REQUEST'),
  socialVerifyRequest: createAction<any>('auth/social/VERIFY_REQUEST'),
  verifyCodeRequestSuccess: createAction<UserModel>(
    'auth/VERIFY_CODE_REQUEST/SUCCESS',
  ),
  checkCurrentUserRequest: createAction('auth/CURRENT_USER_REQUEST'),
  updateUserRequest: createAction<any>('auth/user/UPDATE_REQUEST'),
  getNotificationLists: createAction<any>('auth/user/NOTIFICATION_REQUEST'),
  mySeekerRequests: createAction<any>('auth/user/my/SEEKER_REQUEST'),
  getSeekerRequests: createAction<any>('auth/user/SEEKER_REQUEST'),
  getSeekerRequestsCount: createAction<any>('auth/user/SEEKER_REQUEST/COUNT'),
  getUserLiked: createAction<any>('auth/user/LIKED_REQUEST'),
  getConversations: createAction<any>('auth/user/COVERSATION_REQUEST'),
  reset: createAction('auth/reset'),
};

export type AuthActions = ActionsFromObject<typeof authAsyncAction>;
