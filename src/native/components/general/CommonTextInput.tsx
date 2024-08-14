import React, {FunctionComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, InputProps} from 'react-native-elements';

interface CommonTextInputProps extends InputProps {}

const CommonTextInput: FunctionComponent<CommonTextInputProps> = ({
  placeholder,
  ...props
}: CommonTextInputProps) => {
  return (
    <View style={[styles.viewContainer]}>
      <View>
        <Text style={{marginLeft: 10}}>{placeholder}</Text>
        <Input style={{paddingLeft: 0}} autoCapitalize={'none'} {...props} />
      </View>
    </View>
  );
};

export {CommonTextInput};

const styles = StyleSheet.create({
  viewContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});
