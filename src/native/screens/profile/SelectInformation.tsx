import React, {FunctionComponent, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {TouchableFeedback, W_WIDTH} from '../../../utils/regex';
import {
  bodyTypeData,
  drinkingData,
  eatingData,
  educationData,
  genderData,
  heightData,
  lookingData as LookingData,
  maritalData,
  personalityData,
  religionData,
  sexualityData,
  smokingData,
} from '../../../data/json/generalCatogeryData';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {CommonButton} from '../../components/general/CommonButton';
import {HeaderComponent} from '../../components/general/HeaderComponent';

type SelectInformationRouteParams = {
  title: string;
  index: number;
  value: any;
  callback: (params: any) => void;
};

const SelectInformation: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {goBack} = useNavigation<NavigationProps>();

  const [lookingFor, setLookingFor] = useState<string>();
  const [lookingData, setLookingData] = useState<any>([]);

  const {
    params: {title, index, value, callback},
  } = useRoute<RouteProps<'SelectInformation'>>();

  useEffect(() => {
    setLookingFor(value);
    if (index === 1) {
      setLookingData(heightData);
    } else if (index === 2) {
      setLookingData(bodyTypeData);
    } else if (index === 3) {
      setLookingData(genderData);
    } else if (index === 4) {
      setLookingData(sexualityData);
    } else if (index === 5) {
      setLookingData(personalityData);
    } else if (index === 6) {
      setLookingData(educationData);
    } else if (index === 7) {
      setLookingData(maritalData);
    } else if (index === 8) {
      setLookingData(LookingData);
    } else if (index === 9) {
      setLookingData(religionData);
    } else if (index === 10) {
      setLookingData(drinkingData);
    } else if (index === 11) {
      setLookingData(smokingData);
    } else if (index === 12) {
      setLookingData(eatingData);
    }
  }, [index, lookingData, value]);

  const onRightPress = () => {
    callback({index: index, value: lookingFor});
    goBack();
  };

  const onLookingForPress = (item: any) => {
    if (item.title === lookingFor) {
      setLookingFor('');
    } else {
      setLookingFor(item.title);
    }
  };

  const renderLookingForItem = ({item}: any) => {
    let selected = false;
    if (lookingFor === item.title) {
      selected = true;
    }

    return (
      <CommonButton
        container={{marginVertical: 8}}
        backgroundColor={color.backgroundColor}
        borderColor={selected ? color.pinkColor : color.borderColor}
        textColor={selected ? color.pinkColor : color.secondaryColor}
        title={item.title}
        onPress={() => onLookingForPress(item)}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        title={title}
        rightView={
          <TouchableFeedback onPress={onRightPress}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'check'}
                color={color.pinkColor}
                style={{color: color.pinkColor}}
              />
            </View>
          </TouchableFeedback>
        }
        onLeftPress={goBack}
      />
      <View
        style={[
          styles.container,
          {paddingTop: 20, backgroundColor: color.container.backgroundColor},
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={lookingData}
          renderItem={renderLookingForItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export {SelectInformation};
export type {SelectInformationRouteParams};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: W_WIDTH,
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
});
