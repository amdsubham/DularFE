import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {regex, shadow, TouchableFeedback} from '../../../utils/regex';
import {CommonButton} from '../../components/general/CommonButton';
import {useTheme} from '../../../core/hooks';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {ONLINE} from '../../../themes/constantColours';
import {distance} from '../../../utils/location';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';

interface CongraMatchModalProps {
  uid: any;
  data: any;
  location: any;
  onClose: (data: any) => void;
}

const CongraMatchModal: FunctionComponent<CongraMatchModalProps> = ({
  uid,
  location,
  data,
  onClose,
}: any) => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate} = useNavigation<NavigationProps>();

  const onClosePress = () => {
    onClose();
  };

  const onSendMessagePress = () => {
    onClosePress();
    let matches_id = `${uid}${data.uid}`;
    navigate('Chat', {
      conversationId: matches_id,
      user: data,
      type: 'messages',
    });
  };

  const onKeepExploringPress = () => {
    onClose();
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        title={'Congratulations!'}
        titleStyle={{fontSize: 14, fontWeight: '400'}}
        leftView={
          <TouchableFeedback onPress={onClosePress}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'x'}
                size={28}
                color={color.subSecondaryColor}
                style={{fontSize: 28, color: color.subSecondaryColor}}
              />
            </View>
          </TouchableFeedback>
        }
      />
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        <Text style={[styles.matchTitleText, {color: color.pinkColor}]}>
          {"It's Match"}
        </Text>
        <View style={[styles.cardView]}>
          <View
            style={[
              styles.cardInnerView,
              {
                backgroundColor: color.backgroundColor,
                borderColor: color.subSecondaryColor,
              },
            ]}>
            <FastImage
              source={{uri: regex.getProfilePic(data.photos)}}
              style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}
            />
            <FastImage
              source={require('./../../../core/assets/blur_effect.png')}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                borderRadius: 20,
                overflow: 'hidden',
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}>
              <View
                style={{position: 'absolute', right: 0, left: 0, bottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {data.online && <View style={styles.onlineView} />}
                  <Text
                    style={[styles.nameText, {color: color.backgroundColor}]}>
                    {data.name}
                    {regex.getAge(data.DoB)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  <Icon
                    type={'feather'}
                    name={'map-pin'}
                    size={16}
                    color={color.backgroundColor}
                    style={{fontSize: 16, color: color.backgroundColor}}
                  />
                  <Text
                    style={[
                      styles.locationText,
                      {color: color.backgroundColor, marginLeft: 5},
                    ]}>
                    {`${distance(data.location, location, 'K')}`} km away
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <CommonButton
          container={{marginVertical: 10}}
          backgroundColor={color.pinkColor}
          borderColor={color.pinkColor}
          textColor={color.backgroundColor}
          title={'Send message'}
          onPress={onSendMessagePress}
        />
        <CommonButton
          container={{marginVertical: 10, marginBottom: 20}}
          backgroundColor={color.backgroundColor}
          borderColor={color.pinkColor}
          textColor={color.pinkColor}
          title={'Keep exploring'}
          onPress={onKeepExploringPress}
        />
      </View>
    </View>
  );
};

export default CongraMatchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
  },
  matchTitleText: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  cardView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardInnerView: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    ...shadow(),
  },
  onlineView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '800',
  },
});
