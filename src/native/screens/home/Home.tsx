import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-deck-swiper';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  alert,
  HEIGHT_RATIO,
  MAX_CARD_SWIPE_LIMIT,
  regex,
  shadow,
  TouchableFeedback,
} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {useTheme} from '../../../core/hooks';
import {
  ONLINE,
  PINK,
  RED,
  SUPERLIKE,
  White,
} from '../../../themes/constantColours';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import FilterModal from './FilterModal';
import CongraMatchModal from './CongraMatchModal';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {distance} from '../../../utils/location';
import {useCards} from '../../../data/redux-api/cards/cards-hook';
import {useAuth} from '../../../data/redux-api/hook';
import moment from 'moment';
import {swipeCardUser} from '../../../data/redux-api/firestore/swipeCardAction';
import {getNotificationLists} from '../../../data/redux-api/firestore/notificationsAction';

const Home: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const [cards, setCards] = useState<any>([]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchUser, setMatchUser] = useState();
  const [filterData, setFilterData] = useState<any>({
    selectedDistance: 800,
    selectedAge: 60,
    interested: undefined,
    showMe: undefined,
  });
  const swiperRef = useRef<Swiper<any> | null>(null);
  const dailySwipeCount = useRef<number>(0);

  const {dispatch, navigate} = useNavigation<NavigationProps>();

  const {fetchRequest, cards: users, location} = useCards();
  const {user, updateUserRequest} = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getNotificationLists(user?.uid);
    }
  }, [user?.uid]);

  useEffect(() => {
    setLoading(true);
    fetchRequest(filterData.selectedDistance);
  }, [fetchRequest, filterData.selectedDistance]);

  useEffect(() => {
    if (users) {
      let result = users.filter(function (v: any) {
        let query = false;
        if (Boolean(filterData.interested) && Boolean(filterData.showMe)) {
          query =
            v.age <= filterData.selectedAge &&
            filterData.interested.includes(v.lookingFor) &&
            filterData.showMe.includes(v.sexuality);
        } else if (filterData.interested) {
          query =
            v.age <= filterData.selectedAge &&
            filterData.interested.includes(v.lookingFor);
        } else if (filterData.showMe) {
          query =
            v.age <= filterData.selectedAge &&
            filterData.showMe.includes(v.sexuality);
        } else {
          query = v.age <= filterData.selectedAge;
        }

        return query;
      });
      setCards(result);
    }
    setLoading(false);
  }, [filterData.interested, filterData.selectedAge, filterData.showMe, users]);

  useEffect(() => {
    const packageEndDate = user?.packageEndDate;
    const getDailySwipeCount = user?.dailySwipeCount;
    const swipeStartDate = user?.swipeStartDate;
    if (!regex.isPremiumUser(packageEndDate)) {
      if (swipeStartDate) {
        let a = moment.unix(swipeStartDate).local();
        let b = moment();
        let diff = a.diff(b, 'days');
        if (diff === 0) {
          dailySwipeCount.current = getDailySwipeCount ?? 0;
        }
      }
    }
  }, [user?.dailySwipeCount, user?.packageEndDate, user?.swipeStartDate]);

  useEffect(() => {
    if (user) {
      updateUserRequest({online: true});
    }
  }, [updateUserRequest, user]);

  const onMenuPress = () => {
    dispatch(DrawerActions.openDrawer());
  };

  const onFilterPress = () => {
    setModalVisible(true);
  };

  const onSwiped = (type: any, index: number) => {
    let uid = user?.uid ?? '';
    let other = cards[index];

    let isValidSwipe = checkSwipeLimit();
    if (isValidSwipe) {
      swipeCardUser(uid, other.uid, type).then(response => {
        console.log('swipeCardUser =====>', response);
        if (response && !matchUser) {
          setMatchUser(other);
        }
      });
    }
  };

  const checkSwipeLimit = () => {
    const packageEndDate = user?.packageEndDate;
    const swipeStartDate = user?.swipeStartDate;

    let isUpdate = true;
    if (!regex.isPremiumUser(packageEndDate)) {
      let parameter: any = {};
      if (swipeStartDate) {
        let a = moment.unix(swipeStartDate).local();
        let b = moment();
        let diff = a.diff(b, 'days');
        if (diff === 0) {
          if (dailySwipeCount.current >= MAX_CARD_SWIPE_LIMIT) {
            isUpdate = false;
            swiperRef.current?.swipeBack();
            alert('You reached daily limit.');
          } else {
            parameter = {dailySwipeCount: dailySwipeCount.current + 1};
          }
        } else {
          parameter = {
            swipeStartDate: moment().utc().unix(),
            dailySwipeCount: 1,
          };
        }
      } else {
        parameter = {swipeStartDate: moment().utc().unix(), dailySwipeCount: 1};
      }

      if (isUpdate) {
        updateUserRequest(parameter);
        dailySwipeCount.current = parameter.dailySwipeCount;
      }
    }

    return isUpdate;
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const swipeLeft = (index: number) => {
    navigate('OtherProfile', {
      profileData: cards?.[index],
      currentLocation: location,
    });
  };

  const onButtonPress = (type: any) => {
    if (swipedAllCards) {
      return;
    }

    if (type === 'dislike') {
      swiperRef.current?.swipeLeft();
    } else if (type === 'like') {
      swiperRef.current?.swipeRight();
    } else if (type === 'superLike') {
      swiperRef.current?.swipeTop();
    }
  };

  const renderCardItem = (item: any) => {
    return (
      <View
        style={[
          styles.cardView,
          {
            backgroundColor: color.backgroundColor,
            borderColor: color.subSecondaryColor,
          },
        ]}>
        <FastImage
          source={{uri: regex.getProfilePic(item.photos)}}
          style={{flex: 1, borderRadius: 20, overflow: 'hidden'}}
        />
        <FastImage
          source={require('./../../../core/assets/blur_effect.png')}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            borderRadius: 20,
            overflow: 'hidden',
          }}
        />
        <View
          style={{position: 'absolute', top: 0, right: 0, left: 0, bottom: 0}}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              left: 0,
              bottom: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.online && <View style={styles.onlineView} />}
              <Text style={[styles.nameText, {color: color.backgroundColor}]}>
                {item.name}
                {regex.getAge(item.DoB)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Icon
                type={'feather'}
                name={'map-pin'}
                size={16}
                color={color.backgroundColor}
                style={{fontSize: 16, color: color.backgroundColor}}
              />
              <Text
                style={[
                  styles.locationText,
                  {color: color.backgroundColor, marginLeft: 5},
                ]}>
                {`${distance(item.location, location, 'K')}`} km away
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderCard = () => {
    if (cards?.length === 0) {
      return (
        <View
          style={[
            styles.innerView,
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.primaryBackgroundColor,
            },
          ]}>
          <Text style={{fontSize: 18, padding: 30, textAlign: 'center'}}>
            {'Nearby not available. You can apply filter.'}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.innerView,
          {backgroundColor: color.primaryBackgroundColor},
        ]}>
        <Swiper
          ref={ref => {
            swiperRef.current = ref;
          }}
          onSwipedLeft={index => onSwiped('dislike', index)}
          onSwipedRight={index => onSwiped('like', index)}
          onSwipedTop={index => onSwiped('superLike', index)}
          onTapCard={swipeLeft}
          disableBottomSwipe={true}
          cards={cards ?? []}
          renderCard={renderCardItem}
          onSwipedAll={onSwipedAllCards}
          backgroundColor={color.primaryBackgroundColor}
          containerStyle={{bottom: HEIGHT_RATIO(0.15)}}
          stackSize={cards && cards.length > 2 ? 3 : cards?.length}
          stackSeparation={-30}
          overlayLabels={overlayLabel}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        />
        {!swipedAllCards && (
          <View style={[styles.bottomView]}>
            <TouchableFeedback onPress={() => onButtonPress('dislike')}>
              <View
                style={[
                  styles.commonLike,
                  {backgroundColor: color.backgroundColor},
                ]}>
                <Icon
                  type={'feather'}
                  name={'x'}
                  size={30}
                  color={RED}
                  style={{color: RED, fontSize: 30}}
                />
              </View>
            </TouchableFeedback>
            <TouchableFeedback onPress={() => onButtonPress('superLike')}>
              <View
                style={[
                  styles.commonLike,
                  {
                    backgroundColor: color.backgroundColor,
                    padding: 15,
                    borderRadius: 35,
                  },
                ]}>
                <Icon
                  type={'feather'}
                  name={'star'}
                  size={30}
                  color={SUPERLIKE}
                  style={{color: SUPERLIKE, fontSize: 30}}
                />
              </View>
            </TouchableFeedback>
            <TouchableFeedback onPress={() => onButtonPress('like')}>
              <View
                style={[
                  styles.commonLike,
                  {backgroundColor: color.backgroundColor},
                ]}>
                <Icon
                  type={'feather'}
                  name={'heart'}
                  size={30}
                  color={color.pinkColor}
                  style={{color: color.pinkColor, fontSize: 30}}
                />
              </View>
            </TouchableFeedback>
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        title={'Discover'}
        leftView={
          <TouchableFeedback onPress={onMenuPress}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'align-left'}
                size={28}
                color={color.primaryColor}
                style={{fontSize: 28, color: color.primaryColor}}
              />
            </View>
          </TouchableFeedback>
        }
        rightView={
          <View style={{flexDirection: 'row'}}>
            <TouchableFeedback onPress={onFilterPress}>
              <View style={styles.buttonView}>
                <Icon
                  type={'feather'}
                  name={'filter'}
                  size={25}
                  color={color.primaryColor}
                  style={{fontSize: 25, color: color.primaryColor}}
                />
              </View>
            </TouchableFeedback>
          </View>
        }
      />
      {loading ? (
        <View
          style={[
            styles.innerView,
            {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: color.primaryBackgroundColor,
            },
          ]}>
          <ActivityIndicator size={'small'} color={PINK} />
        </View>
      ) : (
        renderCard()
      )}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}>
        <FilterModal
          filterData={filterData}
          onClose={data => {
            setModalVisible(false);

            if (data) {
              setFilterData(data);
            }
          }}
        />
      </Modal>
      {matchUser && (
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={matchUser}
          onRequestClose={() => {
            setMatchUser(undefined);
          }}>
          <CongraMatchModal
            uid={''}
            data={matchUser}
            location={location}
            onClose={() => {
              setMatchUser(undefined);
            }}
          />
        </Modal>
      )}
    </View>
  );
};

export {Home};

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
  innerView: {
    flex: 1,
  },
  bottomView: {
    height: HEIGHT_RATIO(0.15),
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonLike: {
    padding: 20,
    marginHorizontal: 8,
    marginBottom: HEIGHT_RATIO(0.01),
    borderRadius: 40,
    ...shadow(),
  },
  cardView: {
    height: HEIGHT_RATIO(0.63),
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 1,
    ...shadow(),
  },
  onlineView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '800',
  },
});

const overlayLabel = {
  left: {
    title: 'NOPE',
    style: {
      label: {
        backgroundColor: RED,
        borderColor: RED,
        color: White,
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: -30,
      },
    },
  },
  right: {
    title: 'LIKE',
    style: {
      label: {
        backgroundColor: PINK,
        borderColor: PINK,
        color: White,
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 30,
        marginLeft: 30,
      },
    },
  },
  top: {
    title: 'SUPER LIKE',
    style: {
      label: {
        backgroundColor: SUPERLIKE,
        borderColor: SUPERLIKE,
        color: White,
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
};
