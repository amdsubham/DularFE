import React, {FunctionComponent} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableFeedback} from '../../../utils/regex';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements';

interface CommonButtonProps {
  loading?: boolean;
  backgroundColor: string;
  borderColor: string;
  title: string;
  textColor: string;
  container?: StyleProp<ViewStyle>;
  innerContainer?: StyleProp<ViewStyle>;
  onPress: () => void;
  dropDownArrow?: boolean;
  arrowColor?: string;
}

const CommonButton: FunctionComponent<CommonButtonProps> = ({
  loading,
  backgroundColor,
  borderColor,
  title,
  textColor,
  container,
  innerContainer,
  onPress,
  dropDownArrow,
  arrowColor,
}: CommonButtonProps) => {
  return (
    <View style={[styles.viewContainer, container]}>
      <TouchableFeedback onPress={() => onPress()}>
        <View
          style={[
            styles.buttonInnerContainer,
            {backgroundColor, borderColor},
            innerContainer,
          ]}>
          {loading ? (
            <ActivityIndicator color={textColor} size={'small'} />
          ) : (
            <>
              <Text style={[styles.buttonText, {color: textColor}]}>
                {title}
              </Text>
              {dropDownArrow && (
                <Icon
                  type={'feather'}
                  name={'chevron-down'}
                  size={20}
                  color={arrowColor}
                  style={StyleSheet.flatten([
                    styles.arrowContainer,
                    {color: arrowColor},
                  ])}
                />
              )}
            </>
          )}
        </View>
      </TouchableFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    marginHorizontal: 20,
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderWidth: 1,
    borderRadius: 28,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  arrowContainer: {
    fontSize: 20,
    position: 'absolute',
    right: 20,
  },
});

export {CommonButton};
