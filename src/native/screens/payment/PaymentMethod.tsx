import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableFeedback} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import moment from 'moment';
import {useAuth} from '../../../data/redux-api/hook';
import {
  initializePaymentSheet,
  setUpStripe,
} from '../../../data/redux-api/firestore/paymentAction';

type PaymentMethodRouteProps = {
  isMonth: boolean;
};

const PaymentMethod: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {
    params: {isMonth},
  } = useRoute<RouteProps<'PaymentMethod'>>();
  const {goBack, navigate} = useNavigation<NavigationProps>();

  const {user} = useAuth();

  useEffect(() => {
    setUpStripe();
  }, []);

  const openCardDetail = async () => {
    let type = isMonth ? 'M' : 'y';
    let packageEndDate = moment()
      .add(1, type as never)
      .unix();
    let amount = isMonth ? 25 : 250;
    initializePaymentSheet({user, amount, packageEndDate, navigate});
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent title={'Payment Method'} onLeftPress={goBack} />
      <View
        style={[
          styles.innerView,
          {backgroundColor: color.primaryBackgroundColor},
        ]}>
        <Text style={[styles.titleText, {color: color.subSecondaryColor}]}>
          Choose your preferred payment method
        </Text>
        <TouchableFeedback onPress={openCardDetail}>
          <View
            style={[
              styles.optionView,
              {backgroundColor: color.backgroundColor},
            ]}>
            <View style={{flex: 1}}>
              <Text style={{color: color.secondaryColor}}>
                Credit or debit card
              </Text>
            </View>
            <Icon
              type={'feather'}
              name={'chevron-right'}
              size={30}
              color={color.subPrimaryColor}
              style={{fontSize: 30, color: color.subPrimaryColor}}
            />
          </View>
        </TouchableFeedback>
      </View>
    </View>
  );
};

export {PaymentMethod};
export type {PaymentMethodRouteProps};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    flex: 1,
  },
  titleText: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 14,
    fontWeight: '600',
  },
  optionView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 2,
  },
});
