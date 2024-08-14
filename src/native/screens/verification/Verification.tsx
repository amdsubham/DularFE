import {useNavigation} from '@react-navigation/native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {NavigationProps} from '../../../core/navigations/routes';
import {Black, White} from '../../../themes/constantColours';
import {
  ASPECT_RATIO,
  W_WIDTH,
  alert,
  regex,
  shadow,
} from '../../../utils/regex';
import {CommonButton} from '../../components/general/CommonButton';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {useTheme} from '../../../core/hooks';
import {messages} from '../../../utils/messages';
import {useAuth} from '../../../data/redux-api/hook';

type VerificationRouteParams = {
  type: number;
  phone_number: string;
  callingCode: string[];
};

const Verification: FunctionComponent = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const {
    theme: {color},
  } = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const {verifyCode, confirmation, user, isAuthenicated, loading, resetAuth} =
    useAuth();

  useEffect(() => {
    console.log('mugga', user);
    if (user) {
      if (user.stepCompleted === 9) {
        return;
      }
      if (user.stepCompleted === 8) {
        navigate('AddPhoto', {data: user});
      } else {
        navigate('RegistrationStep', {...user});
      }
    }
  }, [isAuthenicated, navigate, user]);

  const handleGoBack = () => {
    resetAuth();
    goBack();
  };

  const onNextPress = () => {
    if (regex.isEmpty(verificationCode)) {
      alert(messages.enterVerifyOtp);
    } else {
      if (verificationCode.length === 6) {
        verifyCode(verificationCode);
      } else {
        alert('Please enter a 6 digit OTP code.');
      }
    }
  };

  return (
    <View
      pointerEvents={loading ? 'none' : 'auto'}
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent onLeftPress={handleGoBack} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={[styles.titleText, {color: color.primaryColor}]}>
              {'Enter verification code'}
            </Text>
            <Text style={[styles.subTitleText, {color: color.subPrimaryColor}]}>
              <Text>We sent an</Text>
              <Text style={{color: color.primaryColor}}> SMS </Text>
              <Text>with a code to verify your phone number</Text>
            </Text>
            <Text
              style={[
                styles.subTitleText,
                {color: color.primaryColor},
              ]}>{`+${confirmation?.callingCode[0]} ${confirmation?.phone_number}`}</Text>
            <CodeField
              value={verificationCode}
              onChangeText={setVerificationCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFiledRoot}
              keyboardType="number-pad"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <Text style={[styles.cellText, {color: color.primaryColor}]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <CommonButton
              loading={loading}
              container={{marginTop: ASPECT_RATIO(45)}}
              backgroundColor={color.pinkColor}
              borderColor={color.pinkColor}
              textColor={color.backgroundColor}
              title={'Next'}
              onPress={onNextPress}
            />
            <CommonButton
              container={{marginTop: ASPECT_RATIO(10)}}
              backgroundColor={'transparent'}
              borderColor={'transparent'}
              textColor={color.pinkColor}
              title={"I did't get Code"}
              onPress={handleGoBack}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const CELL_COUNT = 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  subTitleText: {
    marginHorizontal: 40,
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  codeFiledRoot: {
    marginTop: 20,
    width: W_WIDTH - 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: White,
    ...shadow(4),
  },
  cellText: {
    color: Black,
    fontSize: 16,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: Black,
    borderBottomWidth: 0,
  },
  resentText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export {Verification};
export type {VerificationRouteParams};
