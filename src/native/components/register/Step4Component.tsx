import React, {FunctionComponent, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {educationData as EducationData} from '../../../data/json/generalCatogeryData';
import {CommonButton} from '../general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';

interface Step4ComponentProps {
  data: {
    education?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step4Component: FunctionComponent<Step4ComponentProps> = ({
  data,
  onPress,
}: Step4ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [education, setEducation] = useState(data.education);
  const [educationData] = useState(EducationData);

  const onEducationPress = (item: any) => {
    if (item.title === education) {
      setEducation('');
    } else {
      setEducation(item.title);
      onPress(4, {education: item.title});
    }
  };

  const renderEducationItem = ({item}: any) => {
    let selected = false;
    if (education === item.title) {
      selected = true;
    }

    return (
      <CommonButton
        container={{marginVertical: 8}}
        backgroundColor={color.backgroundColor}
        borderColor={selected ? color.pinkColor : color.borderColor}
        textColor={selected ? color.pinkColor : color.secondaryColor}
        title={item.title}
        onPress={() => onEducationPress(item)}
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
          {"What's Your Education?"}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={educationData}
          renderItem={renderEducationItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export {Step4Component};

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
