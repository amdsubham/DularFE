import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {W_WIDTH} from '../../../utils/regex';

interface SquarePhotoComponentProps {
  item: any;
}

const SquarePhotoComponent: FunctionComponent<SquarePhotoComponentProps> = ({
  item,
}: SquarePhotoComponentProps) => {
  return (
    <View style={[styles.container]}>
      <FastImage source={{uri: item.photoUrl}} style={[styles.imageView]} />
    </View>
  );
};

export {SquarePhotoComponent};

const totalWidth = W_WIDTH - 40;

const styles = StyleSheet.create({
  container: {
    height: totalWidth / 3,
    width: totalWidth / 3,
    borderRadius: 10,
  },
  imageView: {
    height: totalWidth / 3 - 10,
    width: totalWidth / 3 - 10,
    borderRadius: 10,
  },
});
