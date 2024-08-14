import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HEIGHT_RATIO, regex} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/core';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {CommonButton} from '../../components/general/CommonButton';
import {updateSeekerRequestStatus} from '../../../data/redux-api/firestore/seekerAction';
import {getAndUpdateNotificationItem} from '../../../data/redux-api/firestore/notificationsAction';
import {getSeekerTitle} from '../../../data/redux-api/firestore/generalAction';
import {distance} from '../../../utils/location';
import {useAppSelector} from '../../../core/redux/hooks';
import {getLocation} from '../../../data/redux-api/cards/cards-selector';
import moment from 'moment';

type SeekerDetailRouteParams = {
  item: any;
};

const SeekerDetail: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {
    params: {item},
  } = useRoute<RouteProps<'SeekerDetail'>>();

  const {goBack} = useNavigation<NavigationProps>();

  const location = useAppSelector(getLocation);

  const {user, date, address, note, seekerKey, request_status} = item;
  const seeker = getSeekerTitle(seekerKey);

  const onRequestStatusPress = (status: any) => {
    const {seeker_id} = item;
    updateSeekerRequestStatus(seeker_id, status);
    getAndUpdateNotificationItem(seeker_id, status);
    if (status === 'declined') {
      goBack();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={seeker?.title} onLeftPress={goBack} />
      <View style={[styles.innerView]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={[styles.innerView, {padding: 20}]}>
            <View
              style={[
                styles.userView,
                {backgroundColor: color.secondaryColor},
              ]}>
              <FastImage
                source={{uri: regex.getProfilePic(user.photos)}}
                style={{width: null, height: HEIGHT_RATIO(0.45)}}
              />
              <FastImage
                source={require('./../../../core/assets/seekerphotogradient.png')}
                style={{
                  width: null,
                  height: HEIGHT_RATIO(0.45),
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  marginHorizontal: 20,
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: color.backgroundColor,
                    fontWeight: '800',
                  }}>{`${user.name}${regex.getAge(user.DoB)}`}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Icon
                    type={'feather'}
                    name={'map-pin'}
                    size={14}
                    color={color.backgroundColor}
                    style={{fontSize: 14, color: color.backgroundColor}}
                  />
                  <Text
                    style={[
                      styles.timeText,
                      {color: color.backgroundColor, marginLeft: 5},
                    ]}>
                    {`${distance(user.location, location, 'K')}`} km away
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Icon
                type={'feather'}
                name={'calendar'}
                size={16}
                color={color.subPrimaryColor}
                style={{fontSize: 16, color: color.subPrimaryColor}}
              />
              <Text style={[styles.timeText, {color: color.subPrimaryColor}]}>
                {' '}
                Date & Time:{' '}
              </Text>
              <Text style={[styles.timeText, {color: color.primaryColor}]}>
                {moment.unix(date).local().format('ddd, D MMM YYYY, hh:mm a')}
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type={'feather'}
                  name={'map-pin'}
                  size={16}
                  color={color.subPrimaryColor}
                  style={{fontSize: 16, color: color.subPrimaryColor}}
                />
                <Text style={[styles.timeText, {color: color.subPrimaryColor}]}>
                  {' '}
                  Location:{' '}
                </Text>
              </View>
              <Text
                style={[
                  styles.timeText,
                  {marginTop: 5, color: color.primaryColor},
                ]}>
                {address}
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type={'feather'}
                  name={'file-text'}
                  size={16}
                  color={color.subPrimaryColor}
                  style={{fontSize: 16, color: color.subPrimaryColor}}
                />
                <Text style={[styles.timeText, {color: color.subPrimaryColor}]}>
                  {' '}
                  Note:{' '}
                </Text>
              </View>
              <Text
                style={[
                  styles.timeText,
                  {marginTop: 5, color: color.primaryColor},
                ]}>
                {note}
              </Text>
            </View>
            {request_status === '' && (
              <View style={[styles.requestView]}>
                <CommonButton
                  container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                  innerContainer={{borderRadius: 5, paddingVertical: 13}}
                  backgroundColor={color.backgroundColor}
                  borderColor={color.borderColor}
                  textColor={color.primaryColor}
                  title={'Decline'}
                  onPress={() => onRequestStatusPress('declined')}
                />
                <CommonButton
                  container={{flex: 1, marginHorizontal: 0}}
                  innerContainer={{borderRadius: 5, paddingVertical: 13}}
                  backgroundColor={color.pinkColor}
                  borderColor={color.pinkColor}
                  textColor={color.backgroundColor}
                  title={'Accept'}
                  onPress={() => onRequestStatusPress('accepted')}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export {SeekerDetail};
export type {SeekerDetailRouteParams};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
  userView: {
    height: HEIGHT_RATIO(0.45),
    borderRadius: 5,
    overflow: 'hidden',
  },
  requestView: {
    flexDirection: 'row',
    marginVertical: 5,
    marginBottom: 15,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
