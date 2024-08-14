import React, {FunctionComponent, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {maritalData as MaritalData} from '../../../data/json/generalCatogeryData';
import {CommonButton} from '../general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';

interface Step5ComponentProps {
  data: {
    maritalStatus?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step5Component: FunctionComponent<Step5ComponentProps> = ({
  data,
  onPress,
}: Step5ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [maritalStatus, setMaritalStatus] = useState(data.maritalStatus);
  const [maritalData] = useState(MaritalData);

  const onMaritalPress = (item: any) => {
    if (item.title === maritalStatus) {
      setMaritalStatus('');
    } else {
      setMaritalStatus(item.title);
      onPress(5, {maritalStatus: item.title});
    }
  };

  const renderMaritalItem = ({item}: any) => {
    let selected = false;
    if (maritalStatus === item.title) {
      selected = true;
    }

    return (
      <CommonButton
        container={{marginVertical: 8}}
        backgroundColor={color.backgroundColor}
        borderColor={selected ? color.pinkColor : color.borderColor}
        textColor={selected ? color.pinkColor : color.secondaryColor}
        title={item.title}
        onPress={() => onMaritalPress(item)}
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
          {'Marital Status'}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={maritalData}
          renderItem={renderMaritalItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export {Step5Component};

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
