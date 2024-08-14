import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {TouchableFeedback, W_WIDTH, regex} from '../../../utils/regex';
import {ONLINE} from '../../../themes/constantColours';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {distance} from '../../../utils/location';

interface SeekerItemComponentProps {
  item: any;
  seeker: any;
  location: any;
}

const SeekerUserComponent = ({
  item,
  seeker,
  location,
}: SeekerItemComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableFeedback
      onPress={() =>
        navigate('SeekerSendRequest', {
          seeker: seeker,
          user: item,
        })
      }>
      <View style={[styles.container]}>
        <View
          style={[
            styles.innerView,
            {backgroundColor: color.textInputBackgroundColor},
          ]}>
          <FastImage
            source={{uri: regex.getProfilePic(item.photos)}}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
          <FastImage
            source={require('./../../../core/assets/blur_effect.png')}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
            }}
          />
          <View style={styles.bottomView}>
            <View style={[styles.bottomNameView]}>
              <Text style={[styles.nameText, {color: color.backgroundColor}]}>
                {item.name}
                {regex.getAge(item.DoB)}
              </Text>
            </View>
            <View style={[styles.bottomNameView]}>
              <Icon
                type={'feather'}
                name={'map-pin'}
                size={14}
                color={color.backgroundColor}
                style={{fontSize: 14, color: color.backgroundColor}}
              />
              <Text
                style={[
                  styles.locationText,
                  {color: color.backgroundColor, marginLeft: 5},
                ]}>
                {`${distance(item.location, location, 'K')}`} km away
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableFeedback>
  );
};

export default SeekerUserComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 177,
    width: W_WIDTH / 2 - 20,
    overflow: 'hidden',
  },
  innerView: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  bottomNameView: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
