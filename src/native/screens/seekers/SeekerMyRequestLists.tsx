import React, {FunctionComponent, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import SeekerRequestComponent from '../../components/messages/SeekerRequestComponent';
import {getMySeekerRequestLists} from '../../../data/redux-api/firestore/seekerAction';
import {useAuth} from '../../../data/redux-api/hook';

const SeekerMyRequestLists: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {goBack} = useNavigation<NavigationProps>();
  const {mySendSeekerRequests, user} = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getMySeekerRequestLists(user.uid);
    }
  }, [user?.uid]);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Send My Seekers Request'} onLeftPress={goBack} />
      <View
        style={[
          styles.container,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        {mySendSeekerRequests.length === 0 ? (
          <View style={styles.emptyView}>
            <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
              No data found
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={mySendSeekerRequests}
            extraData={mySendSeekerRequests}
            renderItem={({item}) => (
              <SeekerRequestComponent type={'my'} item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

export {SeekerMyRequestLists};

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
