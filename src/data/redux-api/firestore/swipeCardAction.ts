import moment from 'moment';
import {swipeCardsCollection} from '.';
import {addSwipeMatch} from './user-matches';
import {getUserInfo} from './user-firestore';
import {applicationStore, store} from '../../../core/redux/store';
import {authAsyncAction} from '../auth/auth-actions';

export function checkOtherUserSwipeExits(uid: string, other_uid: string) {
  return new Promise(resolve => {
    swipeCardsCollection
      .where('uid', '==', other_uid)
      .where('other_uid', '==', uid)
      .where('action', 'in', ['like', 'superLike'])
      .get()
      .then(snapshot => {
        if (snapshot) {
          resolve(snapshot.docs);
        }
      });
  });
}

export function swipeCardUser(uid: string, other_uid: string, action: any) {
  return new Promise((resolve, reject) => {
    swipeCardsCollection
      .doc(`${uid}${other_uid}`)
      .set(
        {
          uid,
          other_uid,
          action,
          createdAt: moment().utc().unix(),
          status: 'Active',
        },
        {merge: true},
      )
      .then(() => {
        checkOtherUserSwipeExits(uid, other_uid).then((responseData: any) => {
          if (
            responseData.length > 0 && [
              action === 'like' || action === 'superLike',
            ]
          ) {
            addSwipeMatch(uid, other_uid).then(response => resolve(response));
          } else {
            reject(false);
          }
        });
      });
  });
}

export function getWhoLikedMeLists(uid: string) {
  return new Promise(resolve => {
    swipeCardsCollection
      .where('other_uid', '==', uid)
      .where('action', '==', 'like')
      .onSnapshot((snapshot: any) => {
        if (snapshot) {
          let usersInfo = [];
          for (let v in snapshot.docs) {
            let data = snapshot.docs[v]._data;
            usersInfo.push(getUserInfo(data.uid, data));
          }

          Promise.all(usersInfo).then((responseData: any) => {
            let response = [];
            for (let v in responseData) {
              let user = responseData[v].response._data;
              let data = responseData[v].data;
              response.push({
                user,
                ...data,
              });
            }

            let likedReadCount =
              applicationStore?.getState().auth.user?.likedReadCount;
            if (likedReadCount !== undefined) {
              likedReadCount = response.length - likedReadCount;
            } else {
              likedReadCount = response.length;
            }

            store.dispatch(
              authAsyncAction.getUserLiked({
                data: response,
                count: likedReadCount,
              }),
            );
            resolve(response);
          });
        }
      });
  });
}
