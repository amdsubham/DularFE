import React, {FunctionComponent} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableFeedback} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../core/hooks';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {PINK} from '../../../themes/constantColours';
import MessagesListComponent from '../../components/messages/MessagesListComponent';
import {NavigationProps} from '../../../core/navigations/routes';
import {useAuth} from '../../../data/redux-api/hook';

const MessagesList: FunctionComponent = ({}) => {
  const {
    theme: {color},
  } = useTheme();
  const {seekerRequestsCount, peopleWhoLikedCount, conversations, user} =
    useAuth();

  const {navigate, goBack} = useNavigation<NavigationProps>();

  const onBackPress = () => {
    goBack();
  };

  const renderHeader = () => {
    return (
      <View>
        <TouchableFeedback onPress={() => navigate('SeekerRequest')}>
          <View style={[styles.rowView, {borderColor: color.borderColor}]}>
            <Text style={[styles.headText, {color: color.primaryColor}]}>
              Seekers Requests
            </Text>
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
              {seekerRequestsCount > 0 && (
                <View style={styles.countView}>
                  <Text
                    style={[styles.countText, {color: color.backgroundColor}]}>
                    {seekerRequestsCount}
                  </Text>
                </View>
              )}
              <Icon
                type={'feather'}
                name={'chevron-right'}
                color={color.subSecondaryColor}
                style={{color: color.subSecondaryColor}}
              />
            </View>
          </View>
        </TouchableFeedback>
        <TouchableFeedback onPress={() => navigate('WhoLikeMe')}>
          <View style={[styles.rowView, {borderBottomWidth: 0}]}>
            <Text style={[styles.headText, {color: color.primaryColor}]}>
              Who Likes Me
            </Text>
            <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
              {peopleWhoLikedCount > 0 && (
                <View style={styles.countView}>
                  <Text
                    style={[styles.countText, {color: color.backgroundColor}]}>
                    {peopleWhoLikedCount}
                  </Text>
                </View>
              )}
              <Icon
                type={'feather'}
                name={'chevron-right'}
                color={color.subSecondaryColor}
                style={{color: color.subSecondaryColor}}
              />
            </View>
          </View>
        </TouchableFeedback>
        <Text style={[styles.titleText, {color: color.primaryColor}]}>
          Messages
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Messages'} onLeftPress={onBackPress} />
      <View
        style={[
          styles.container,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={conversations}
          extraData={conversations}
          ListHeaderComponent={renderHeader}
          renderItem={({item}) => (
            <MessagesListComponent uid={user?.uid} item={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export {MessagesList};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    paddingVertical: 10,
  },
  headText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
  },
  countView: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: PINK,
    borderRadius: 15,
  },
  countText: {
    fontSize: 14,
    fontWeight: '800',
  },
  titleText: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 32,
    fontWeight: '800',
  },
});
