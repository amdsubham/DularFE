import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {useTheme} from '../../../core/hooks';

interface WhoLikeComponentProps {
  item: any;
}

const WhoLikeComponent: FunctionComponent<WhoLikeComponentProps> = ({
  item,
}: WhoLikeComponentProps) => {
  const {
    theme: {color},
  } = useTheme();

  return (
    <View style={[styles.container, {borderColor: color.borderColor}]}>
      <FastImage
        source={{
          uri: 'https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg',
        }}
        style={{width: 56, height: 56, borderRadius: 28}}
      />
      <View style={[styles.infoView]}>
        <View style={[styles.nameView]}>
          <Text style={[styles.nameText, {color: color.primaryColor}]}>
            {'Hello'}
            {/* {regex.getAge(user.DoB)} */}
          </Text>
          <Text style={[styles.likeText, {color: color.secondaryColor}]}>
            {'Liked your profile'}
          </Text>
          <Text style={[styles.timeText, {color: color.subSecondaryColor}]}>
            {moment.unix(item.createdAt).local().fromNow(true)}
          </Text>
        </View>
        <FastImage
          source={require('./../../../core/assets/heart.png')}
          style={{width: 22, height: 20}}
        />
      </View>
    </View>
  );
};

export {WhoLikeComponent};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
  },
  nameView: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  likeText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  timeText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '400',
  },
});
