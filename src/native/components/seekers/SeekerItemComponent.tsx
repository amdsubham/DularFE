import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableFeedback, W_WIDTH} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../../core/navigations/routes';

interface SeekerItemComponentProps {
  item: any;
}

const SeekerItemComponent: FunctionComponent<SeekerItemComponentProps> = ({
  item,
}: SeekerItemComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  const {navigate} = useNavigation<NavigationProps>();

  return (
    <TouchableFeedback onPress={() => navigate('SeekerUser', {seeker: item})}>
      <View style={[styles.container, {borderColor: color.borderColor}]}>
        <FastImage source={item.source} style={[styles.imageView]} />
        <Text style={[styles.titleText, {color: color.primaryColor}]}>
          {item.title}
        </Text>
      </View>
    </TouchableFeedback>
  );
};

export {SeekerItemComponent};

const totalWidth = W_WIDTH / 3;
const imageWidth = totalWidth - 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: totalWidth,
    paddingHorizontal: 10,
    paddingVertical: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  imageView: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: imageWidth / 2,
  },
  titleText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});
