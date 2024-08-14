import React, {FunctionComponent, useMemo, useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ReadMore from 'react-native-read-more-text';
import {
  HEIGHT_RATIO,
  regex,
  TouchableFeedback,
  W_WIDTH,
} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {useTheme} from '../../../core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ONLINE, Transparent} from '../../../themes/constantColours';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {SquarePhotoComponent} from '../../components/general/SquarePhotoComponent';
import {distance} from '../../../utils/location';
import {useAppSelector} from '../../../core/redux/hooks';
import {getLocation} from '../../../data/redux-api/cards/cards-selector';

type OtherProfileRouteParams = {
  profileData: any;
  currentLocation?: any;
};

const OtherProfile: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProps>();
  const {
    params: {profileData, currentLocation},
  } = useRoute<RouteProps<'OtherProfile'>>();
  const findLocation = useAppSelector(getLocation);

  const [instagramPhotos] = useState([]);

  const getCurrentLocation = useMemo(
    () => currentLocation ?? findLocation,
    [currentLocation, findLocation],
  );

  const handleTextReady = () => {};

  const renderItemView = (title: string, value: string) => {
    return (
      <View
        style={[
          styles.commonView,
          {
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
          },
        ]}>
        <Text style={[styles.commonText, {color: color.primaryColor}]}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.commonText, {color: color.subPrimaryColor}]}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  const {
    online,
    name,
    DoB,
    bio,
    photos,
    height,
    bodyType,
    gender,
    sexuality,
    personality,
    education,
    maritalStatus,
    lookingFor,
    religion,
    drinkingStatus,
    smokingStatus,
    eatingStatus,
    location,
  } = profileData;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <StatusBar backgroundColor={Transparent} />
      <ParallaxScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        backgroundColor={color.container.backgroundColor}
        headerBackgroundColor={'transparent'}
        contentContainerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginTop: -25,
        }}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={() => (
          <View style={{height: PARALLAX_HEADER_HEIGHT, flex: 1}}>
            <FastImage
              source={{uri: regex.getProfilePic(photos)}}
              style={[styles.imageView]}
            />
          </View>
        )}
        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <TouchableFeedback onPress={goBack}>
              <View style={styles.buttonView}>
                <Icon
                  type={'feather'}
                  name={'x'}
                  size={30}
                  color={color.backgroundColor}
                  style={{fontSize: 30, color: color.backgroundColor}}
                />
              </View>
            </TouchableFeedback>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableFeedback>
                <View style={styles.buttonView}>
                  <Icon
                    type={'feather'}
                    name={'more-horizontal'}
                    color={color.backgroundColor}
                    style={{color: color.backgroundColor}}
                  />
                </View>
              </TouchableFeedback>
            </View>
          </View>
        )}>
        <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <View style={[styles.userView]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {online && <View style={styles.onlineView} />}
              <Text style={[styles.nameText, {color: color.primaryColor}]}>
                {name}
                {regex.getAge(DoB)}
              </Text>
            </View>
            <View
              style={[
                styles.locationView,
                {backgroundColor: color.primaryBackgroundColor},
              ]}>
              <Icon
                type={'feather'}
                name={'map-pin'}
                size={14}
                color={color.subPrimaryColor}
                style={{fontSize: 14, color: color.subPrimaryColor}}
              />
              <Text style={[{color: color.subPrimaryColor, marginLeft: 5}]}>
                {`${distance(location, getCurrentLocation, 'K')}`} km away
              </Text>
            </View>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={(handlePress: any) => {
                return (
                  <Text
                    style={[styles.readMore, {color: color.subPrimaryColor}]}
                    onPress={handlePress}>
                    Read more
                  </Text>
                );
              }}
              renderRevealedFooter={(handlePress: any) => {
                return (
                  <Text
                    style={[styles.readMore, {color: color.subPrimaryColor}]}
                    onPress={handlePress}>
                    Show less
                  </Text>
                );
              }}
              onReady={handleTextReady}>
              <Text style={[styles.bioText, {color: color.subPrimaryColor}]}>
                {bio}
              </Text>
            </ReadMore>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: color.borderColor,
              marginVertical: 20,
              marginBottom: 10,
            }}
          />

          {photos.length > 0 && (
            <View
              style={[
                styles.commonView,
                {backgroundColor: color.backgroundColor, borderBottomWidth: 0},
              ]}>
              <Text style={[styles.photoText, {color: color.primaryColor}]}>
                {`All Photos (${photos.length})`}
              </Text>
              <Text
                style={[styles.commonText, {color: color.pinkColor}]}
                onPress={() => navigate('AllPhotos', {photos})}>
                See All
              </Text>
            </View>
          )}
          {photos.length > 0 && (
            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {photos.map((item: any) => {
                return <SquarePhotoComponent key={item} item={item} />;
              })}
            </View>
          )}
          {photos.length > 0 && (
            <View
              style={{
                height: 1,
                backgroundColor: color.borderColor,
                marginVertical: 20,
                marginHorizontal: 20,
                marginBottom: 10,
              }}
            />
          )}

          {instagramPhotos.length > 0 && (
            <View
              style={[
                styles.commonView,
                {backgroundColor: color.backgroundColor, borderBottomWidth: 0},
              ]}>
              <Text style={[styles.photoText, {color: color.primaryColor}]}>
                Instagram Photos (0)
              </Text>
              <Text
                style={[styles.commonText, {color: color.pinkColor}]}
                onPress={() => navigate('AllPhotos')}>
                See All
              </Text>
            </View>
          )}
          {instagramPhotos.length > 0 && (
            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {instagramPhotos.map(item => {
                return <SquarePhotoComponent item={item} />;
              })}
            </View>
          )}

          {renderItemView('Height', height)}
          {renderItemView('Body Type', bodyType)}
          {renderItemView('Gender', gender)}
          {renderItemView('Sexuality', sexuality)}
          {renderItemView('Personality', personality)}
          {renderItemView('Education', education)}
          {renderItemView('Marital Status', maritalStatus)}
          {renderItemView('Looking for', lookingFor)}
          {renderItemView('Religion', religion)}
          {renderItemView('Drinking', drinkingStatus)}
          {renderItemView('Smoking', smokingStatus)}
          {renderItemView('Eating', eatingStatus)}
          <View style={{marginVertical: 15}} />
        </View>
      </ParallaxScrollView>
    </View>
  );
};

export {OtherProfile};
export type {OtherProfileRouteParams};

const PARALLAX_HEADER_HEIGHT = HEIGHT_RATIO(0.468);
const STICKY_HEADER_HEIGHT = HEIGHT_RATIO(0.103);

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
  imageView: {
    width: W_WIDTH,
    height: PARALLAX_HEADER_HEIGHT,
  },
  fixedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
  },
  userView: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  onlineView: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationView: {
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  readMore: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  bioText: {
    fontSize: 14,
    fontWeight: '400',
  },

  photoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addPhotoView: {
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonAddPhotoText: {
    fontSize: 18,
    fontWeight: '600',
  },
  commonView: {
    marginHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  commonText: {
    fontSize: 18,
    fontWeight: '400',
  },
});
