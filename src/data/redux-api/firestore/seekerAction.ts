import moment from 'moment';
import {createNewNotification} from './notificationsAction';
import {seekerRequestCollection} from '.';
import {getUserInfo} from './user-firestore';
import {applicationStore, store} from '../../../core/redux/store';
import {authAsyncAction} from '../auth/auth-actions';

export function sendSeekerRequest(parameter: any) {
  return new Promise(resolve => {
    seekerRequestCollection
      .add({
        ...parameter,
        createdAt: moment().utc().unix(),
      })
      .then((response: any) => {
        if (response._documentPath) {
          if (response._documentPath._parts) {
            let parts = response._documentPath._parts;
            if (parts.length > 1) {
              let seeker_id = parts[1];
              createNewNotification({
                relationship_id: seeker_id,
                notification_type: 'seeker',
                to_user: parameter.request_to,
                from_user: parameter.request_by,
                seekerDate: parameter.date,
                address: parameter.address,
                seekerKey: parameter.seekerKey,
                request_status: parameter.request_status,
              });
            }
          }
        }
        resolve(true);
      });
  });
}

export function getSeekerRequestLists(id: string) {
  return new Promise(resolve => {
    seekerRequestCollection
      .where('request_to', '==', id)
      .where('request_status', 'in', ['', 'accepted'])
      .onSnapshot(snapshot => {
        const usersInfo = snapshot.docs.map(doc => {
          const firebaseData: any = {
            seeker_id: doc.id,
            ...doc.data(),
          };
          return getUserInfo(firebaseData.request_by, firebaseData);
        });

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

          let seekerReadCount =
            applicationStore?.getState().auth.user?.seekerReadCount;
          if (seekerReadCount !== undefined) {
            seekerReadCount = response.length - seekerReadCount;
          } else {
            seekerReadCount = response.length;
          }

          store.dispatch(
            authAsyncAction.getSeekerRequests({
              data: response,
              count: seekerReadCount,
            }),
          );
          resolve(response);
        });
      });
  });
}

export function getMySeekerRequestLists(id: string) {
  return new Promise(resolve => {
    seekerRequestCollection
      .where('request_by', '==', id)
      .onSnapshot(snapshot => {
        const usersInfo = snapshot.docs.map(doc => {
          const firebaseData: any = {
            seeker_id: doc.id,
            ...doc.data(),
          };
          return getUserInfo(firebaseData.request_to, firebaseData);
        });

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
          store.dispatch(authAsyncAction.mySeekerRequests({data: response}));
          resolve(response);
        });
      });
  });
}

export function updateSeekerRequestStatus(id: string, request_status: any) {
  return new Promise(resolve => {
    seekerRequestCollection
      .doc(id)
      .set({request_status: request_status}, {merge: true})
      .then(() => {
        resolve(true);
      });
  });
}

export function deleteSeekerRequest(id: string) {
  return new Promise(resolve => {
    seekerRequestCollection
      .doc(id)
      .delete()
      .then(() => {
        resolve(true);
      });
  });
}

export function updateLatestMessageInSeeker(id: string, parameter: any) {
  return new Promise(() => {
    seekerRequestCollection
      .doc(id)
      .set(
        {
          latestMessage: {
            ...parameter,
            createdAt: moment().utc().unix(),
          },
        },
        {merge: true},
      )
      .then(() => {});
  });
}

export function addMessageInSeeker(id: string, parameter: any) {
  return new Promise(resolve => {
    seekerRequestCollection
      .doc(id)
      .collection('Messages')
      .add({
        ...parameter,
        createdAt: moment().utc().unix(),
      })
      .then(() => {
        resolve(true);
      });
  });
}
