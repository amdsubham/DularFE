import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ASPECT_RATIO, W_WIDTH, alert, regex} from '../../../utils/regex';
import {CommonButton} from '../general/CommonButton';
import {useTheme} from '../../../core/hooks';
import {CommonTextInput} from '../general/CommonTextInput';
import {messages} from '../../../utils/messages';

interface Step1ComponentProps {
  data: {
    name?: string | null;
    username?: string;
    email?: string | null;
    socialType?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step1Component: FunctionComponent<Step1ComponentProps> = ({
  data,
  onPress,
}: Step1ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [name, setName] = useState(data.name);
  const [username, setUsername] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [socialType] = useState(data.socialType);

  const onNextPress = () => {
    if (regex.isEmpty(name)) {
      alert(messages.enterFullName);
    } else if (regex.isEmpty(username)) {
      alert(messages.enterUserName);
    } else if (!regex.validateUsername(username ?? '')) {
      alert(messages.enterValidUserName);
    } else if (regex.isEmpty(email)) {
      alert(messages.enterEmail);
    } else if (!regex.validateEmail(email ?? '')) {
      alert(messages.enterValidEmail);
    } else {
      onPress(1, {name, username, email});
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <KeyboardAwareScrollView>
        <View>
          <Text style={[styles.titleText, {color: color.primaryColor}]}>
            {'Basic Info'}
          </Text>
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
              container={{marginTop: ASPECT_RATIO(123)}}
              backgroundColor={color.pinkColor}
              borderColor={color.pinkColor}
              textColor={color.backgroundColor}
              title={'Continue'}
              onPress={onNextPress}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

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

export {Step1Component};
