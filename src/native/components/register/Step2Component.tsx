import React, {FunctionComponent, useRef, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  bodyTypeData as BodyData,
  genderData as GenderData,
} from '../../../data/json/generalCatogeryData';
import {ASPECT_RATIO, W_WIDTH, alert, regex} from '../../../utils/regex';
import {CommonButton} from '../general/CommonButton';
import {useTheme} from '../../../core/hooks';
import {HeightModal} from './HeightModal';
import {messages} from '../../../utils/messages';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

interface Step2ComponentProps {
  data: {
    DoB?: string;
    height?: string;
    bodyType?: string;
    gender?: string;
  };
  onPress: (type: number, data: any) => void;
}
const Step2Component: FunctionComponent<Step2ComponentProps> = ({
  data,
  onPress,
}: Step2ComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const [DoB, setDoB] = useState(data.DoB);
  const [dobDate, setDobDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [height, setHeight] = useState(data.height);
  const [modalVisible, setModalVisible] = useState(false);
  const [bodyType, setBodyType] = useState(data.bodyType);
  const [gender, setGender] = useState(data.gender);
  const [bodyTypeData] = useState(BodyData);
  const [genderData] = useState(GenderData);

  const onNextPress = () => {
    if (DoB === 'MM / DD / YYYY') {
      alert(messages.enterDOB);
    } else if (height === "0' / 00'") {
      alert(messages.enterHeight);
    } else if (regex.isEmpty(bodyType)) {
      alert(messages.enterBodyType);
    } else if (regex.isEmpty(gender)) {
      alert(messages.enterGender);
    } else {
      onPress(2, {DoB, height, bodyType, gender});
    }
  };

  const openHeightPress = () => {
    setModalVisible(true);
  };

  const onBodyTypePress = (item: any) => {
    setBodyType(item.title);
  };

  const onGenderPress = (item: any) => {
    setGender(item.title);
  };

  const onItemPress = (item: any, section: any) => {
    if (section === '0') {
      onBodyTypePress(item);
    } else if (section === '1') {
      onGenderPress(item);
    }
  };

  const onDOBPress = () => {
    setDatePickerOpen(true);
  };

  const renderItem = (item: any, section: any) => {
    let selected = false;
    if (bodyType === item.title || gender === item.title) {
      selected = true;
    }

    return (
      <CommonButton
        container={{marginVertical: 8}}
        backgroundColor={color.backgroundColor}
        borderColor={selected ? color.pinkColor : color.borderColor}
        textColor={selected ? color.pinkColor : color.secondaryColor}
        title={item.title}
        onPress={() => onItemPress(item, section)}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={[styles.titleText, {color: color.primaryColor}]}>
          {'My Birthday is'}
        </Text>
        <View>
          <Text style={[styles.titleTextInput, {color: color.subPrimaryColor}]}>
            Date of Birth*
          </Text>
          <CommonButton
            container={{marginTop: 5}}
            backgroundColor={color.textInputBackgroundColor}
            borderColor={color.textInputBackgroundColor}
            textColor={color.subPrimaryColor}
            title={DoB ?? ''}
            onPress={onDOBPress}
          />
          <Text
            style={[
              styles.titleTextInput,
              {marginVertical: 10, color: color.subSecondaryColor},
            ]}>
            Your age will be public
          </Text>
          <Text style={[styles.titleTextInput, {color: color.subPrimaryColor}]}>
            Height
          </Text>
          <CommonButton
            container={{marginTop: 5}}
            backgroundColor={color.textInputBackgroundColor}
            borderColor={color.textInputBackgroundColor}
            textColor={color.subPrimaryColor}
            title={height ?? ''}
            onPress={openHeightPress}
            dropDownArrow={true}
            arrowColor={color.subPrimaryColor}
          />
          <Text style={[styles.titleText, {color: color.primaryColor}]}>
            {'Body Type'}
          </Text>
          {bodyTypeData.map(item => {
            return renderItem(item, '0');
          })}
          <Text style={[styles.titleText, {color: color.primaryColor}]}>
            {'Gender'}
          </Text>
          {genderData.map(item => {
            return renderItem(item, '1');
          })}
          <CommonButton
            container={{marginVertical: ASPECT_RATIO(30)}}
            backgroundColor={color.pinkColor}
            borderColor={color.pinkColor}
            textColor={color.backgroundColor}
            title={'Continue'}
            onPress={onNextPress}
          />
        </View>
      </ScrollView>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <HeightModal
          selectedHeight={height}
          onClose={(value: any) => {
            setModalVisible(false);
            if (height) {
              setHeight(value);
            }
          }}
        />
      </Modal>
      <DatePicker
        modal
        open={datePickerOpen}
        date={dobDate ?? new Date()}
        mode="date"
        onConfirm={(date: any) => {
          setDatePickerOpen(false);
          setDobDate(date);
          setDoB(moment(date).format('MM / DD / YYYY'));
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </View>
  );
};

export {Step2Component};

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
  titleTextInput: {
    marginHorizontal: 20,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '500',
  },
});
