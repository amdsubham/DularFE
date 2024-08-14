import React, {FunctionComponent} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../core/hooks';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {NotificationComponent} from '../../components/notifcations/NotificationComponent';
import {useAuth} from '../../../data/redux-api/hook';

const Notifications: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {goBack} = useNavigation();

  const {notifications} = useAuth();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Notifications'} onLeftPress={goBack} />
      <View style={[styles.innerView]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={notifications}
          extraData={notifications}
          renderItem={({item}: any) => <NotificationComponent item={item} />}
          keyExtractor={item => item}
        />
      </View>
    </View>
  );
};

export {Notifications};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
});
