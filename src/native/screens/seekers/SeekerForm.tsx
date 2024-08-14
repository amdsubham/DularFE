import React, {FunctionComponent, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {alert, HEIGHT_RATIO, regex, W_WIDTH} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../core/hooks';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {CommonButton} from '../../components/general/CommonButton';
import {White} from '../../../themes/constantColours';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {messages} from '../../../utils/messages';
import {useAuth} from '../../../data/redux-api/hook';
import moment from 'moment';
import {sendSeekerRequest} from '../../../data/redux-api/firestore/seekerAction';
import {distance} from '../../../utils/location';
import {useAppSelector} from '../../../core/redux/hooks';
import {getLocation} from '../../../data/redux-api/cards/cards-selector';

type SeekerFormRouteParams = {
  seeker: any;
  user: any;
};

const SeekerForm: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {goBack, dispatch} = useNavigation<NavigationProps>();
  const {
    params: {seeker, user},
  } = useRoute<RouteProps<'SeekerSendRequest'>>();
  const [state, setState] = useState({
    selectedCategory: 'Choose a category',
    dateTime: '',
    address: '',
    note: '',
    isChat: true,
  });

  const location = useAppSelector(getLocation);
  const {user: auth} = useAuth();

  const {selectedCategory, dateTime, note, address, isChat} = state;

  // const handleDatePicked = (date: any) => {
  //   setState({
  //     ...state,
  //     dateTime: date,
  //   });
  // };

  // const hideDateTimePicker = () => {};

  const chatSwitch = (chat: boolean) => {
    setState({...state, isChat: chat});
  };

  const postPress = () => {
    if (!dateTime) {
      alert(messages.seekerDate);
    } else if (!address) {
      alert(messages.seekerAddress);
    } else {
      let parameter = {
        request_to: user.uid,
        request_by: auth?.uid,
        date: moment(dateTime).unix(),
        address,
        note,
        isChat,
        seekerKey: seeker.key,
        status: 'Active',
        request_status: '',
      };
      sendSeekerRequest(parameter).then(() => {
        dispatch(StackActions.popToTop());
      });
    }
  };

  const {title} = seeker;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={title} onLeftPress={goBack} />
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
            </View>
            <View style={{alignItems: 'center'}}>
              {/* <TimePicker
                style={[
                  styles.dateInputView,
                  {backgroundColor: color.textInputBackgroundColor},
                ]}
                customStyles={{
                  dateInput: {borderWidth: 0},
                  dateText: {color: color.subPrimaryColor},
                }}
                okText={'Done'}
                cancelText={'Cancel'}
                mode={'datetime'}
                placeholder={'Select date & time'}
                is24Hour={false}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
                format={'ddd h:mm a, DD MMM YYYY'}
                minDate={new Date()}
                date={dateTime}
                ref="TimePicker"
              /> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
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
            <TextInput
              style={[
                styles.addressTextInput,
                {
                  color: color.subPrimaryColor,
                  backgroundColor: color.textInputBackgroundColor,
                },
              ]}
              value={address}
              placeholder="Enter full address"
              placeholderTextColor={color.subPrimaryColor}
              multiline={true}
              numberOfLines={3}
              onChangeText={(value: string) =>
                setState({
                  selectedCategory,
                  dateTime,
                  note,
                  address: value,
                  isChat,
                })
              }
            />
            <View style={{marginVertical: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
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
              <TextInput
                style={[
                  styles.bioTextInput,
                  {
                    color: color.subPrimaryColor,
                    backgroundColor: color.textInputBackgroundColor,
                  },
                ]}
                value={note}
                placeholder="Type something here..."
                placeholderTextColor={color.subPrimaryColor}
                multiline={true}
                numberOfLines={5}
                onChangeText={(value: string) =>
                  setState({
                    selectedCategory,
                    dateTime,
                    note: value,
                    address,
                    isChat,
                  })
                }
              />
            </View>
            <View style={[styles.itemView, {borderColor: color.borderColor}]}>
              <Text
                style={[styles.commonTitleText, {color: color.primaryColor}]}>
                {'You need to chat?'}
              </Text>
              <View style={[styles.rightRowView]}>
                <Switch
                  trackColor={{false: color.pinkColor, true: color.pinkColor}}
                  thumbColor={White}
                  ios_backgroundColor={'transparent'}
                  onValueChange={chatSwitch}
                  value={isChat}
                />
              </View>
            </View>
            <CommonButton
              container={{marginVertical: 20, marginHorizontal: 0}}
              backgroundColor={color.pinkColor}
              borderColor={color.pinkColor}
              textColor={color.backgroundColor}
              title={'Post'}
              onPress={postPress}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export {SeekerForm};
export type {SeekerFormRouteParams};

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
  dateInputView: {
    width: W_WIDTH - 40,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
  },
  addressTextInput: {
    flex: 1,
    height: 70,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  bioTextInput: {
    flex: 1,
    height: 100,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  itemView: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commonTitleText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
