import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {HEIGHT_RATIO} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';

interface AllPhotosComponentProps {
  item: any;
}

const AllPhotosComponent: FunctionComponent<AllPhotosComponentProps> = ({
  item,
}: AllPhotosComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  return (
    <View style={[styles.container, {borderColor: color.borderColor}]}>
      <FastImage
        source={{
          uri: item.photoUrl,
        }}
        style={[styles.imageView]}
      />
    </View>
  );
};

export {AllPhotosComponent};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: HEIGHT_RATIO(0.22),
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageView: {
    width: null,
    height: HEIGHT_RATIO(0.22),
    borderRadius: 10,
  },
});
