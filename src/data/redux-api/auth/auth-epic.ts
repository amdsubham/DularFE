import {from, iif, of} from 'rxjs';
import {catchError, filter, switchMap, withLatestFrom} from 'rxjs/operators';
import {type ApplicationEpic} from '../../../core/redux/epic';
import {authAsyncAction} from './auth-actions';
import auth from '@react-native-firebase/auth';
import {ConfirmationResult, UserCredential} from './auth-state';
import {
  createNewUser,
  getFormattedUserData,
  getUserDetail,
  updateUserInfoAction,
} from '../firestore/user-firestore';
import {UserModel} from '../../model/userSchema';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginWithPhoneEpic: ApplicationEpic = (epicActions, _) =>
  epicActions.pipe(
    filter(authAsyncAction.loginRequest.match),
    switchMap(({payload: {phone_number, callingCode}}) => {
      const phone = `+${callingCode[0]}${phone_number}`;
      return from(auth().signInWithPhoneNumber(phone)).pipe(
        switchMap((confirmationResult: ConfirmationResult) => {
          const verificationId = confirmationResult._verificationId; // Use the correct field name
          console.log('maska', verificationId);
          return from(
            AsyncStorage.setItem('verificationId', verificationId),
          ).pipe(
            switchMap(() =>
              of(
                authAsyncAction.loginRequestSuccess({
                  confirmationResult,
                  phone_number,
                  callingCode,
                }),
              ),
            ),
            catchError(storageError => {
              console.error('Error storing verificationId:', storageError);
              return of(
                authAsyncAction.loginRequestFailure(
                  'Failed to store verification ID.',
                ),
              );
            }),
          );
        }),
        catchError(error => {
          const err = error?.length > 0 ? error[0] : error;
          return of(authAsyncAction.loginRequestFailure(err.message));
        }),
      );
    }),
  );

export const verifyPhoneCodeEpic: ApplicationEpic<['auth']> = (
  epicActions,
  state,
) =>
  epicActions.pipe(
    filter(authAsyncAction.verifyCodeRequest.match),
    withLatestFrom(state),
    switchMap(([{payload: code}]) => {
      return from(AsyncStorage.getItem('verificationId')).pipe(
        switchMap(verificationId => {
          if (!verificationId) {
            return of(
              authAsyncAction.loginRequestFailure(
                'No verification ID found in AsyncStorage',
              ),
            );
          }
          console.log('verificationId', verificationId);
          // Retrieve the confirmation result using the stored verification ID
          return from(
            auth().signInWithCredential(
              auth.PhoneAuthProvider.credential(verificationId, code),
            ),
          ).pipe(
            switchMap((response: UserCredential) => {
              const user = getFormattedUserData(response);
              return getUserDetail(user?.uid ?? '').pipe(
                switchMap(document => {
                  return iif(
                    () => document.exists,
                    of(
                      authAsyncAction.verifyCodeRequestSuccess(
                        document.data() as UserModel,
                      ),
                    ),
                    createNewUser(user?.uid ?? '', user).pipe(
                      switchMap(() => {
                        return of(
                          authAsyncAction.verifyCodeRequestSuccess(
                            user as UserModel,
                          ),
                        );
                      }),
                      catchError(() => {
                        return of(
                          authAsyncAction.loginRequestFailure(
                            'Something went wrong',
                          ),
                        );
                      }),
                    ),
                  );
                }),
                catchError(() => {
                  return of(
                    authAsyncAction.loginRequestFailure('User does not exist!'),
                  );
                }),
              );
            }),
            catchError(error => {
              const err = error?.length > 0 ? error[0] : error;
              return of(authAsyncAction.loginRequestFailure(err.message));
            }),
          );
        }),
        catchError(storageError => {
          console.error(
            'Error retrieving verificationId from AsyncStorage:',
            storageError,
          );
          return of(
            authAsyncAction.loginRequestFailure(
              'Failed to retrieve verification ID.',
            ),
          );
        }),
      );
    }),
  );

export const verifySocialEpic: ApplicationEpic = (epicActions, state) =>
  epicActions.pipe(
    filter(authAsyncAction.socialVerifyRequest.match),
    withLatestFrom(state),
    switchMap(([{payload: parameter}]) => {
      const user = getFormattedUserData(parameter);
      return getUserDetail(user?.uid ?? '').pipe(
        switchMap(document => {
          return iif(
            () => document.exists,
            of(
              authAsyncAction.verifyCodeRequestSuccess(
                document.data() as UserModel,
              ),
            ),
            createNewUser(user?.uid ?? '', user).pipe(
              switchMap(() => {
                return of(
                  authAsyncAction.verifyCodeRequestSuccess(user as UserModel),
                );
              }),
              catchError(() => {
                return of(
                  authAsyncAction.loginRequestFailure('Something went wrong'),
                );
              }),
            ),
          );
        }),
        catchError(() => {
          return of(
            authAsyncAction.loginRequestFailure('User does not exist!'),
          );
        }),
      );
    }),
  );

export const checkCurrentUserEpic: ApplicationEpic = (epicActions, _) =>
  epicActions.pipe(
    filter(authAsyncAction.checkCurrentUserRequest.match),
    switchMap(() => {
      const user = auth().currentUser;
      return getUserDetail(user?.uid ?? '').pipe(
        switchMap(document => {
          return of(
            authAsyncAction.verifyCodeRequestSuccess(
              document.data() as UserModel,
            ),
          );
        }),
        catchError(() => {
          return of(authAsyncAction.reset());
        }),
      );
    }),
  );

export const updateUserInfoEpic: ApplicationEpic<['auth']> = (
  epicActions,
  state,
) =>
  epicActions.pipe(
    filter(authAsyncAction.updateUserRequest.match),
    withLatestFrom(state),
    switchMap(
      ([
        {payload: parameter},
        {
          auth: {user},
        },
      ]) => {
        const uid = user?.uid ?? '';
        return updateUserInfoAction(uid, parameter).pipe(
          switchMap(() => {
            return getUserDetail(uid).pipe(
              switchMap(document => {
                return of(
                  authAsyncAction.verifyCodeRequestSuccess(
                    document.data() as UserModel,
                  ),
                );
              }),
            );
          }),
        );
      },
    ),
  );
