import React, {FunctionComponent, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/core';
import {NavigationProps} from '../../../core/navigations/routes';
import SeekerRequestComponent from '../../components/messages/SeekerRequestComponent';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {useAuth} from '../../../data/redux-api/hook';
import {store} from '../../../core/redux/store';
import {authAsyncAction} from '../../../data/redux-api/auth/auth-actions';
import {regex} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';

const SeekerRequestList: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {goBack} = useNavigation<NavigationProps>();

  const {seekerRequests, user, updateUserRequest} = useAuth();

  useEffect(() => {
    updateUserRequest({seekerReadCount: seekerRequests.length});
    store.dispatch(authAsyncAction.getSeekerRequestsCount(0));
  }, [seekerRequests.length, updateUserRequest]);

  const renderData = () => {
    if (!regex.isPremiumUser(user?.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <FastImage
            source={require('../../../core/assets/seeker_heart.png')}
            style={{width: 65, height: 60}}
          />
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            See people who sent you requests with Legendbae Premium
          </Text>
        </View>
      );
    }

    if (seekerRequests.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            No request found for you.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={seekerRequests}
          extraData={seekerRequests}
          renderItem={({item}) => (
            <SeekerRequestComponent type={'others'} item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Seekers Request'} onLeftPress={goBack} />
      <View
        style={[
          styles.container,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        {renderData()}
      </View>
    </View>
  );
};

export {SeekerRequestList};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
});
