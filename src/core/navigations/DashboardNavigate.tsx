import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {FunctionComponent} from 'react';
import {Menu} from '../../native/screens/menu/Menu';
import {Home} from '../../native/screens/home/Home';
import {Matches} from '../../native/screens/matches/Matches';
import {MessagesList} from '../../native/screens/messages/MessagesList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {WhoLikesMe} from '../../native/screens/messages/WhoLikesMe';
import {Notifications} from '../../native/screens/notifications/Notifications';
import {SeekerLists} from '../../native/screens/seekers/SeekerLists';
import {SeekerForm} from '../../native/screens/seekers/SeekerForm';
import {AllPhoto} from '../../native/screens/profile/AllPhoto';
import {OtherProfile} from '../../native/screens/profile/OtherProfile';
import {SeekerRequestList} from '../../native/screens/seekers/SeekerRequestList';
import {SeekerDetail} from '../../native/screens/seekers/SeekerDetail';
import {SeekerUsers} from '../../native/screens/seekers/SeekerUsers';
import {Settings} from '../../native/screens/settings/Settings';
import {AccountSetting} from '../../native/screens/settings/AccountSetting';
import {SelectInformation} from '../../native/screens/profile/SelectInformation';
import {MyProfile} from '../../native/screens/profile/MyProfile';
import {PaymentPackages} from '../../native/screens/payment/PaymentPackages';
import {PaymentMethod} from '../../native/screens/payment/PaymentMethod';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
    gestureEnabled: false,
  };
};

const commonView = () => {
  return (
    <>
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="AllPhotos" component={AllPhoto} />
      {/* <Stack.Screen name="Chat" component={Chat} /> */}
      <Stack.Screen name="SeekerDetail" component={SeekerDetail} />
      <Stack.Screen name="SelectInformation" component={SelectInformation} />
      <Stack.Screen name="WhoLikeMe" component={WhoLikesMe} />
      <Stack.Screen name="SeekerRequest" component={SeekerRequestList} />
    </>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="HomeScreen" component={Home} />
      {commonView()}
    </Stack.Navigator>
  );
};

const MyProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="MyProfileScreen" component={MyProfile} />
      {commonView()}
    </Stack.Navigator>
  );
};

function PaymentStack() {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="PaymentPackages" component={PaymentPackages} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
    </Stack.Navigator>
  );
}

const MatchesStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="MatchesScreen" component={Matches} />
      {commonView()}
    </Stack.Navigator>
  );
};

const MessagesStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="Messages" component={MessagesList} />
      {commonView()}
    </Stack.Navigator>
  );
};

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="NotificationScreen" component={Notifications} />
      {commonView()}
    </Stack.Navigator>
  );
};

const SeekerStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="SeekerList" component={SeekerLists} />
      <Stack.Screen name="SeekerUser" component={SeekerUsers} />
      <Stack.Screen name="SeekerSendRequest" component={SeekerForm} />
      {/* <Stack.Screen name="SendMySeekerRequest" component={SendMySeekerRequestScreen} /> */}
      {commonView()}
    </Stack.Navigator>
  );
};

const SettingStack = () => {
  return (
    <Stack.Navigator screenOptions={navigationOption()}>
      <Stack.Screen name="SettingScreen" component={Settings} />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
    </Stack.Navigator>
  );
};

const DashboardNavigate: FunctionComponent = () => {
  const menu = (props: any) => {
    return <Menu {...props} />;
  };

  return (
    <Drawer.Navigator
      drawerContent={menu}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name={'Home'} component={HomeStack} />
      <Drawer.Screen name={'MyProfile'} component={MyProfileStack} />
      <Drawer.Screen name={'Payments'} component={PaymentStack} />
      <Drawer.Screen name={'Matches'} component={MatchesStack} />
      <Drawer.Screen name={'MessagesList'} component={MessagesStack} />
      <Drawer.Screen name={'Notifications'} component={NotificationStack} />
      <Drawer.Screen name={'Seekers'} component={SeekerStack} />
      <Drawer.Screen name={'Settings'} component={SettingStack} />
    </Drawer.Navigator>
  );
};

export {DashboardNavigate};
