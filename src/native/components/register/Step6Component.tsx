import React, {FunctionComponent, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {lookingData as LookingData} from '../../../data/json/generalCatogeryData';
import {CommonButton} from '../general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';

interface Step6ComponentProps {
  data: {
    lookingFor?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step6Component: FunctionComponent<Step6ComponentProps> = ({
  data,
  onPress,
}: Step6ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [lookingFor, setLookingFor] = useState(data.lookingFor);
  const [lookingData] = useState(LookingData);

  const onLookingForPress = (item: any) => {
    if (item.title === lookingFor) {
      setLookingFor('');
    } else {
      setLookingFor(item.title);
      onPress(6, {lookingFor: item.title});
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
      <View>
        <Text style={[styles.titleText, {color: color.primaryColor}]}>
          {"I'm Looking for"}
        </Text>
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

export {Step6Component};

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
