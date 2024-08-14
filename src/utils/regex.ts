'use strict';

import {
  Alert,
  Dimensions,
  Platform,
  StatusBar,
  StatusBarStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import {TIMETEXTCOLOR} from '../themes/constantColours';

export const {OS} = Platform;
export const TouchableFeedback = TouchableWithoutFeedback;
export const alert = Alert.alert;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const W_HEIGHT = Dimensions.get('window').height;
export const W_WIDTH = Dimensions.get('window').width;

export const ASPECT_RATIO = (value: number) => (value * W_HEIGHT) / 568;
export const HEIGHT_RATIO = (value: number) => value * W_HEIGHT;

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV) {
  isIPhoneX =
    (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
    (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
}

export function getStatusBarHeight(skipAndroid?: boolean) {
  return Platform.select({
    ios: isIPhoneX ? 40 : 20,
    android: skipAndroid ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

export const Header_Height =
  getStatusBarHeight() + (Platform.OS === 'ios' ? 44 : 34);

export const shadow = (elevation = 4, spread = 5, offsetX = 0, offsetY = 0) =>
  Platform.select({
    ios: {
      shadowOffset: {
        width: offsetX,
        height: offsetY,
      },
      shadowOpacity: 0.5,
      shadowRadius: spread,
      shadowColor: TIMETEXTCOLOR,
    },
    android: {
      elevation: elevation,
    },
  });

export const MAX_CARD_SWIPE_LIMIT = 5;

export const regex = {
  isEmpty: (val: any) => {
    switch (val) {
      case '':
      case 0:
      case '0':
      case null:
      case false:
      case undefined:
      case typeof this === 'undefined':
        return true;
      default:
        return false;
    }
  },

  validateEmail: (val: string) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    );
  },

  validatePhoneNumber: (val: string) => {
    return /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/.test(val);
  },

  validatePassword: (val: string) => {
    return /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_]\S{5,16}$/.test(val);
  },

  validateUsername: (val: string) => {
    return /^[A-Za-z0-9_]{3,20}$/.test(val);
  },

  matchPassword: (val1: string, val2: string) => {
    if (val1 !== val2) {
      return false;
    } else {
      return true;
    }
  },

  hasNotch: () => {
    let hasNotch = false;
    // if (Platform.OS === 'android') {
    //   hasNotch = StatusBar.currentHeight > 24;
    // } else {
    //   hasNotch = StatusBar.currentHeight > 20;
    // }

    return hasNotch;
  },

  sortData: (property: any) => {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a: any, b: any) {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  },

  isInt: (n: unknown) => {
    return Number(n) === n && n % 1 === 0;
  },

  isFloat: (n: unknown) => {
    return Number(n) === n && n % 1 !== 0;
  },

  changeStatusStyle: (type: StatusBarStyle) => {
    // if (OS === 'android')
    //   StatusBar.setHidden(true);

    StatusBar.setBarStyle(type, true);
  },

  getProfilePic: (photos?: any) => {
    if (photos !== undefined) {
      if (photos.length > 0) {
        return photos[0].photoUrl;
      } else {
        return 'https://i7.uihere.com/icons/263/936/60/user-avatar-dad7b8c4dcef5018355540aed51e83ea.png';
      }
    } else {
      return 'https://i7.uihere.com/icons/263/936/60/user-avatar-dad7b8c4dcef5018355540aed51e83ea.png';
    }
  },

  getAge: (dob: string) => {
    if (dob) {
      let birthday = moment(dob, 'MM / DD / YYYY');
      let age = moment().diff(birthday, 'years');
      if (age > 0) {
        return `, ${age}`;
      } else {
        return '';
      }
    } else {
      return '';
    }
  },

  checkPremiumUser: (packageEndDate: string) => {
    return Boolean(packageEndDate);
  },

  getDayLeft: (packageEndDate: any) => {
    if (regex.checkPremiumUser(packageEndDate)) {
      let endDate = moment.unix(packageEndDate).local();
      let startData = moment();
      return endDate.diff(startData, 'days');
    } else {
      return 0;
    }
  },

  isPremiumUser: (packageEndDate: any) => {
    return regex.getDayLeft(packageEndDate) !== 0;
  },
};
