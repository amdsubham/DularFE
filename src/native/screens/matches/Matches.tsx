import React, {FunctionComponent, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {regex} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {useTheme} from '../../../core/hooks';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import MatchComponent from '../../components/matches/MatchComponent';
import {useAuth} from '../../../data/redux-api/hook';
import {useMatches} from '../../../data/redux-api/matches/matches-hook';

const Matches: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {goBack} = useNavigation<NavigationProps>();
  const {user} = useAuth();

  const {matches, fetchRequest} = useMatches();

  useEffect(() => {
    if (user?.uid) {
      fetchRequest(user.uid);
    }
  }, [fetchRequest, user?.uid]);

  const renderData = () => {
    if (!regex.isPremiumUser(user?.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            See people who matches with you with Legendbae Premium
          </Text>
        </View>
      );
    }

    if (matches.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            No matches found for you.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={matches}
          extraData={matches}
          renderItem={({item}) => <MatchComponent item={item} />}
          numColumns={2}
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
      <HeaderComponent title={'Matches'} onLeftPress={goBack} />
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

export {Matches};

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
