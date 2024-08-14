import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {TouchableFeedback} from '../../../utils/regex';
import {CommonButton} from '../general/CommonButton';

interface SeekerRequestComponentProps {
  item: any;
  type: any;
}

const SeekerRequestComponent: FunctionComponent<
  SeekerRequestComponentProps
> = ({item, type}: SeekerRequestComponentProps) => {
  const {
    theme: {color},
  } = useTheme();

  const {navigate} = useNavigation<NavigationProps>();
  const onRequestStatusPress = (status: any) => {};

  const onChat = () => {
    navigate('Chat', {conversation: item, type: 'seeker'});
  };

  const onCardPress = () => {
    if (type === 'my') {
      return;
    }

    navigate('SeekerDetail', {item});
  };

  const request_status = '';
  return (
    <TouchableFeedback onPress={onCardPress}>
      <View style={[styles.container, {borderColor: color.borderColor}]}>
        <FastImage
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg',
          }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            borderWidth: 1,
            borderColor: color.borderColor,
          }}
        />
        <View style={[styles.infoView]}>
          <View style={[styles.nameView]}>
            <Text style={[styles.nameText, {color: color.primaryColor}]}>
              {'Name'}
            </Text>
            <Text style={[styles.likeText, {color: color.subPrimaryColor}]}>
              {'Sent you a request'}
            </Text>
            {request_status === '' && type === 'others' ? (
              <View style={[styles.requestView]}>
                <CommonButton
                  container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                  innerContainer={{borderRadius: 5, paddingVertical: 8}}
                  backgroundColor={color.backgroundColor}
                  borderColor={color.borderColor}
                  textColor={color.primaryColor}
                  title={'Decline'}
                  onPress={() => onRequestStatusPress('declined')}
                />
                <CommonButton
                  container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                  innerContainer={{borderRadius: 5, paddingVertical: 8}}
                  backgroundColor={color.pinkColor}
                  borderColor={color.pinkColor}
                  textColor={color.backgroundColor}
                  title={'Accept'}
                  onPress={() => onRequestStatusPress('accepted')}
                />
              </View>
            ) : request_status === 'accepted' &&
              (type === 'others' || type === 'my') ? (
              <View style={[styles.requestView]}>
                <CommonButton
                  container={{flex: 1, marginHorizontal: 0, marginRight: 20}}
                  innerContainer={{
                    borderRadius: 5,
                    paddingVertical: 8,
                    width: 100,
                  }}
                  backgroundColor={color.backgroundColor}
                  borderColor={color.borderColor}
                  textColor={color.primaryColor}
                  title={'Chat'}
                  onPress={onChat}
                />
              </View>
            ) : (
              request_status === '' &&
              type === 'my' && (
                <View style={[styles.requestView]}>
                  <CommonButton
                    container={{
                      flex: 1,
                      marginHorizontal: 0,
                      marginRight: 20,
                    }}
                    innerContainer={{
                      borderRadius: 5,
                      paddingVertical: 8,
                      width: 100,
                    }}
                    backgroundColor={color.backgroundColor}
                    borderColor={color.borderColor}
                    textColor={color.primaryColor}
                    title={'Cancel'}
                    onPress={() => null}
                  />
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </TouchableFeedback>
  );
};

export default SeekerRequestComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
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
    fontSize: 14,
    fontWeight: '400',
  },
  requestView: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
