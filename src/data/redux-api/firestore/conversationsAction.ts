import moment from 'moment';
import {store} from '../../../core/redux/store';
import {conversationsCollection} from '.';
import {getAllMatchesLists} from './user-matches';
import {authAsyncAction} from '../auth/auth-actions';

export function createNewConversation(id: string, members: string[]) {
  return new Promise((resolve, reject) => {
    conversationsCollection
      .doc(id)
      .set({
        matches_id: id,
        members,
        latestMessage: {
          text: '',
          createdAt: moment().utc().unix(),
        },
        status: 'Active',
      })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

export function getAllConversationLists(uid: string) {
  return new Promise(resolve => {
    getAllMatchesLists(uid).then((response: any) => {
      if (response.length > 0) {
        let getConversations = response.map(function (o: any) {
          return o.customId;
        });

        conversationsCollection
          .where('matches_id', 'in', getConversations)
          .onSnapshot(snapshot => {
            if (snapshot) {
              let docs: any = snapshot.docs;
              let conversations = [];
              let conversationUnreadCount = 0;
              for (let v in docs) {
                let data = {
                  ...docs[v]._data,
                };
                let obj = response.find(
                  (o: any) => o.customId === data.matches_id,
                );
                data.user = obj.user;

                let latestMessage = data.latestMessage;
                const {createdAt} = latestMessage;
                let checkRead = data[uid] ? data[uid] < createdAt : true;
                if (checkRead) {
                  conversationUnreadCount += 1;
                }

                conversations.push(data);
              }

              store.dispatch(
                authAsyncAction.getConversations({
                  data: conversations,
                  count: conversationUnreadCount,
                }),
              );
              resolve(conversations);
            }
          });
      }
    });
  });
}

export function updateLatestMessageInConversation(id: string, data: any) {
  return new Promise(() => {
    let parameter: any = {};
    let createdAt = moment().utc().unix();
    parameter[data.user._id] = createdAt;
    parameter.latestMessage = {
      ...data,
      createdAt,
    };
    conversationsCollection
      .doc(id)
      .set(parameter, {merge: true})
      .then(() => {});
  });
}

export function readMessageInConversation(id: string, uid: string) {
  return new Promise(() => {
    let parameter: any = {};
    parameter[uid] = moment().utc().unix();
    conversationsCollection
      .doc(id)
      .set(parameter, {merge: true})
      .then(() => {});
  });
}

export function addMessageInConversation(id: string, parameter: any) {
  return new Promise(resolve => {
    conversationsCollection
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
