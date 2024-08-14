import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';
import {GetStarted} from '../../native/screens/get-started/GetStarted';
import {LoginAndRegister} from '../../native/screens/login-register/LoginAndRegister';
import {Verification} from '../../native/screens/verification/Verification';
import {RegistrationStep} from '../../native/screens/registration-step/RegistrationStep';
import {AddPhoto} from '../../native/screens/add-photo/AddPhoto';
import {Congratulations} from '../../native/screens/congratulations/Congratulations';

const Stack = createNativeStackNavigator();

const AuthenicationNavigate: FunctionComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'GetStarted'} component={GetStarted} />
      <Stack.Screen name={'LoginAndRegister'} component={LoginAndRegister} />
      <Stack.Screen name={'Verification'} component={Verification} />
      <Stack.Screen name={'RegistrationStep'} component={RegistrationStep} />
      <Stack.Screen name={'AddPhoto'} component={AddPhoto} />
      <Stack.Screen name={'Congratulations'} component={Congratulations} />
    </Stack.Navigator>
  );
};

export {AuthenicationNavigate};
