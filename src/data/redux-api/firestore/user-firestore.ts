import auth from '@react-native-firebase/auth';
import {from} from 'rxjs';
import {UserCredential} from '../auth/auth-state';
import {regex} from '../../../utils/regex';
import moment from 'moment';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore/lib/index';
import {getGeoHashRange} from '../../../utils/location';
import {usersCollection} from '.';

export type DocumentSnapshot =
  FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

export const createNewUser = (uid: string, parameter: any) => {
  return from(usersCollection.doc(uid).set(parameter));
};

export const getUserDetail = (uid: string) => {
  return from(usersCollection.doc(uid).get());
};

export const getFormattedUserData = (userCredential: UserCredential) => {
  let user = userCredential?.user;
  let providerId = userCredential?.additionalUserInfo?.providerId;
  let getUser = user;
  if (getUser) {
    let uid = getUser.uid;
    const userData = {
      uid: uid,
      name: regex.isEmpty(getUser.displayName) ? '' : getUser.displayName,
      email: regex.isEmpty(getUser.email) ? '' : getUser.email,
      profilePic: regex.isEmpty(getUser.photoURL) ? '' : getUser.photoURL,
      socialType:
        providerId === 'facebook.com'
          ? 'facebook'
          : providerId === 'google.com'
          ? 'google'
          : 'phone',
      stepCompleted: 0,
      notificationOn: true,
      matchOn: true,
      soundOn: true,
      online: true,
      status: 'Inactive',
      role: 'normal',
      createdAt: moment().utc().unix(),
      updatedAt: moment().utc().unix(),
    };
    return userData;
  }

  return getUser;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    let user = auth().currentUser;
    if (!regex.isEmpty(user)) {
      let uid = user?.uid;
      usersCollection
        .doc(uid)
        .get()
        .then((data: any) => {
          let getUser = data.response;
          if (getUser.exists) {
            resolve({user: getUser.data()});
          } else {
            reject({user: null});
          }
        });
    }
  });
};

export function updateUserInfoAction(uid: string, parameter: any) {
  return from(usersCollection.doc(uid).update(parameter));
}

export function discoverUsers(location: any, distance: number) {
  return new Promise((resolve, reject) => {
    const {latitude, longitude} = location;
    const range = getGeoHashRange(latitude, longitude, distance);

    usersCollection
      .where('location.geoHash', '>=', range.lower)
      .where('location.geoHash', '<=', range.upper)
      .onSnapshot(
        snapshot => {
          if (snapshot) {
            let data = [];
            for (let a in snapshot.docs) {
              data.push(snapshot.docs[a].data());
            }
            resolve(data);
          }
        },
        error => reject(error),
      );
  });
}

export function findUsers(location: any, distance: number) {
  return from(discoverUsers(location, distance));
}

export function getUserInfo(uid: string, data: any) {
  return new Promise((resolve, reject) => {
    usersCollection
      .doc(uid)
      .get()
      .then(response => {
        if (response.exists) {
          return resolve({response, data});
        }
        return reject(response);
      })
      .catch(error => {
        return reject(error);
      });
  });
}

export function deleteUser(uid: string) {
  return new Promise(resolve => {
    usersCollection
      .doc(uid)
      .delete()
      .then(() => {
        resolve(true);
      });
  });
}

export const authSignOut = () => {
  return new Promise((resolve, reject) => {
    let user = auth().currentUser;
    if (user) {
      auth()
        .signOut()
        .then(() => resolve(true))
        .catch(() => reject());
    }
  });
};
