import React, {FunctionComponent, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  ASPECT_RATIO,
  TouchableFeedback,
  regex,
  shadow,
} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {CommonButton} from '../../components/general/CommonButton';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {useAuth} from '../../../data/redux-api/hook';
import FastImage from 'react-native-fast-image';
import {authSignOut} from '../../../data/redux-api/firestore/user-firestore';

const Menu: FunctionComponent<any> = () => {
  const {
    theme: {color},
  } = useTheme();
  const [state] = useState({
    data: [
      {
        id: 1,
        title: 'My Membership',
        count: 0,
      },
      {
        id: 2,
        title: 'Matches',
        count: 0,
      },
      {
        id: 3,
        title: 'Messages',
        count: 0,
      },
      {
        id: 4,
        title: 'Notifications',
        count: 0,
      },
      {
        id: 5,
        title: 'Seekers',
        count: 0,
      },
      {
        id: 6,
        title: 'Invite Friends',
        count: 0,
      },
      {
        id: 8,
        title: 'Terms and Conditions',
        count: 0,
      },
      {
        id: 9,
        title: 'Settings',
        count: 0,
      },
      {
        id: 10,
        title: 'Logout',
        count: 0,
      },
    ],
  });

  const {navigate, dispatch} = useNavigation<NavigationProps>();
  const {data} = state;
  const {
    user,
    notificationCount,
    conversationCount,
    updateUserRequest,
    resetAuth,
  } = useAuth();

  const onItemPress = (item: any) => {
    if (item.id !== 10) {
      dispatch(DrawerActions.closeDrawer());
    }

    if (item.id === 1) {
      navigate('Payments');
    } else if (item.id === 2) {
      navigate('Matches');
    } else if (item.id === 3) {
      navigate('MessagesList');
    } else if (item.id === 4) {
      navigate('Notifications');
    } else if (item.id === 5) {
      navigate('Seekers');
    } else if (item.id === 6) {
    } else if (item.id === 7) {
    } else if (item.id === 8) {
    } else if (item.id === 9) {
      navigate('Settings');
    } else if (item.id === 10) {
      updateUserRequest({online: false});
      setTimeout(() => {
        authSignOut()
          .then(() => resetAuth())
          .catch(() => resetAuth());
      }, 100);
    }
  };

  const renderItem = ({item, index}: any) => {
    let count = 0;
    if (item.id === 1) {
      count = regex.getDayLeft(user?.packageEndDate);
    } else if (item.id === 3) {
      count = conversationCount;
    } else if (item.id === 4) {
      count = notificationCount;
    }

    return (
      <TouchableFeedback onPress={() => onItemPress(item)}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#333333', fontWeight: '400'}}>
            {item.title}
          </Text>
          {index === 0 && count > 0 ? (
            <Text
              style={{
                marginLeft: 10,
                fontSize: 14,
                color: color.pinkColor,
                fontWeight: '800',
              }}>
              {count} days left
            </Text>
          ) : (
            count > 0 && (
              <View
                style={{
                  marginLeft: 10,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: color.pinkColor,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: color.backgroundColor,
                    fontWeight: '800',
                  }}
                />
              </View>
            )
          )}
        </View>
      </TouchableFeedback>
    );
  };

  const renderHeader = () => {
    return (
      <View style={{marginTop: ASPECT_RATIO(45)}}>
        <View style={[styles.imageView, {...shadow(5)}]}>
          <FastImage
            source={{uri: regex.getProfilePic(user?.photos ?? [])}}
            style={[styles.imageView]}
          />
        </View>
        <Text style={[styles.nameText, {color: color.primaryColor}]}>{`${
          user?.name
        }${regex.getAge(user?.DoB ?? '')}`}</Text>
        <CommonButton
          container={{
            marginTop: 10,
            marginBottom: 20,
            marginHorizontal: 0,
            width: 120,
          }}
          innerContainer={{paddingVertical: 10}}
          backgroundColor={color.primaryColor}
          borderColor={color.primaryColor}
          textColor={color.backgroundColor}
          title={'My Profile'}
          onPress={() => navigate('MyProfile')}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <View style={[styles.innerView]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          extraData={data}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export {Menu};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
    marginHorizontal: 20,
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  nameText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
  },
});
