import React, {FunctionComponent, useState} from 'react';
import {StyleSheet, Switch, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ASPECT_RATIO, TouchableFeedback, W_WIDTH} from '../../../utils/regex';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {CommonButton} from '../../components/general/CommonButton';
import {White} from '../../../themes/constantColours';

const PaymentPackages: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const [isMonth, setIsMonth] = useState(true);

  const subscribeNowPress = () => {
    navigate('PaymentMethod', {isMonth: isMonth});
  };

  const renderFunctionalityItem = (title: string) => {
    return (
      <View style={[styles.renderItemView]}>
        <Icon
          type={'feather'}
          name={'check'}
          size={20}
          color={color.pinkColor}
          style={{fontSize: 20, color: color.pinkColor}}
        />
        <Text style={styles.renderItemText}>{title}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <View
        style={[
          styles.container,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        <View style={styles.emptyView}>
          <FastImage
            source={require('./../../../core/assets/payment_background.png')}
            style={{width: W_WIDTH, height: 238}}
          />
          <FastImage
            source={require('./../../../core/assets/payment_curve.png')}
            style={{
              position: 'absolute',
              top: 188,
              width: W_WIDTH,
              height: 238,
            }}
          />
          <View style={{marginVertical: 15}}>
            <Text
              style={[
                styles.titleText,
                {marginTop: 188 - 238, color: color.primaryColor},
              ]}>
              Pricing
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text
                style={[
                  styles.monthlyText,
                  {marginRight: 10, color: color.primaryColor},
                ]}>
                Bill yearly
              </Text>
              <Switch
                trackColor={{false: color.pinkColor, true: color.pinkColor}}
                thumbColor={White}
                ios_backgroundColor={'transparent'}
                onValueChange={setIsMonth}
                value={isMonth}
              />
              <Text
                style={[
                  styles.monthlyText,
                  {marginLeft: 10, color: color.primaryColor},
                ]}>
                Bill monthly
              </Text>
            </View>
          </View>
          <View style={[styles.emptyView, {paddingHorizontal: 20}]}>
            <View
              style={[
                styles.packageInfoView,
                {backgroundColor: color.backgroundColor},
              ]}>
              <View>
                <Text style={styles.packageTitleText}>{'Premium Plan'}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.priceText}>{`$${
                    isMonth ? '25' : '250'
                  }`}</Text>
                  <Text
                    style={[
                      styles.priceTitleText,
                      {color: color.subSecondaryColor},
                    ]}>{`/${isMonth ? 'month' : 'year'}`}</Text>
                </View>
              </View>
              {renderFunctionalityItem('Unlimited swipes')}
              {renderFunctionalityItem('Message directly')}
              {renderFunctionalityItem('Swipe around the world')}
              {renderFunctionalityItem('See who like you')}
              {renderFunctionalityItem('Access to all seekers options')}
            </View>
            <CommonButton
              container={{
                marginBottom: ASPECT_RATIO(10),
                marginTop: ASPECT_RATIO(10),
              }}
              backgroundColor={color.pinkColor}
              borderColor={color.pinkColor}
              textColor={color.backgroundColor}
              title={'Subscribe Now'}
              onPress={subscribeNowPress}
            />
          </View>
        </View>
        <View style={{position: 'absolute', top: 40}}>
          <TouchableFeedback onPress={goBack}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'chevron-left'}
                size={35}
                color={color.backgroundColor}
                style={{fontSize: 35, color: color.backgroundColor}}
              />
            </View>
          </TouchableFeedback>
        </View>
      </View>
    </View>
  );
};

export {PaymentPackages};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyView: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  titleText: {
    marginTop: 10,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  monthlyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  packageInfoView: {
    flex: 1,
    borderRadius: 36,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  packageTitleText: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '800',
  },
  renderItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ASPECT_RATIO(2),
  },
  renderItemText: {
    marginLeft: 10,
    fontSize: 14,
  },
  priceText: {
    fontSize: 45,
    fontWeight: '800',
  },
  priceTitleText: {
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '800',
  },
});
