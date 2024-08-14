import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {
  HEIGHT_RATIO,
  regex,
  TouchableFeedback,
  W_WIDTH,
} from '../../../utils/regex';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import ReadMore from 'react-native-read-more-text';
import ImagePicker from 'react-native-image-crop-picker';
import {useAuth} from '../../../data/redux-api/hook';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';
import {useTheme} from '../../../core/hooks';
import {Transparent} from '../../../themes/constantColours';
import {SquarePhotoComponent} from '../../components/general/SquarePhotoComponent';
import {assetUploadInCloudinaryServer} from '../../../data/redux-api/firestore/cloudinaryStorageAction';

const MyProfile: FunctionComponent = () => {
  const [name, setName] = useState<string>();
  const [DoB, setDob] = useState<string>();
  const [photos, setPhotos] = useState<any | undefined>();
  const [bio, setBio] = useState<string>();
  const [height, setHeight] = useState<string>();
  const [bodyType, setBodyType] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [sexuality, setSexuality] = useState<string>();
  const [personality, setPersonality] = useState<string>();
  const [education, setEducation] = useState<string>();
  const [maritalStatus, setMaritalStatus] = useState<string>();
  const [lookingFor, setLookingFor] = useState<string>();
  const [religion, setReligion] = useState<string>();
  const [drinkingStatus, setDrinking] = useState<string>();
  const [smokingStatus, setSmoking] = useState<string>();
  const [eatingStatus, setEating] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>();
  const lastIndex = useRef(0);

  const {user, updateUserRequest} = useAuth();
  const {
    theme: {color},
  } = useTheme();
  const {navigate, goBack} = useNavigation<NavigationProps>();

  useEffect(() => {
    setName(user?.name ?? '');
    setDob(user?.DoB);
    setPhotos(user?.photos);
    setBio(user?.bio);
    setHeight(user?.height);
    setBodyType(user?.bodyType);
    setGender(user?.gender);
    setSexuality(user?.sexuality);
    setPersonality(user?.personality);
    setEducation(user?.education);
    setMaritalStatus(user?.maritalStatus);
    setLookingFor(user?.lookingFor);
    setReligion(user?.religion);
    setDrinking(user?.drinkingStatus);
    setSmoking(user?.smokingStatus);
    setEating(user?.eatingStatus);
    setIsEdit(false);

    lastIndex.current =
      user && user.photos?.length > 0 ? user?.photos.length : 0;
  }, [user]);

  const onEditPress = () => {
    if (isEdit) {
      let getUpdateData = {
        bio: bio ?? '',
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
      };
      updateUserRequest(getUpdateData);
    }
    setIsEdit(!isEdit);
  };

  const _handleTextReady = () => {};

  const onItemInformationPress = ({
    title,
    value,
    index,
  }: {
    title: string;
    value: any;
    index: number;
  }) => {
    if (!isEdit) {
      return;
    }

    const callback = (params: any) => {
      if (params.index === 1) {
        setHeight(params.value);
      } else if (params.index === 2) {
        setBodyType(params.value);
      } else if (params.index === 3) {
        setGender(params.value);
      } else if (params.index === 4) {
        setSexuality(params.value);
      } else if (params.index === 5) {
        setPersonality(params.value);
      } else if (params.index === 6) {
        setEducation(params.value);
      } else if (params.index === 7) {
        setMaritalStatus(params.value);
      } else if (params.index === 8) {
        setLookingFor(params.value);
      } else if (params.index === 9) {
        setReligion(params.value);
      } else if (params.index === 10) {
        setDrinking(params.value);
      } else if (params.index === 11) {
        setSmoking(params.value);
      } else if (params.index === 12) {
        setEating(params.value);
      }
    };

    navigate('SelectInformation', {title, value, index, callback});
  };

  const uploadPhotos = (images: any) => {
    const updatePhotos: any[] = [];
    for (let i = 0; i < images.length; i++) {
      updatePhotos.push(assetUploadInCloudinaryServer(images[i], false));
    }
    Promise.all(updatePhotos)
      .then(response => {
        let getPhotos = [...photos];
        response.forEach(asset => {
          getPhotos.push({
            photoUrl: asset.secure_url,
            public_id: asset.public_id,
          });
        });
        lastIndex.current = photos.length;
        setPhotos(getPhotos);
        updateUserRequest({photos: getPhotos});
      })
      .catch(() => {});
  };

  const openLibrary = () => {
    let selectedLength = 12 - lastIndex.current;
    if (selectedLength < 0) {
      return;
    }

    ImagePicker.openPicker({
      multiple: true,
      maxSize: selectedLength,
      compressQuality: 20,
      mediaType: 'photo',
    }).then((images: any) => {
      if (images.length > 0) {
        uploadPhotos(images);
      }
    });
  };

  const renderItemView = (title: string, value: any, index: number) => {
    return (
      <TouchableFeedback
        onPress={() => onItemInformationPress({title, value, index})}>
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
            {isEdit && (
              <Icon
                type={'feather'}
                name={'chevron-right'}
                size={25}
                color={color.subPrimaryColor}
                style={{
                  marginLeft: 10,
                  fontSize: 25,
                  color: color.subPrimaryColor,
                }}
              />
            )}
          </View>
        </View>
      </TouchableFeedback>
    );
  };

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
                  name={'chevron-left'}
                  size={35}
                  color={color.backgroundColor}
                  style={{fontSize: 35, color: color.backgroundColor}}
                />
              </View>
            </TouchableFeedback>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableFeedback onPress={onEditPress}>
                <View style={styles.buttonView}>
                  <Icon
                    type={'feather'}
                    name={isEdit ? 'send' : 'edit'}
                    color={color.backgroundColor}
                    style={{color: color.backgroundColor}}
                  />
                </View>
              </TouchableFeedback>
            </View>
          </View>
        )}>
        <View style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: 50,
                height: 6,
                borderRadius: 3,
                backgroundColor: color.subSecondaryColor,
              }}
            />
          </View>
          <Text
            style={[
              styles.nameText,
              {color: color.primaryColor},
            ]}>{`${name}${regex.getAge(DoB ?? '')}`}</Text>
          <TouchableFeedback onPress={() => navigate('Payments')}>
            <View style={[styles.premiumView]}>
              <View
                style={[
                  styles.premiumInnerView,
                  {backgroundColor: color.pinkColor},
                ]}>
                <Icon
                  type={'MaterialCommunityIcons'}
                  name={'crown'}
                  style={{color: color.backgroundColor}}
                />
                <Text
                  style={[styles.premiumText, {color: color.backgroundColor}]}>
                  Upgrade to Premium
                </Text>
              </View>
            </View>
          </TouchableFeedback>
          {isEdit ? (
            <TextInput
              style={[
                styles.bioText,
                {
                  color: color.subPrimaryColor,
                  backgroundColor: color.textInputBackgroundColor,
                },
              ]}
              value={bio}
              placeholder="Write something about yourself..."
              placeholderTextColor={color.subPrimaryColor}
              multiline={true}
              numberOfLines={5}
              onChangeText={setBio}
            />
          ) : (
            <View style={{marginHorizontal: 20}}>
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
                onReady={_handleTextReady}>
                <Text style={[styles.bioDText, {color: color.subPrimaryColor}]}>
                  {bio}
                </Text>
              </ReadMore>
            </View>
          )}
          <View
            style={{
              height: 1,
              backgroundColor: color.borderColor,
              marginVertical: 20,
            }}
          />

          <Text style={[styles.photoText, {color: color.primaryColor}]}>
            {`All Photos (${photos?.length ?? 0})`}
          </Text>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {photos?.map((item: any) => {
              return <SquarePhotoComponent item={item} />;
            })}
          </View>
          <TouchableFeedback onPress={() => openLibrary()}>
            <View
              style={[
                styles.addPhotoView,
                {
                  backgroundColor: color.primaryBackgroundColor,
                  borderColor: color.borderColor,
                },
              ]}>
              <Icon
                type={'feather'}
                name={'plus'}
                color={color.subSecondaryColor}
                style={{color: color.subSecondaryColor}}
              />
              <Text
                style={[
                  styles.buttonAddPhotoText,
                  {color: color.subSecondaryColor},
                ]}>
                {' '}
                Add Photos
              </Text>
            </View>
          </TouchableFeedback>

          <View
            style={[
              styles.commonView,
              {
                backgroundColor: color.backgroundColor,
                borderColor: color.borderColor,
              },
            ]}>
            <Text
              style={[
                styles.commonText,
                {fontWeight: '600', color: color.primaryColor},
              ]}>
              Your Information
            </Text>
          </View>
          {renderItemView('Height', height, 1)}
          {renderItemView('Body Type', bodyType, 2)}
          {renderItemView('Gender', gender, 3)}
          {renderItemView('Sexuality', sexuality, 4)}
          {renderItemView('Personality', personality, 5)}
          {renderItemView('Education', education, 6)}
          {renderItemView('Marital Status', maritalStatus, 7)}
          {renderItemView('Looking for', lookingFor, 8)}
          {renderItemView('Religion', religion, 9)}
          {renderItemView('Drinking', drinkingStatus, 10)}
          {renderItemView('Smoking', smokingStatus, 11)}
          {renderItemView('Eating', eatingStatus, 12)}
          <View style={{marginVertical: 15}} />
        </View>
      </ParallaxScrollView>
    </View>
  );
};

export {MyProfile};

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
  premiumView: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  premiumInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    borderRadius: 15,
  },
  premiumText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  fixedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    bottom: 0,
    right: 0,
    left: 0,
  },
  nameText: {
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 24,
    fontWeight: '800',
  },
  readMore: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  bioDText: {
    fontSize: 14,
    fontWeight: '400',
  },
  bioText: {
    marginHorizontal: 20,
    height: 100,
    padding: 15,
    paddingTop: 15,
    borderRadius: 15,
    marginTop: 5,
  },
  photoText: {
    paddingHorizontal: 20,
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
    fontSize: 16,
    fontWeight: '400',
  },
});
