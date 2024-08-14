import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ASPECT_RATIO} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {CommonButton} from '../../components/general/CommonButton';
import {useRoute} from '@react-navigation/native';
import {RouteProps} from '../../../core/navigations/routes';

type CongratulationsRouteParams = {
  photoData: any;
  data: any;
};

const Congratulations: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {
    params: {photoData, data},
  } = useRoute<RouteProps<'Congratulations'>>();
  const discoverNowPress = () => {};

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <View style={styles.iconView}>
        <FastImage
          source={{uri: photoData[0].path}}
          style={{width: 150, height: 150, borderRadius: 75}}
        />
        <Text style={[styles.logoText, {color: color.secondaryColor}]}>
          {data.name}
        </Text>
      </View>
      <View style={[styles.bottomView]}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <FastImage
            source={require('./../../../core/assets/congo.png')}
            style={{width: 60, height: 62}}
          />
          <Text style={[styles.congoText, {color: color.secondaryColor}]}>
            Congratulations!
          </Text>
          <Text style={[styles.messageText, {color: color.subPrimaryColor}]}>
            You have successfully completed your profile
          </Text>
        </View>
        <CommonButton
          container={{marginBottom: ASPECT_RATIO(60)}}
          backgroundColor={color.pinkColor}
          borderColor={color.pinkColor}
          textColor={color.backgroundColor}
          title={'Discover Now'}
          onPress={discoverNowPress}
        />
      </View>
    </View>
  );
};

export {Congratulations};
export type {CongratulationsRouteParams};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '500',
  },
  bottomView: {
    flex: 1,
  },
  congoText: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: '800',
  },
  messageText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '400',
  },
});
