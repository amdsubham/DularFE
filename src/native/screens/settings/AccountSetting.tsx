import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/core';
import {NavigationProps} from '../../../core/navigations/routes';
import {W_WIDTH, alert, regex} from '../../../utils/regex';
import {CommonButton} from '../../components/general/CommonButton';
import {CommonTextInput} from '../../components/general/CommonTextInput';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {messages} from '../../../utils/messages';
import {useAuth} from '../../../data/redux-api/hook';

const AccountSetting: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();

  const {goBack} = useNavigation<NavigationProps>();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [socialType, setSocialType] = useState<string>('');

  const {user, updateUserRequest} = useAuth();

  useEffect(() => {
    setName(user?.name ?? '');
    setUsername(user?.username ?? '');
    setEmail(user?.email ?? '');
    setSocialType(user?.socialType ?? '');
  }, [user?.email, user?.name, user?.socialType, user?.username]);

  const nextPress = () => {
    if (regex.isEmpty(name)) {
      alert(messages.enterFullName);
    } else if (regex.isEmpty(username)) {
      alert(messages.enterUserName);
    } else if (!regex.validateUsername(username)) {
      alert(messages.enterValidUserName);
    } else if (regex.isEmpty(email)) {
      alert(messages.enterEmail);
    } else if (!regex.validateEmail(email)) {
      alert(messages.enterValidEmail);
    } else {
      updateUserRequest({name, username, email});
      setTimeout(() => goBack(), 200);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Account Setting'} onLeftPress={goBack} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          <CommonTextInput
            autoComplete={'name'}
            placeholder={'Full Name'}
            keyboardType={'default'}
            value={name}
            onChangeText={setName}
          />
          <CommonTextInput
            autoComplete={'username'}
            placeholder={'Username'}
            keyboardType={'default'}
            value={username}
            onChangeText={setUsername}
          />
          <CommonTextInput
            autoComplete={'email'}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={socialType === 'phone'}
            value={email}
            onChangeText={setEmail}
          />
          <CommonButton
            container={{marginTop: 45}}
            backgroundColor={color.pinkColor}
            borderColor={color.pinkColor}
            textColor={color.backgroundColor}
            title={'Done'}
            onPress={nextPress}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export {AccountSetting};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: W_WIDTH,
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 26,
    fontWeight: '800',
  },
});
