import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {regex} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import SeekerUserComponent from '../../components/seekers/SeekerUserComponent.tsx';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {discoverUsers} from '../../../data/redux-api/firestore/user-firestore';
import {useAuth} from '../../../data/redux-api/hook';
import {useAppSelector} from '../../../core/redux/hooks';
import {getLocation} from '../../../data/redux-api/cards/cards-selector';

type SeekerUsersRouteParams = {
  seeker: any;
};

const SeekerUsers: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {
    params: {seeker},
  } = useRoute<RouteProps<'SeekerUser'>>();
  const {goBack} = useNavigation<NavigationProps>();

  const [nearByUsers, setNearByUsers] = useState([]);

  const {user} = useAuth();
  const location = useAppSelector(getLocation);

  const filterToData = useCallback(
    (data: any) => {
      let uid = user?.uid;
      let result = data.filter(function (v: any) {
        return v.uid !== uid;
      });
      setNearByUsers(result);
    },
    [user?.uid],
  );

  useEffect(() => {
    if (location) {
      const miles = 30;
      discoverUsers(location, miles).then((response: any) => {
        let data = [];
        for (let a in response) {
          data.push(response[a]._data);
        }

        if (data.length > 0) {
          filterToData(data);
        }
      });
    }
  }, [filterToData, location]);

  const renderData = () => {
    if (!regex.isPremiumUser(user?.packageEndDate)) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            Nearby see people with Legendbae Premium
          </Text>
        </View>
      );
    }

    if (nearByUsers.length === 0) {
      return (
        <View style={styles.emptyView}>
          <Text style={[styles.infoText, {color: color.subPrimaryColor}]}>
            Nearby no user available.
          </Text>
        </View>
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={nearByUsers}
          extraData={nearByUsers}
          renderItem={({item}) => (
            <SeekerUserComponent
              item={item}
              seeker={seeker}
              location={location}
            />
          )}
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
      <HeaderComponent title={seeker.title} onLeftPress={goBack} />
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

export {SeekerUsers};
export type {SeekerUsersRouteParams};

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
