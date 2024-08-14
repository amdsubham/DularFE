import React, {FunctionComponent} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {Header_Height, TouchableFeedback, W_WIDTH} from '../../../utils/regex';
import {useTheme} from '../../../core/hooks';

interface HeaderComponentProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  leftView?: React.ReactElement;
  rightView?: React.ReactElement;
  onLeftPress?: (value?: number) => void;
  type?: number;
  currentIndex?: number;
}

const HeaderComponent: FunctionComponent<HeaderComponentProps> = ({
  title,
  titleStyle,
  leftView,
  rightView,
  onLeftPress,
  type,
  currentIndex,
}: HeaderComponentProps) => {
  const {
    theme: {color},
  } = useTheme();
  if (type === 1) {
    // Register Step Header
    let getIndex = currentIndex;
    return (
      <Header
        containerStyle={styles.header}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        leftComponent={
          currentIndex === 1 ? (
            <TouchableFeedback onPress={() => onLeftPress?.(1)}>
              <View style={styles.buttonView}>
                <Icon
                  type={'feather'}
                  name={'chevron-left'}
                  size={35}
                  color={color.primaryColor}
                />
              </View>
            </TouchableFeedback>
          ) : (
            <TouchableFeedback onPress={() => onLeftPress?.(2)}>
              <View
                style={StyleSheet.flatten([
                  styles.buttonView,
                  {width: 80, paddingHorizontal: 10},
                ])}>
                <Text
                  style={StyleSheet.flatten({
                    fontSize: 14,
                    fontWeight: '600',
                    color: color.pinkColor,
                  })}>
                  Previous
                </Text>
              </View>
            </TouchableFeedback>
          )
        }
        centerComponent={
          <View style={styles.bodyView}>
            <View style={StyleSheet.flatten({flexDirection: 'row'})}>
              <Text
                style={StyleSheet.flatten({
                  fontSize: 16,
                  fontWeight: '600',
                  color: color.primaryColor,
                })}>
                {getIndex}
              </Text>
              <Text
                style={StyleSheet.flatten({
                  fontSize: 16,
                  fontWeight: '600',
                  color: color.subSecondaryColor,
                })}>
                /8
              </Text>
            </View>
          </View>
        }
        rightComponent={
          getIndex && getIndex > 2 ? (
            <TouchableFeedback onPress={() => onLeftPress?.(3)}>
              <View
                style={StyleSheet.flatten([
                  styles.buttonView,
                  {width: null, paddingHorizontal: 10},
                ])}>
                <Text
                  style={StyleSheet.flatten({
                    fontSize: 14,
                    fontWeight: '600',
                    color: color.pinkColor,
                  })}>
                  Skip
                </Text>
              </View>
            </TouchableFeedback>
          ) : (
            <View style={[styles.buttonView]} />
          )
        }
      />
    );
  }

  return (
    <Header
      containerStyle={styles.header}
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
      leftComponent={
        leftView ? (
          leftView
        ) : (
          <TouchableFeedback onPress={() => onLeftPress?.()}>
            <View style={styles.buttonView}>
              <Icon
                type={'feather'}
                name={'chevron-left'}
                size={35}
                color={color.primaryColor}
              />
            </View>
          </TouchableFeedback>
        )
      }
      centerComponent={
        <View style={styles.bodyView}>
          {title && (
            <Text
              style={StyleSheet.flatten([
                {
                  fontSize: 20,
                  fontWeight: '600',
                  color: color.primaryColor,
                },
                titleStyle,
              ])}>
              {title}
            </Text>
          )}
        </View>
      }
      rightComponent={
        rightView ? rightView : <View style={styles.buttonView} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: W_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    paddingLeft: 0,
    paddingRight: 0,
    height: Header_Height,
    width: W_WIDTH,
    borderBottomWidth: 0,
  },
  bodyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {HeaderComponent};
