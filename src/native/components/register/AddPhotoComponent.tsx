import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {TouchableFeedback, W_WIDTH, shadow} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';

interface AddPhotoComponentProps {
  item: any;
  index: number;
  openLibrary: (item: any) => void;
  removePhoto: (index: number) => void;
}

const AddPhotoComponent: FunctionComponent<AddPhotoComponentProps> = ({
  item,
  index,
  openLibrary,
  removePhoto,
}: AddPhotoComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.innerView,
          {backgroundColor: color.textInputBackgroundColor},
        ]}>
        {item.photoUrl ? (
          <View style={[styles.innerView]}>
            <FastImage
              source={{uri: item.photoUrl}}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
            <TouchableFeedback onPress={() => removePhoto(index)}>
              <View style={[styles.deleteView]}>
                <Icon
                  type={'feather'}
                  name={'trash'}
                  size={18}
                  color={color.backgroundColor}
                  style={{fontSize: 18, color: color.backgroundColor}}
                />
              </View>
            </TouchableFeedback>
          </View>
        ) : (
          <TouchableFeedback onPress={() => openLibrary(item)}>
            <View
              style={[
                styles.innerView,
                {alignItems: 'center', justifyContent: 'center'},
              ]}>
              <View
                style={[
                  styles.plusView,
                  {backgroundColor: color.backgroundColor},
                ]}>
                <Icon
                  type={'feather'}
                  name={'plus'}
                  size={20}
                  color={color.subSecondaryColor}
                  style={{fontSize: 20, color: color.subSecondaryColor}}
                />
              </View>
            </View>
          </TouchableFeedback>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 200,
    width: W_WIDTH / 2 - 20,
  },
  innerView: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  plusView: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(5),
  },
  deleteView: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1A1A1A95',
    ...shadow(5),
  },
});

export {AddPhotoComponent};
