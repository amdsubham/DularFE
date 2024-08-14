import React, {FunctionComponent, useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {
  drinkingData,
  eatingData,
  smokingData,
} from '../../../data/json/generalCatogeryData';
import {CommonButton} from '../general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';

interface Step8ComponentProps {
  data: {
    drinkingStatus?: string;
    smokingStatus?: string;
    eatingStatus?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step8Component: FunctionComponent<Step8ComponentProps> = ({
  data,
  onPress,
}: Step8ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [drinkingStatus, setDrinkingStatus] = useState(data.drinkingStatus);
  const [smokingStatus, setSmokingStatus] = useState(data.smokingStatus);
  const [eatingStatus, setEatingStatus] = useState(data.eatingStatus);
  const [sections] = useState([
    {
      id: '0',
      title: 'Drinking',
      data: drinkingData,
    },
    {
      id: '1',
      title: 'Smoking',
      data: smokingData,
    },
    {
      id: '2',
      title: 'Eating',
      data: eatingData,
    },
  ]);

  const onDrinkingPress = (item: any) => {
    if (item.title === drinkingStatus) {
      setDrinkingStatus('');
    } else {
      setDrinkingStatus(item.title);
    }
  };

  const onSmokingPress = (item: any) => {
    if (item.title === smokingStatus) {
      setSmokingStatus('');
    } else {
      setSmokingStatus(item.title);
    }
  };

  const onEatingPress = (item: any) => {
    if (item.title === eatingStatus) {
      setEatingStatus('');
    } else {
      setEatingStatus(item.title);
      if (drinkingStatus !== '' && smokingStatus !== '') {
        onPress(8, {drinkingStatus, smokingStatus, eatingStatus: item.title});
      }
    }
  };

  const onHandlePress = (item: any, section: any) => {
    if (section.id === '0') {
      onDrinkingPress(item);
    } else if (section.id === '1') {
      onSmokingPress(item);
    } else if (section.id === '2') {
      onEatingPress(item);
    }
  };

  const renderItem = ({item, section}: any) => {
    let selected = false;
    if (
      drinkingStatus === item.title ||
      smokingStatus === item.title ||
      eatingStatus === item.title
    ) {
      selected = true;
    }

    return (
      <CommonButton
        container={{marginVertical: 8}}
        backgroundColor={color.backgroundColor}
        borderColor={selected ? color.pinkColor : color.borderColor}
        textColor={selected ? color.pinkColor : color.secondaryColor}
        title={item.title}
        onPress={() => onHandlePress(item, section)}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <SectionList
        style={styles.container}
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={({section}) => (
          <View style={{backgroundColor: color.container.backgroundColor}}>
            <Text style={[styles.titleText, {color: color.primaryColor}]}>
              {section.title}
            </Text>
          </View>
        )}
        keyExtractor={(item: any) => item.id}
        extraData={[drinkingStatus, smokingStatus, eatingStatus]}
      />
    </View>
  );
};

export {Step8Component};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: W_WIDTH,
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
