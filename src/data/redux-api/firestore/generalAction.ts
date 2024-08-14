import moment from 'moment';
import {seekerData} from '../../json/seekerData';
import {store} from '../../../core/redux/store';
import {regex} from '../../../utils/regex';

export function setFormatAsPerGiftedChatArray(response: any, otherUser: any) {
  let currentUser = store.getState().auth.user;
  const getMessages = response.docs.map((document: any) => {
    const firebaseData = document.data();

    const data = {
      _id: document.id,
      ...firebaseData,
      createdAt: moment.unix(firebaseData.createdAt).local(),
    };

    if (!firebaseData.system) {
      data.user =
        firebaseData.user._id === currentUser?.uid
          ? {
              ...firebaseData.user,
              name: currentUser?.name,
              avatar: regex.getProfilePic(currentUser?.photos),
            }
          : {
              ...firebaseData.user,
              name: otherUser.name,
              avatar: regex.getProfilePic(otherUser.photos),
            };
    }

    return data;
  });
  return getMessages;
}

export function getSeekerTitle(key: any) {
  return seekerData.find(function (o) {
    return o.key === key;
  });
}
