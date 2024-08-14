import {useAppDispatch, useAppSelector} from '../../../core/redux/hooks';
import {authAsyncAction} from './auth-actions';
import {Confirmation, type RequestAuthData} from './auth-state';
import {
  getAuthenicated,
  getConfirmation,
  getConversationsList,
  getConversationsListCount,
  getError,
  getLoading,
  getMySendSeekerRequestsList,
  getNotificationsList,
  getNotificationsListCount,
  getPeopleWhoLikedList,
  getPeopleWhoLikedListCount,
  getSeekerRequestsList,
  getSeekerRequestsListCount,
  getUser,
} from './auth-selector';
import {type UserModel} from '../../model/userSchema';
import {alert} from '../../../utils/regex';
import {useCallback, useEffect} from 'react';

export interface UseAuthReturn {
  loading: boolean;
  confirmation?: Confirmation;
  error?: string;
  isAuthenicated: boolean;
  user?: UserModel;
  conversations: any[];
  conversationCount: number;
  peopleWhoLiked: any[];
  peopleWhoLikedCount: number;
  notifications: any[];
  notificationCount: number;
  seekerRequests: any[];
  seekerRequestsCount: number;
  mySendSeekerRequests: any[];
  loginRequest: (requestParams: RequestAuthData) => void;
  verifyCode: (payload: string) => void;
  socialVerify: (payload: any) => void;
  checkCurrentUser: () => void;
  updateUserRequest: (requestParams: any) => void;
  resetAuth(): void;
}

export const useAuth = (): UseAuthReturn => {
  const loading = useAppSelector(getLoading);
  const confirmation = useAppSelector(getConfirmation);
  const error = useAppSelector(getError);
  const isAuthenicated = useAppSelector(getAuthenicated);
  const user = useAppSelector(getUser);

  const conversations = useAppSelector(getConversationsList);
  const conversationCount = useAppSelector(getConversationsListCount);

  const mySendSeekerRequests = useAppSelector(getMySendSeekerRequestsList);

  const seekerRequests = useAppSelector(getSeekerRequestsList);
  const seekerRequestsCount = useAppSelector(getSeekerRequestsListCount);

  const notifications = useAppSelector(getNotificationsList);
  const notificationCount = useAppSelector(getNotificationsListCount);

  const peopleWhoLiked = useAppSelector(getPeopleWhoLikedList);
  const peopleWhoLikedCount = useAppSelector(getPeopleWhoLikedListCount);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(authAsyncAction.loginRequestFailure(undefined));
    }
  }, [dispatch, error]);

  const loginRequest = useCallback(
    (requestParams: RequestAuthData) => {
      return dispatch(authAsyncAction.loginRequest(requestParams));
    },
    [dispatch],
  );

  const verifyCode = useCallback(
    (payload: string) => {
      return dispatch(authAsyncAction.verifyCodeRequest(payload));
    },
    [dispatch],
  );

  const socialVerify = useCallback(
    (parameter: any) => {
      return dispatch(authAsyncAction.socialVerifyRequest(parameter));
    },
    [dispatch],
  );

  const checkCurrentUser = useCallback(() => {
    return dispatch(authAsyncAction.checkCurrentUserRequest());
  }, [dispatch]);

  const updateUserRequest = useCallback(
    (requestParams: any) => {
      return dispatch(authAsyncAction.updateUserRequest(requestParams));
    },
    [dispatch],
  );

  const resetAuth = useCallback(() => {
    return dispatch(authAsyncAction.reset());
  }, [dispatch]);

  return {
    loading,
    confirmation,
    error,
    isAuthenicated,
    user,
    conversations,
    conversationCount,
    mySendSeekerRequests,
    seekerRequests,
    seekerRequestsCount,
    notifications,
    notificationCount,
    peopleWhoLiked,
    peopleWhoLikedCount,
    loginRequest,
    verifyCode,
    socialVerify,
    checkCurrentUser,
    updateUserRequest,
    resetAuth,
  };
};
