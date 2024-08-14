import React, {FunctionComponent, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProps, RouteProps} from '../../../core/navigations/routes';
import {HeaderComponent} from '../../components/general/HeaderComponent';
import {useTheme} from '../../../core/hooks';
import {AddPhotoComponent} from '../../components/register/AddPhotoComponent';
import {TouchableFeedback} from '../../../utils/regex';
import ImagePicker from 'react-native-image-crop-picker';
import {UserModel} from '../../../data/model/userSchema';
import {assetUploadInCloudinaryServer} from '../../../data/redux-api/firestore/cloudinaryStorageAction';
import {useAuth} from '../../../data/redux-api/hook';

type AddPhotoRouteParams = {
  data: UserModel;
};

const AddPhoto: FunctionComponent = () => {
  const {
    theme: {color},
  } = useTheme();
  const {
    params: {data},
  } = useRoute<RouteProps<'AddPhoto'>>();
  const [photoData, setPhotoData] = useState([
    {
      id: 1,
      photoUrl: '',
      data: {},
    },
    {
      id: 2,
      photoUrl: '',
      data: {},
    },
    {
      id: 3,
      photoUrl: '',
      data: {},
    },
    {
      id: 4,
      photoUrl: '',
      data: {},
    },
    {
      id: 5,
      photoUrl: '',
      data: {},
    },
    {
      id: 6,
      photoUrl: '',
      data: {},
    },
    {
      id: 7,
      photoUrl: '',
      data: {},
    },
    {
      id: 8,
      photoUrl: '',
      data: {},
    },
    {
      id: 9,
      photoUrl: '',
      data: {},
    },
    {
      id: 10,
      photoUrl: '',
      data: {},
    },
  ]);
  const lastIndex = useRef(0);
  const {navigate, goBack} = useNavigation<NavigationProps>();

  const {updateUserRequest} = useAuth();

  const onBackPress = () => {
    goBack();
  };

  const onRightPress = () => {
    const getResults: any[] = [];
    photoData.forEach(a => {
      if (a.photoUrl !== '') {
        getResults.push({...a.data});
      }
    });

    if (getResults.length > 0) {
      let uploadPhotos: any[] = [];
      getResults.forEach(file => {
        uploadPhotos.push(assetUploadInCloudinaryServer(file, false));
      });

      Promise.all(uploadPhotos)
        .then(response => {
          let updatePhotos: any[] = [];
          response.forEach(asset => {
            updatePhotos.push({
              photoUrl: asset.secure_url,
              public_id: asset.public_id,
            });
          });
          updateUserRequest({
            stepCompleted: 9,
            photos: updatePhotos,
            status: 'Active',
          });
          navigate('Congratulations', {
            data: {...data, photos: updatePhotos},
            photoData: getResults,
          });
        })
        .catch(() => {});
    } else {
      updateUserRequest({
        stepCompleted: 9,
        photos: [],
        status: 'Active',
      });
      navigate('Congratulations', {
        data: {...data, photos: []},
        photoData: [
          {
            path: 'https://i7.uihere.com/icons/263/936/60/user-avatar-dad7b8c4dcef5018355540aed51e83ea.png',
          },
        ],
      });
    }
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
    }).then(images => {
      const updatePhotoData = JSON.parse(JSON.stringify(photoData));
      for (let i = 0; i < images.length; i++) {
        let photo = updatePhotoData[lastIndex.current + i];
        if (photo.photoUrl.length === 0) {
          photo.photoUrl = images[i].path;
          photo.data = images[i];
        }
      }
      lastIndex.current = lastIndex.current + images.length;
      setPhotoData(updatePhotoData);
    });
  };

  const removePhoto = (index: number) => {
    const removePhotoData = photoData;
    let getData = removePhotoData[index];
    getData.photoUrl = '';
    getData.data = '';
    const getResults: any[] = [];
    removePhotoData.forEach(a => {
      if (a.photoUrl !== '') {
        getResults.push(a.data);
      }
    });
    const updatePhotoData = JSON.parse(JSON.stringify(photoData));
    for (let i = 0; i < photoData.length; i++) {
      let photo = updatePhotoData[i];
      if (i < getResults.length) {
        photo.photoUrl = getResults[i].path;
        photo.data = getResults[i];
      } else {
        photo.photoUrl = '';
        photo.data = '';
      }
    }
    lastIndex.current = getResults.length;
    setPhotoData(updatePhotoData);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color.container.backgroundColor},
      ]}>
      <HeaderComponent
        title={'Add Photos'}
        rightView={
          <TouchableFeedback onPress={onRightPress}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'check'}
                color={color.pinkColor}
                style={{color: color.pinkColor}}
              />
            </View>
          </TouchableFeedback>
        }
        onLeftPress={onBackPress}
      />
      <View
        style={[
          styles.container,
          {backgroundColor: color.container.backgroundColor},
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={photoData}
          extraData={photoData}
          renderItem={({item, index}) => (
            <AddPhotoComponent
              item={item}
              index={index}
              openLibrary={openLibrary}
              removePhoto={removePhoto}
            />
          )}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export {AddPhoto};
export type {AddPhotoRouteParams};

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
});
