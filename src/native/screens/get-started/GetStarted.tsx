import React, {FunctionComponent, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ASPECT_RATIO, TouchableFeedback, shadow} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native';
import {CommonButton} from '../../components/general/CommonButton';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {OrDash} from '../../components/orDash/OrDash';
import {RegisterInfo} from '../../components/general/RegisterInfo';
// import {
//   getFacebookData,
//   getGoogleData,
// } from '../../../data/redux-api/firestore/socialLogin';
import {useAuth} from '../../../data/redux-api/hook';
import {
  getFacebookData,
  getGoogleData,
} from '../../../data/redux-api/firestore/socialLogin';

const GetStarted: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate} = useNavigation<NavigationProps>();

  const {user, socialVerify} = useAuth();

  useEffect(() => {
    if (user) {
      if (user.stepCompleted === 8) {
        navigate('AddPhoto', {data: user});
      } else {
        navigate('RegistrationStep', {...user});
      }
    }
  }, [navigate, user]);

  const onNewAccountPress = () => {
    navigate('LoginAndRegister', {type: 1});
  };

  const onLoginPress = () => {
    navigate('LoginAndRegister', {type: 2});
  };

  const facebookPress = () => {
    getFacebookData()
      .then(response => {
        socialVerify(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const googlePress = () => {
    getGoogleData()
      .then(response => {
        socialVerify(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.iconView}>
            <FastImage
              source={require('./../../../core//assets/get_logo.png')}
              style={styles.logo}
            />
          </View>
          <Text style={[styles.titleText, {color: color.primaryColor}]}>
            Chat. Date. Invite.
          </Text>
          <CommonButton
            container={{marginTop: ASPECT_RATIO(45)}}
            backgroundColor={color.pinkColor}
            borderColor={color.pinkColor}
            textColor={color.backgroundColor}
            title={'Create New Account'}
            onPress={onNewAccountPress}
          />
          <CommonButton
            container={{marginTop: ASPECT_RATIO(10)}}
            backgroundColor={color.backgroundColor}
            borderColor={color.pinkColor}
            textColor={color.pinkColor}
            title={'Login'}
            onPress={onLoginPress}
          />
          <OrDash />
          <View style={styles.bottomView}>
            <View style={styles.bottomSocial}>
              <TouchableFeedback onPress={facebookPress}>
                <View
                  style={[
                    styles.socialView,
                    {marginRight: 15, backgroundColor: color.backgroundColor},
                  ]}>
                  <FastImage
                    source={require('./../../../core/assets/facebook.png')}
                    style={styles.socialIcon}
                  />
                </View>
              </TouchableFeedback>
              <TouchableFeedback onPress={googlePress}>
                <View
                  style={[
                    styles.socialView,
                    {marginLeft: 15, backgroundColor: color.backgroundColor},
                  ]}>
                  <FastImage
                    source={require('./../../../core/assets/google.webp')}
                    style={styles.socialIcon}
                  />
                </View>
              </TouchableFeedback>
            </View>
            <RegisterInfo />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {width: 129, height: 75},
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ASPECT_RATIO(45),
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  bottomView: {
    flex: 1,
  },
  bottomSocial: {flexDirection: 'row', justifyContent: 'center'},
  socialView: {
    borderRadius: ASPECT_RATIO(30),
    ...shadow(5),
  },
  socialIcon: {
    width: ASPECT_RATIO(28),
    height: ASPECT_RATIO(28),
    margin: 12,
  },
});

export {GetStarted};
