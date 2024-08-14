import React, {FunctionComponent, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/core';
import {NavigationProps} from '../../../core/navigations/routes';
import {messages} from '../../../utils/messages';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {TouchableFeedback} from '../../../utils/regex';
import {White} from '../../../themes/constantColours';
import {useAuth} from '../../../data/redux-api/hook';
import {
  authSignOut,
  deleteUser,
} from '../../../data/redux-api/firestore/user-firestore';

const Settings: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();

  const {goBack, navigate} = useNavigation<NavigationProps>();
  const [notificationOn, setNotification] = useState(false);
  const [matchOn, setMatch] = useState(true);
  const [soundOn, setSound] = useState(true);

  const {user, updateUserRequest, resetAuth} = useAuth();

  useEffect(() => {
    setNotification(user?.notificationOn ?? false);
    setMatch(user?.matchOn ?? false);
    setSound(user?.soundOn ?? false);
  }, [user?.matchOn, user?.notificationOn, user?.soundOn]);

  const notificationSwitch = () => {
    setNotification(!notificationOn);
    updateUserRequest({notificationOn: !notificationOn});
  };

  const matchSwitch = () => {
    setMatch(!matchOn);
    updateUserRequest({matchOn: !matchOn});
  };

  const soundSwitch = () => {
    setSound(!soundOn);
    updateUserRequest({soundOn: !soundOn});
  };

  const okClick = () => {
    deleteUser(user?.uid ?? '').then(() => {
      authSignOut()
        .then(() => resetAuth())
        .catch(() => resetAuth());
    });
  };

  const onDeletePress = () => {
    Alert.alert(
      'Account Delete',
      messages.deleteMsg,
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {text: 'OK', onPress: okClick},
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Settings'} onLeftPress={goBack} />
      <View
        style={[
          styles.container,
          {backgroundColor: color.primaryBackgroundColor},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <TouchableFeedback onPress={() => navigate('AccountSetting')}>
            <View
              style={[styles.view, {backgroundColor: color.backgroundColor}]}>
              <Text style={[styles.text, {color: color.subPrimaryColor}]}>
                Account Settings
              </Text>
              <Icon
                type={'feather'}
                name={'chevron-right'}
                color={color.subSecondaryColor}
                style={{color: color.subSecondaryColor}}
              />
            </View>
          </TouchableFeedback>
          <View style={[styles.view, {backgroundColor: color.backgroundColor}]}>
            <Text style={[styles.text, {color: color.subPrimaryColor}]}>
              Notifications
            </Text>
            <Switch
              trackColor={{false: color.pinkColor, true: color.pinkColor}}
              thumbColor={White}
              ios_backgroundColor={'transparent'}
              onValueChange={notificationSwitch}
              value={notificationOn}
            />
          </View>
          <View style={[styles.view, {backgroundColor: color.backgroundColor}]}>
            <Text style={[styles.text, {color: color.subPrimaryColor}]}>
              Pause Matches
            </Text>
            <Switch
              trackColor={{false: color.pinkColor, true: color.pinkColor}}
              thumbColor={White}
              ios_backgroundColor={'transparent'}
              onValueChange={matchSwitch}
              value={matchOn}
            />
          </View>
          <View style={[styles.view, {backgroundColor: color.backgroundColor}]}>
            <Text style={[styles.text, {color: color.subPrimaryColor}]}>
              Match Sound
            </Text>
            <Switch
              trackColor={{false: color.pinkColor, true: color.pinkColor}}
              thumbColor={White}
              ios_backgroundColor={'transparent'}
              onValueChange={soundSwitch}
              value={soundOn}
            />
          </View>
          <View style={[styles.view, {backgroundColor: color.backgroundColor}]}>
            <Text style={[styles.text, {color: color.subPrimaryColor}]}>
              Rate this App
            </Text>
            <Icon
              type={'feather'}
              name={'chevron-right'}
              color={color.backgroundColor}
              style={{color: color.backgroundColor}}
            />
          </View>
          <View style={[styles.view, {backgroundColor: color.backgroundColor}]}>
            <Text style={[styles.text, {color: color.subPrimaryColor}]}>
              Share this App
            </Text>
            <Icon
              type={'feather'}
              name={'chevron-right'}
              color={color.backgroundColor}
              style={{color: color.backgroundColor}}
            />
          </View>
          <TouchableFeedback onPress={onDeletePress}>
            <View
              style={[styles.view, {backgroundColor: color.backgroundColor}]}>
              <Text style={[styles.text, {color: color.pinkColor}]}>
                Delete Account
              </Text>
              <Icon
                type={'feather'}
                name={'chevron-right'}
                color={color.backgroundColor}
                style={{color: color.backgroundColor}}
              />
            </View>
          </TouchableFeedback>
        </ScrollView>
      </View>
    </View>
  );
};

export {Settings};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    marginVertical: 3,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
});
