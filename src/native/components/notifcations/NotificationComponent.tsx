import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import {useTheme} from '../../../core/hooks';
import {TouchableFeedback, regex} from '../../../utils/regex';
import {CommonButton} from '../general/CommonButton';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';

interface NotificationComponentProps {
  item: any;
}

const NotificationComponent: FunctionComponent<NotificationComponentProps> = ({
  item,
}: NotificationComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate} = useNavigation<NavigationProps>();

  const renderItem = () => {
    const {user, notification_type, address, createdAt, request_status} = item;

    if (notification_type === 'matches') {
      return (
        <View style={[styles.nameView]}>
          <Text style={[styles.likeText, {color: color.secondaryColor}]}>
            Congratulations!, You match with
            <Text
              style={[
                styles.nameText,
                {color: color.primaryColor},
              ]}>{` ${user.name}`}</Text>
          </Text>
          <Text
            style={[
              styles.timeText,
              {color: color.subSecondaryColor, marginTop: 8},
            ]}>
            {moment.unix(createdAt).local().fromNow(true)}
          </Text>
        </View>
      );
    }

    let getSubTitle = ' Sent you a request';
    return (
      <View style={[styles.nameView]}>
        <Text style={[styles.nameText, {color: color.primaryColor}]}>
          {`${user.name}${regex.getAge(user.DoB)}`}
          <Text style={[styles.likeText, {color: color.secondaryColor}]}>
            {getSubTitle}
          </Text>
        </Text>
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
            color={color.subPrimaryColor}
          />
          <Text
            style={[
              styles.timeText,
              {color: color.subSecondaryColor, marginLeft: 5},
            ]}>
            {address}
          </Text>
        </View>
        {request_status === '' && (
          <View style={[styles.requestView]}>
            <CommonButton
              container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
              innerContainer={{borderRadius: 5, paddingVertical: 8}}
              backgroundColor={color.backgroundColor}
              borderColor={color.borderColor}
              textColor={color.primaryColor}
              title={'Decline'}
              onPress={() => null}
            />
            <CommonButton
              container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
              innerContainer={{borderRadius: 5, paddingVertical: 8}}
              backgroundColor={color.pinkColor}
              borderColor={color.pinkColor}
              textColor={color.backgroundColor}
              title={'Accept'}
              onPress={() => null}
            />
          </View>
        )}
        <Text style={[styles.timeText, {color: color.subSecondaryColor}]}>
          {moment.unix(createdAt).local().fromNow(true)}
        </Text>
      </View>
    );
  };

  const {user} = item;

  if (!user) {
    return null;
  }

  return (
    <TouchableFeedback
      onPress={() => navigate('OtherProfile', {profileData: user})}>
      <View style={[styles.container, {borderColor: color.borderColor}]}>
        <FastImage
          source={{uri: regex.getProfilePic(user.photos)}}
          style={{width: 56, height: 56, borderRadius: 28}}
        />
        <View style={[styles.infoView]}>{renderItem()}</View>
      </View>
    </TouchableFeedback>
  );
};

export {NotificationComponent};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  nameView: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  likeText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '400',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
  },
  requestView: {
    flexDirection: 'row',
    marginVertical: 5,
    marginBottom: 10,
  },
});
