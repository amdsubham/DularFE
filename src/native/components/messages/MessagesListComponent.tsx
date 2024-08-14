import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {TouchableFeedback} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';
import {ONLINE, PINK, White} from '../../../themes/constantColours';

interface MessagesListComponentProps {
  uid: any;
  item: any;
}

const MessagesListComponent: FunctionComponent<MessagesListComponentProps> = ({
  uid,
  item,
}: MessagesListComponentProps) => {
  const {
    theme: {color},
  } = useTheme();

  const {user, latestMessage} = item;
  const {text, createdAt} = latestMessage;

  let checkRead = item[uid] ? item[uid] < createdAt : true;
  return (
    <TouchableFeedback onPress={() => null}>
      <View style={[styles.container]}>
        <View style={styles.rowView}>
          <View style={styles.profileView}>
            <FastImage
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg',
              }}
              style={{width: 46, height: 46, borderRadius: 23}}
            />
            <View
              style={[
                styles.onlineView,
                {
                  backgroundColor: user.online
                    ? ONLINE
                    : color.subSecondaryColor,
                },
              ]}
            />
          </View>
          <View style={[styles.textView, {borderColor: color.borderColor}]}>
            <View style={[styles.innerRowView]}>
              <Text style={[styles.nameText, {color: color.secondaryColor}]}>
                {user.name}
              </Text>
              <Text style={[styles.timeText, {color: color.secondaryColor}]}>
                {moment.unix(createdAt).local().fromNow(true)}
              </Text>
            </View>
            <View style={[styles.innerRowView, {marginTop: 5}]}>
              <Text
                style={[
                  styles.messageText,
                  {
                    fontWeight: checkRead ? '500' : '400',
                    color: color.primaryColor,
                  },
                ]}>
                {text}
              </Text>
              {checkRead && <View style={styles.readView} />}
            </View>
          </View>
        </View>
      </View>
    </TouchableFeedback>
  );
};

export default MessagesListComponent;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  rowView: {
    flexDirection: 'row',
  },
  profileView: {
    paddingVertical: 15,
  },
  onlineView: {
    position: 'absolute',
    left: 2,
    top: 13,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: White,
    backgroundColor: ONLINE,
    marginRight: 5,
  },
  textView: {
    flex: 1,
    marginLeft: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  innerRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '400',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '400',
  },
  readView: {
    marginLeft: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: PINK,
  },
});
