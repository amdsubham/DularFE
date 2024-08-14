import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import {useTheme} from '../../../core/hooks';
import {
  personalityData,
  sexualityData,
} from '../../../data/json/generalCatogeryData';
import {CommonButton} from '../general/CommonButton';
import {W_WIDTH} from '../../../utils/regex';

interface Step3ComponentProps {
  data: {
    sexuality?: string;
    personality?: string;
  };
  onPress: (type: number, data: any) => void;
}

const Step3Component: FunctionComponent<Step3ComponentProps> = ({
  data,
  onPress,
}: Step3ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [sexuality, setSexuality] = useState(data.sexuality);
  const [personality, setPersonality] = useState(data.personality);
  const [sections] = useState([
    {
      id: '0',
      title: 'Sexuality',
      data: sexualityData,
    },
    {
      id: '1',
      title: 'Personality',
      data: personalityData,
    },
  ]);

  const onSexualityPress = (item: any) => {
    if (item.title === sexuality) {
      setSexuality('');
    } else {
      setSexuality(item.title);
    }
  };

  const onPersonalityPress = (item: any) => {
    if (item.title === personality) {
      setPersonality('');
    } else {
      setPersonality(item.title);
      onPress(3, {sexuality, personality: item.title});
    }
  };

  const onHandlePress = (item: any, section: any) => {
    if (section.id === '0') {
      onSexualityPress(item);
    } else if (section.id === '1') {
      onPersonalityPress(item);
    }
  };

  const renderItem = ({item, section}: any) => {
    let selected = false;
    if (sexuality === item.title || personality === item.title) {
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
        extraData={[sexuality, personality]}
      />
    </View>
  );
};

export {Step3Component};

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
