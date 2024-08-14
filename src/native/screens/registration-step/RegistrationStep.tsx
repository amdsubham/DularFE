import React, {FunctionComponent, useRef, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {W_WIDTH, regex} from '../../../utils/regex';
import {Step1Component} from '../../components/register/Step1Component';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {useTheme} from '../../../core/hooks';
import {Step2Component} from '../../components/register/Step2Component';
import {Step3Component} from '../../components/register/Step3Component';
import {Step4Component} from '../../components/register/Step4Component';
import {Step5Component} from '../../components/register/Step5Component';
import {Step6Component} from '../../components/register/Step6Component';
import {Step7Component} from '../../components/register/Step7Component';
import {Step8Component} from '../../components/register/Step8Component';
import {UserModel} from '../../../data/model/userSchema';
import {useAuth} from '../../../data/redux-api/hook';

type RegistrationStepRouteParams = UserModel;

const RegistrationStep: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {params} = useRoute<RouteProps<'RegistrationStep'>>();
  const getData = useRef({
    name: regex.isEmpty(params.name) ? '' : params.name,
    username: regex.isEmpty(params.username) ? '' : params.username,
    email: regex.isEmpty(params.email) ? '' : params.email,
    DoB: regex.isEmpty(params.DoB) ? 'MM / DD / YYYY' : params.DoB,
    height: regex.isEmpty(params.height) ? "0' / 00'" : params.height,
    bodyType: regex.isEmpty(params.bodyType) ? '' : params.bodyType,
    gender: regex.isEmpty(params.gender) ? '' : params.gender,
    sexuality: regex.isEmpty(params.sexuality) ? '' : params.sexuality,
    personality: regex.isEmpty(params.personality) ? '' : params.personality,
    education: regex.isEmpty(params.education) ? '' : params.education,
    maritalStatus: regex.isEmpty(params.maritalStatus)
      ? ''
      : params.maritalStatus,
    lookingFor: regex.isEmpty(params.lookingFor) ? '' : params.lookingFor,
    religion: regex.isEmpty(params.religion) ? '' : params.religion,
    drinkingStatus: regex.isEmpty(params.drinkingStatus)
      ? ''
      : params.drinkingStatus,
    smokingStatus: regex.isEmpty(params.smokingStatus)
      ? ''
      : params.smokingStatus,
    eatingStatus: regex.isEmpty(params.eatingStatus) ? '' : params.eatingStatus,
    socialType: regex.isEmpty(params.socialType) ? 'phone' : params.socialType,
  });
  const [state, setState] = useState({
    currentIndex: 1,
    progressStatus: 100 / 8,
  });
  const scrollRef = useRef<ScrollView | null>(null);
  const lastStepCompleted = useRef<number>(params.stepCompleted);
  const {navigate, goBack} = useNavigation<NavigationProps>();

  const {updateUserRequest} = useAuth();

  const onBackPress = (type?: number) => {
    if (type === 1) {
      goBack();
    } else if (type === 2) {
      let index = currentIndex - 1;
      scrollRef?.current?.scrollTo({
        x: (index - 1) * W_WIDTH,
        y: 0,
        animated: true,
      });
      setPage(index);
    } else if (type === 3) {
      onContinuesPress(currentIndex);
    }
  };

  const onContinuesPress = (index: number, data?: any) => {
    let page = index + 1;
    if (page > 8) {
      getData.current = {...params, ...getData.current, ...data};
      storeDataInFirestore(8, data);
      navigate('AddPhoto', {data: getData.current as any});
      return;
    }
    scrollRef?.current?.scrollTo({x: index * W_WIDTH, y: 0, animated: true});
    setPage(page);
    getData.current = {...getData.current, ...data};
    storeDataInFirestore(index, data);
  };

  const storeDataInFirestore = (index: number, data: any) => {
    if (lastStepCompleted.current < index) {
      lastStepCompleted.current = index;
    } else {
      return;
    }

    let parameter: any = {};
    if (index === 1) {
      parameter = data;
    } else if (index === 2) {
      parameter = data;
      if (data.DoB) {
        parameter.age = regex.getAge(data.DoB).replace(', ', '');
      }
    } else if (index === 3) {
      parameter = regex.isEmpty(data) ? {sexuality: '', personality: ''} : data;
    } else if (index === 4) {
      parameter = regex.isEmpty(data) ? {education: ''} : data;
    } else if (index === 5) {
      parameter = regex.isEmpty(data) ? {maritalStatus: ''} : data;
    } else if (index === 6) {
      parameter = regex.isEmpty(data) ? {lookingFor: ''} : data;
    } else if (index === 7) {
      parameter = regex.isEmpty(data) ? {religion: ''} : data;
    } else if (index === 8) {
      parameter = regex.isEmpty(data)
        ? {drinkingStatus: '', smokingStatus: '', eatingStatus: ''}
        : data;
    }

    updateUserRequest({...parameter, stepCompleted: lastStepCompleted.current});
  };

  const setPage = (page: number) => {
    setState({currentIndex: page, progressStatus: (page * 100) / 8});
  };

  const onScrollMoment = (e: any) => {
    let offset = e.nativeEvent.contentOffset;
    let page = Math.round(offset.x / W_WIDTH) + 1;
    if (page > 8) {
      return;
    }
    setPage(page);
  };

  const {currentIndex, progressStatus} = state;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        type={1}
        currentIndex={currentIndex}
        onLeftPress={onBackPress}
      />
      <View style={[styles.inner, {backgroundColor: color.subSecondaryColor}]}>
        <Animated.View
          style={[
            styles.outer,
            {width: `${progressStatus}%`, backgroundColor: color.pinkColor},
          ]}
        />
      </View>
      <ScrollView
        ref={ref => (scrollRef.current = ref)}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollMoment}>
        <Step1Component onPress={onContinuesPress} data={getData.current} />
        <Step2Component onPress={onContinuesPress} data={getData.current} />
        <Step3Component onPress={onContinuesPress} data={getData.current} />
        <Step4Component onPress={onContinuesPress} data={getData.current} />
        <Step5Component onPress={onContinuesPress} data={getData.current} />
        <Step6Component onPress={onContinuesPress} data={getData.current} />
        <Step7Component onPress={onContinuesPress} data={getData.current} />
        <Step8Component onPress={onContinuesPress} data={getData.current} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    marginVertical: 10,
    marginHorizontal: 20,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  outer: {
    height: 4,
    borderRadius: 2,
  },
});

export {RegistrationStep};
export type {RegistrationStepRouteParams};
