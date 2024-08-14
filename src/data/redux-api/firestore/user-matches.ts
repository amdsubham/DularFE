import moment from 'moment';
import {matchesCollection} from '.';
import {getUserInfo} from './user-firestore';
import {createNewNotification} from './notificationsAction';
import {
  createNewConversation,
  getAllConversationLists,
} from './conversationsAction';

export function checkMatchExits(uid: string, other_uid: string) {
  return new Promise(resolve => {
    matchesCollection
      .where('members', 'in', [
        [uid, other_uid],
        [other_uid, uid],
      ])
      .onSnapshot(snapshot => {
        if (snapshot) {
          resolve(snapshot.docs);
        }
      });
  });
}

export function addSwipeMatch(uid: string, other_uid: string) {
  return new Promise((resolve, reject) => {
    checkMatchExits(uid, other_uid).then((response: any) => {
      if (response.length === 0) {
        let customId = `${uid}${other_uid}`;
        matchesCollection
          .doc(customId)
          .set(
            {
              customId,
              uid,
              other_uid,
              last_swipe_by: uid,
              members: [uid, other_uid],
              createdAt: moment().utc().unix(),
              status: 'Active',
            },
            {merge: true},
          )
          .then(() => {
            createNewNotification({
              relationship_id: customId,
              notification_type: 'matches',
              to_user: other_uid,
              from_user: uid,
            });
            createNewConversation(customId, [uid, other_uid]);
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      } else {
        resolve(false);
      }
    });
  });
}

function getUserMatch(data: any) {
  return new Promise(resolve => {
    matchesCollection
      .where(data.key, '==', data.value)
      .get()
      .then(snapshot => {
        if (snapshot) {
          resolve(snapshot.docs);
        }
      });
  });
}

export function getAllMatchesLists(uid: string, isGetConversation?: boolean) {
  return new Promise(resolve => {
    let add = [];
    add.push(getUserMatch({key: 'uid', value: uid}));
    add.push(getUserMatch({key: 'other_uid', value: uid}));

    Promise.all(add).then(response => {
      let userInfoAction = [];
      for (let a in response) {
        let data: any = response[a];
        for (let v in data) {
          let snapData = data[v].data();
          let getUID = snapData.uid === uid ? snapData.other_uid : snapData.uid;
          userInfoAction.push(getUserInfo(getUID, snapData));
        }
      }

      Promise.all(userInfoAction).then((responseData: any) => {
        let matches = [];
        for (let v in responseData) {
          let data = responseData[v].data;
          matches.push({
            user: responseData[v].data(),
            ...data,
          });
        }

        if (isGetConversation) {
          getAllConversationLists(uid);
        }

        resolve(matches);
      });
    });
  });
}
