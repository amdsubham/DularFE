import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import {ASPECT_RATIO, alert, regex} from '../../../utils/regex';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {useTheme} from '../../../core/hooks';
import {CommonButton} from '../../components/general/CommonButton';
import {BORDER} from '../../../themes/constantColours';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {RegisterInfo} from '../../components/general/RegisterInfo';
import {messages} from '../../../utils/messages';
import {useAuth} from '../../../data/redux-api/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginAndRegisterRouteParams = {
  type: number;
};

const LoginAndRegister: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {
    params: {type},
  } = useRoute<RouteProps<'LoginAndRegister'>>();
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState(['1']);
  const [phone_number, setPhoneNumber] = useState('');
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const {loginRequest, confirmation, loading} = useAuth();

  useEffect(() => {
    const checkConfirmationResult = async () => {
      try {
        const verificationId = await AsyncStorage.getItem('verificationId');
        console.log('mdskmdskd', verificationId);
        if (verificationId) {
          navigate('Verification', {type, callingCode, phone_number});
        }
      } catch (error) {
        console.error('Error retrieving verificationId:', error);
      }
    };

    checkConfirmationResult();
  }, [callingCode, navigate, confirmation, phone_number, type]);

  const nextPress = () => {
    if (regex.isEmpty(phone_number)) {
      alert(messages.enterPhoneNumber);
    } else {
      let phone = `+${callingCode}${phone_number}`;

      if (regex.validatePhoneNumber(phone)) {
        loginRequest({callingCode, phone_number});
      } else {
        alert('Invalid Phone Number');
      }
    }
  };

  const joinNowPress = () => {
    Keyboard.dismiss();
    setCallingCode(['1']);
    setCountryCode('US');
    setPhoneNumber('');
    if (type === 1) {
      navigate('LoginAndRegister', {type: 2});
    } else {
      navigate('LoginAndRegister', {type: 1});
    }
  };

  let title = 'Log In';
  let subTitle = 'Enter your phone number to Log In';
  let infoText = "Don't have an account yet? ";
  let actionText = 'Join Now';
  if (type === 1) {
    title = 'Create new account';
    subTitle = 'Enter your phone number to Sign Up';
    infoText = 'Already have an account? ';
    actionText = 'Log In';
  }

  return (
    <View
      pointerEvents={loading ? 'none' : 'auto'}
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent onLeftPress={goBack} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={[styles.titleText, {color: color.primaryColor}]}>
            {title}
          </Text>
          <Text style={[styles.subTitleText, {color: color.subPrimaryColor}]}>
            {subTitle}
          </Text>
          <View style={styles.textView}>
            <View style={styles.countryCode}>
              <CountryPicker
                containerButtonStyle={styles.countryCode}
                onSelect={value => {
                  setCallingCode(value.callingCode);
                  setCountryCode(value.cca2);
                }}
                countryCode={countryCode as CountryCode}
                withCallingCodeButton={true}
                withFlag={true}
                withEmoji={true}
                withFilter={true}
                withCallingCode={true}
                withFlagButton={false}
                withAlphaFilter={true}
                translation={'common'}
              />
            </View>
            <View
              style={[
                styles.textInput,
                {backgroundColor: color.backgroundColor},
              ]}>
              <TextInput
                style={{flex: 1, color: color.primaryColor}}
                value={phone_number}
                placeholder="Phone Number"
                placeholderTextColor={color.primaryColor}
                keyboardType={'phone-pad'}
                maxLength={15}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
          <CommonButton
            loading={loading}
            container={{marginTop: 30}}
            backgroundColor={color.pinkColor}
            borderColor={color.pinkColor}
            textColor={color.backgroundColor}
            title={'Next'}
            onPress={nextPress}
          />
          <View
            style={{
              marginHorizontal: 20,
              marginTop: ASPECT_RATIO(45),
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={[styles.againText, {color: color.subPrimaryColor}]}>
              {infoText}
            </Text>
            <Text
              style={[
                styles.againText,
                {color: color.pinkColor, fontWeight: '600'},
              ]}
              onPress={joinNowPress}>
              {actionText}
            </Text>
          </View>
          <RegisterInfo />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    fontSize: 26,
    fontWeight: '800',
  },
  subTitleText: {
    marginHorizontal: 20,
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '400',
  },
  textView: {
    marginHorizontal: 20,
    marginTop: ASPECT_RATIO(50),
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: BORDER,
    backgroundColor: BORDER,
    height: 55,
    borderRadius: 28,
    overflow: 'hidden',
    alignItems: 'center',
  },
  countryCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 75,
  },
  textInput: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  againText: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export {LoginAndRegister};
export type {LoginAndRegisterRouteParams};
