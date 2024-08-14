import React, {FunctionComponent, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {heightData} from '../../../data/json/generalCatogeryData';
import {ASPECT_RATIO, TouchableFeedback, W_WIDTH} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';

interface HeightModalProps {
  selectedHeight: any;
  onClose: (selectedHeightStatus?: any) => void;
}

const HeightModal: FunctionComponent<HeightModalProps> = ({
  selectedHeight,
  onClose,
}) => {
  const {
    theme: {color},
  } = useTheme();
  const [state, setState] = useState({
    selectedHeightStatus: selectedHeight,
    maritalData: heightData,
  });

  const onHeightPress = (item: any) => {
    setState({selectedHeightStatus: item.title, maritalData: heightData});
  };

  const renderItem = ({item}: any) => {
    const {selectedHeightStatus} = state;
    let selected = false;
    if (selectedHeightStatus === item.title) {
      selected = true;
    }

    return (
      <TouchableFeedback onPress={() => onHeightPress(item)}>
        <View style={[styles.itemView, {borderColor: color.borderColor}]}>
          <Text
            style={StyleSheet.flatten({
              ...styles.itemText,
              fontWeight: selected ? '600' : '500',
              color: selected ? color.pinkColor : color.secondaryColor,
            })}>
            {item.title}
          </Text>
          {selected && (
            <Icon
              type={'feather'}
              name={'check'}
              size={20}
              color={color.pinkColor}
              style={{fontSize: 20, color: color.pinkColor}}
            />
          )}
          <Text
            style={StyleSheet.flatten({
              ...styles.itemText,
              fontWeight: selected ? '600' : '500',
              color: selected ? color.pinkColor : color.secondaryColor,
            })}>
            {item.size}
          </Text>
        </View>
      </TouchableFeedback>
    );
  };

  const {selectedHeightStatus, maritalData} = state;
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.innerContainer,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        <View
          style={[
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
            onPress={() => onClose()}
          />
          <Text style={styles.titleText}>{'Height'}</Text>
          {selectedHeightStatus === '' ? (
            <Text style={styles.titleText}>{'      '}</Text>
          ) : (
            <Icon
              type={'feather'}
              name={'check'}
              size={25}
              color={color.pinkColor}
              style={{fontSize: 25, color: color.pinkColor}}
              onPress={() => onClose(selectedHeightStatus)}
            />
          )}
        </View>
        <View
          style={[
            styles.itemView,
            {
              marginHorizontal: 0,
              paddingHorizontal: 20,
              paddingVertical: 0,
              marginTop: 20,
              borderBottomWidth: 0,
            },
          ]}>
          <Text style={[styles.titleText, {color: color.pinkColor}]}>
            {'ft/inches'}
          </Text>
          <Text style={[styles.titleText, {color: color.pinkColor}]}>
            {'cm'}
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={maritalData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

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
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
});

export {HeightModal};
