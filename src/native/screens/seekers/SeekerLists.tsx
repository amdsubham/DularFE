import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableFeedback} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {seekerData as SeekerData} from './../../../data/json/seekerData';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {SeekerItemComponent} from '../../components/seekers/SeekerItemComponent';

const SeekerLists = () => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const [state] = useState({
    seekerData: SeekerData,
  });

  const onSendSeeker = () => {
    navigate('SendMySeekerRequest');
  };

  const {seekerData} = state;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        title={'Seekers'}
        rightView={
          <TouchableFeedback onPress={onSendSeeker}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'send'}
                size={28}
                color={color.primaryColor}
                style={{fontSize: 28, color: color.primaryColor}}
              />
            </View>
          </TouchableFeedback>
        }
        onLeftPress={goBack}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: color.container.backgroundColor,
            paddingHorizontal: 10,
          },
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={seekerData}
          extraData={seekerData}
          renderItem={({item}) => <SeekerItemComponent item={item} />}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export {SeekerLists};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
