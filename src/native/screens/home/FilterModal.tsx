import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ASPECT_RATIO, TouchableFeedback, W_WIDTH} from '../../../utils/regex';
import {Icon} from 'react-native-elements';
import {
  sexualityData,
  lookingData as LookingData,
} from '../../../data/json/generalCatogeryData';
import {useTheme} from '../../../core/hooks';
import {CommonButton} from '../../components/general/CommonButton';
import Slider from '@react-native-community/slider';

interface FilterModalProps {
  filterData: any;
  onClose: (filterData: any) => void;
}

const FilterModal: FunctionComponent<FilterModalProps> = ({
  filterData,
  onClose,
}: any) => {
  const {
    theme: {color},
  } = useTheme();
  const [selectedDistance, setSelectedDistance] = useState(
    filterData.selectedDistance,
  );
  const [isLookingData, setIsLookingData] = useState(false);
  const [lookingData, setLookingData] = useState(LookingData);
  const [isShowMeData, setIsShowMeData] = useState(false);
  const [showMeData, setShowMeData] = useState(sexualityData);
  const [selectedAge, setSelectedAge] = useState(filterData.selectedAge);
  const [isMatchSound] = useState(false);

  const initialData = useRef({
    selectedLocation: 'New york',
    selectedDistance: 30,
    isLookingData: false,
    lookingData: JSON.parse(JSON.stringify(lookingData)),
    isShowMeData: false,
    showMeData: JSON.parse(JSON.stringify(sexualityData)),
    selectedAge: 25,
    isMatchSound: false,
  });

  useEffect(() => {
    let lookData = JSON.parse(JSON.stringify(LookingData));
    let lookingResults = lookData.map((item: any) => {
      let interested = filterData.interested;
      if (interested) {
        item.selected = interested.includes(item.title);
      }

      return item;
    });

    let showData = JSON.parse(JSON.stringify(sexualityData));
    let showResults = showData.map((item: any) => {
      let showMe = filterData.showMe;
      if (showMe) {
        item.selected = showMe.includes(item.title);
      }

      return item;
    });

    setLookingData(lookingResults);
    setShowMeData(showResults);
  }, [filterData.interested, filterData.showMe]);

  const onLookingPress = (item: any) => {
    item.selected = !item.selected;
    setLookingData(JSON.parse(JSON.stringify(lookingData)));
  };

  const closePress = () => {
    onClose();
  };

  const resetPress = () => {
    onClose({
      selectedDistance: 80,
      selectedAge: 60,
      interested: undefined,
      showMe: undefined,
    });
  };

  const donePress = () => {
    const interested: any[] = [];
    const showMe: any[] = [];
    const updateFilterData = {
      selectedDistance,
      selectedAge,
      isMatchSound,
      interested,
      showMe,
    };
    let getLooking = lookingData.filter(function (o) {
      return o.selected === true;
    });
    if (getLooking.length > 0) {
      updateFilterData.interested = getLooking.map(function (o) {
        return o.title;
      });
    }

    let getShowMe = showMeData.filter(function (o) {
      return o.selected === true;
    });
    if (getShowMe.length > 0) {
      updateFilterData.showMe = getShowMe.map(function (o) {
        return o.title;
      });
    }

    onClose(updateFilterData);
  };

  const renderLookingItem = ({item}: any) => {
    let selected = item.selected;

    let iconName = selected ? 'check-circle' : 'circle';
    return (
      <TouchableFeedback onPress={() => onLookingPress(item)}>
        <View style={[styles.renderItemView]}>
          <Icon
            type={'feather'}
            name={iconName}
            size={20}
            color={color.pinkColor}
            style={{fontSize: 20, color: color.pinkColor}}
          />
          <Text style={styles.renderItemText}>{item.title}</Text>
        </View>
      </TouchableFeedback>
    );
  };

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        <View
          style={[
            styles.commonView,
            styles.itemView,
            {
              marginHorizontal: 0,
              paddingHorizontal: 20,
              borderColor: color.borderColor,
            },
          ]}>
          <Icon
            type={'feather'}
            name={'x'}
            size={25}
            color={color.primaryColor}
            style={{fontSize: 25, color: color.primaryColor}}
            onPress={closePress}
          />
          <Text style={[styles.titleText, {color: color.primaryColor}]}>
            {'Filter'}
          </Text>
          <Text
            style={[styles.titleText, {color: color.subPrimaryColor}]}
            onPress={resetPress}>
            {'Reset'}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={{paddingBottom: 20}}>
            <View style={[styles.commonView, {borderColor: color.borderColor}]}>
              <View style={[styles.itemView]}>
                <Text
                  style={[styles.commonTitleText, {color: color.primaryColor}]}>
                  {'Distance'}
                </Text>
                <View style={[styles.rightRowView]}>
                  <Text
                    style={[
                      styles.commonTitleText,
                      {color: color.subPrimaryColor},
                    ]}>{`${selectedDistance}mi`}</Text>
                </View>
              </View>
              <Slider
                minimumValue={1}
                maximumValue={800}
                value={selectedDistance}
                minimumTrackTintColor={color.pinkColor}
                thumbImage={require('./../../../core/assets/sliderthumb.png')}
                thumbTintColor={color.pinkColor}
                onValueChange={(value: any) =>
                  setSelectedDistance(Math.round(value))
                }
              />
            </View>
            <View style={[styles.commonView, {borderColor: color.borderColor}]}>
              <TouchableFeedback
                onPress={() => setIsLookingData(!isLookingData)}>
                <View style={[styles.itemView]}>
                  <Text
                    style={[
                      styles.commonTitleText,
                      {color: color.primaryColor},
                    ]}>
                    {'Interested in'}
                  </Text>
                  <View style={[styles.rightRowView]}>
                    <Icon
                      type={'feather'}
                      name={'chevron-down'}
                      size={22}
                      color={color.subPrimaryColor}
                      style={{fontSize: 22, color: color.subPrimaryColor}}
                    />
                  </View>
                </View>
              </TouchableFeedback>
              {isLookingData && (
                <View style={{marginTop: 10}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={lookingData}
                    extraData={lookingData}
                    renderItem={renderLookingItem}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
              )}
            </View>
            <View style={[styles.commonView, {borderColor: color.borderColor}]}>
              <TouchableFeedback onPress={() => setIsShowMeData(!isShowMeData)}>
                <View style={[styles.itemView]}>
                  <Text
                    style={[
                      styles.commonTitleText,
                      {color: color.primaryColor},
                    ]}>
                    {'Show me'}
                  </Text>
                  <View style={[styles.rightRowView]}>
                    <Icon
                      type={'feather'}
                      name={'chevron-down'}
                      size={22}
                      color={color.subPrimaryColor}
                      style={{fontSize: 22, color: color.subPrimaryColor}}
                    />
                  </View>
                </View>
              </TouchableFeedback>
              {isShowMeData && (
                <View style={{marginTop: 10}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={showMeData}
                    extraData={showMeData}
                    renderItem={renderLookingItem}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
              )}
            </View>
            <View style={[styles.commonView, {borderColor: color.borderColor}]}>
              <View style={[styles.itemView]}>
                <Text
                  style={[styles.commonTitleText, {color: color.primaryColor}]}>
                  {'Age'}
                </Text>
                <View style={[styles.rightRowView]}>
                  <Text
                    style={[
                      styles.commonTitleText,
                      {color: color.subPrimaryColor},
                    ]}>{`18 - ${selectedAge}`}</Text>
                </View>
              </View>
              <Slider
                minimumValue={18}
                maximumValue={80}
                value={selectedAge}
                minimumTrackTintColor={color.pinkColor}
                thumbImage={require('./../../../core/assets/sliderthumb.png')}
                thumbTintColor={color.pinkColor}
                onValueChange={(value: any) =>
                  setSelectedAge(Math.round(value))
                }
              />
            </View>
          </View>
        </ScrollView>
        <CommonButton
          container={{marginVertical: 20}}
          backgroundColor={color.pinkColor}
          borderColor={color.pinkColor}
          textColor={color.backgroundColor}
          title={'Done'}
          onPress={donePress}
        />
      </View>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ASPECT_RATIO(80),
    width: W_WIDTH,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  commonView: {
    marginHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commonTitleText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  rightRowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  renderItemText: {
    marginLeft: 10,
    fontSize: 14,
  },
});
