import React, {FunctionComponent} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {AllPhotosComponent} from '../../components/general/AllPhotoComponent';
import {HeaderComponent} from '../../components/general/HeaderComponent';

type AllPhotoRouteParams = {
  photos: any;
};

const AllPhoto: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {params} = useRoute<RouteProps<'AllPhotos'>>();
  const {goBack} = useNavigation<NavigationProps>();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'All Photos'} onLeftPress={goBack} />
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.container.backgroundColor,
          },
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={params?.photos ?? []}
          extraData={params?.photos ?? []}
          renderItem={({item}) => <AllPhotosComponent item={item} />}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export {AllPhoto};
export type {AllPhotoRouteParams};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
