import moment from 'moment';
import {notificationsCollection} from '.';
import {getUserInfo} from './user-firestore';
import {applicationStore} from '../../../core/redux/store';
import {store} from '../../../core/redux/store';
import {authAsyncAction} from '../auth/auth-actions';

export function createNewNotification(parameter: any) {
  return new Promise(resolve => {
    notificationsCollection
      .add({
        ...parameter,
        createdAt: moment().utc().unix(),
        status: 'Active',
      })
      .then(() => {
        resolve(true);
      });
  });
}

export function getNotificationLists(uid: string) {
  return new Promise(resolve => {
    notificationsCollection
      .where('to_user', '==', uid)
      .get()
      .then(res => {
        const userInfo = res.docs.map(doc => {
          const firebaseData = {
            id: doc.id,
            ...doc.data(),
          } as any;

          return getUserInfo(firebaseData.from_user, firebaseData);
        });

        Promise.all(userInfo).then((responseData: any) => {
          let response = [];
          for (let v in responseData) {
            let user = responseData[v].response._data;
            let data = responseData[v].data;
            response.push({
              user,
              ...data,
            });
          }

          let notificationReadCount =
            applicationStore?.getState().auth.user?.notificationReadCount;
          if (notificationReadCount !== undefined) {
            notificationReadCount = response.length - notificationReadCount;
          } else {
            notificationReadCount = response.length;
          }

          store.dispatch(
            authAsyncAction.getNotificationLists({
              data: response,
              count: notificationReadCount,
            }),
          );

          resolve(response);
        });
      });
  });
}

export function updateNotificationStatus(id: string, request_status: string) {
  return new Promise(resolve => {
    notificationsCollection
      .doc(id)
      .set({request_status: request_status}, {merge: true})
      .then(() => {
        resolve(true);
      });
  });
}

export function getAndUpdateNotificationItem(
  relationship_id: string,
  request_status: string,
) {
  return new Promise(() => {
    notificationsCollection
      .where('relationship_id', '==', relationship_id)
      .get()
      .then(response => {
        response.docs.map(doc => {
          updateNotificationStatus(doc.id, request_status);
        });
      });
  });
}
