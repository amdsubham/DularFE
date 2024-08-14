import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {Header_Height, W_WIDTH} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';

type ChatRouteParams = {
  conversation: any;
  type: 'messages' | 'seeker';
};

const Chat: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const [state] = useState({
    message: '',
    messages: [],
    replyItem: null,
    user: {
      uid: 1,
    },
  });
  const {
    params: {conversation, type},
  } = useRoute<RouteProps<'Chat'>>();
  const {user} = state;
  const {goBack} = useNavigation<NavigationProps>();

  const renderNavHeader = () => {
    return (
      <Header
        containerStyle={styles.header}
        backgroundColor={'transparent'}
        centerComponent={
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <TouchableWithoutFeedback onPress={goBack}>
                <View style={{width: 40, height: 40}}>
                  <Icon
                    type={'feather'}
                    name="chevron-left"
                    size={35}
                    color={color.primaryColor}
                    style={{color: color.primaryColor, fontSize: 35}}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <FastImage
                  style={{width: 40, height: 40, borderRadius: 20}}
                  source={{
                    uri: 'https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg',
                  }}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View>
                  <Text
                    style={[
                      {
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: '800',
                        color: color.primaryColor,
                      },
                    ]}>
                    {'Name'}
                  </Text>
                  <Text
                    style={[
                      {
                        marginLeft: 10,
                        fontSize: 12,
                        fontWeight: '400',
                        color: color.subPrimaryColor,
                      },
                    ]}>
                    {'Active Now'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        }
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      {renderNavHeader()}
    </View>
  );
};

export {Chat};
export type {ChatRouteParams};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingLeft: 0,
    paddingRight: 0,
    height: Header_Height,
    width: W_WIDTH,
  },
});
