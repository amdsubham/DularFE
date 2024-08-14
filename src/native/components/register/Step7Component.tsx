import React, {FunctionComponent, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {religionData as ReligionData} from '../../../data/json/generalCatogeryData';
import {CommonButton} from '../general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';

interface Step7ComponentProps {
  data: {
    religion?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step7Component: FunctionComponent<Step7ComponentProps> = ({
  data,
  onPress,
}: Step7ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [religion, setReligion] = useState(data.religion);
  const [religionData] = useState(ReligionData);

  const onReligionPress = (item: any) => {
    if (item.title === religion) {
      setReligion('');
    } else {
      setReligion(item.title);
      onPress(7, {religion: item.title});
    }
  };

  const renderReligionItem = ({item}: any) => {
    let selected = false;
    if (religion === item.title) {
      selected = true;
    }

    return (
      <CommonButton
        container={{marginVertical: 8}}
        backgroundColor={color.backgroundColor}
        borderColor={selected ? color.pinkColor : color.borderColor}
        textColor={selected ? color.pinkColor : color.secondaryColor}
        title={item.title}
        onPress={() => onReligionPress(item)}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <View>
        <Text style={[styles.titleText, {color: color.primaryColor}]}>
          {'Religion'}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={religionData}
          renderItem={renderReligionItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export {Step7Component};

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
