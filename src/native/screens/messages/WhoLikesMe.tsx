import React, {FunctionComponent} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {regex} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {WhoLikeComponent} from '../../components/messages/WhoLikeComponent';
import {useAuth} from '../../../data/redux-api/hook';

const WhoLikesMe: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {peopleWhoLiked, user} = useAuth();

  const {goBack} = useNavigation();

  const onBackPress = () => {
    goBack();
  };

  const renderData = () => {
    if (!regex.isPremiumUser(user?.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            See people who likes you with Legendbae Premium
          </Text>
        </View>
      );
    }

    if (peopleWhoLiked.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            No likes found for you.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={peopleWhoLiked}
          extraData={peopleWhoLiked}
          renderItem={({item}) => <WhoLikeComponent item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        title={'People who liked you'}
        onLeftPress={onBackPress}
      />
      <View
        style={[
          styles.container,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        {renderData()}
      </View>
    </View>
  );
};

export {WhoLikesMe};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },
});
