import {RouteProp} from '@react-navigation/native';
import {LoginAndRegisterRouteParams} from '../../../native/screens/login-register/LoginAndRegister';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {VerificationRouteParams} from '../../../native/screens/verification/Verification';
import {RegistrationStepRouteParams} from '../../../native/screens/registration-step/RegistrationStep';
import {AddPhotoRouteParams} from '../../../native/screens/add-photo/AddPhoto';
import {CongratulationsRouteParams} from '../../../native/screens/congratulations/Congratulations';
import {SeekerFormRouteParams} from '../../../native/screens/seekers/SeekerForm';
import {OtherProfileRouteParams} from '../../../native/screens/profile/OtherProfile';
import {AllPhotoRouteParams} from '../../../native/screens/profile/AllPhoto';
import {ChatRouteParams} from '../../../native/screens/messages/Chat';
import {SelectInformationRouteParams} from '../../../native/screens/profile/SelectInformation';
import {PaymentMethodRouteProps} from '../../../native/screens/payment/PaymentMethod';
import {SeekerUsersRouteParams} from '../../../native/screens/seekers/SeekerUsers';
import {SeekerDetailRouteParams} from '../../../native/screens/seekers/SeekerDetail';

type AppRouteList = {
  GetStarted: undefined;
  LoginAndRegister: LoginAndRegisterRouteParams;
  Verification: VerificationRouteParams;
  RegistrationStep: RegistrationStepRouteParams;
  AddPhoto: AddPhotoRouteParams;
  Congratulations: CongratulationsRouteParams;
  Home: undefined;
  Matches: undefined;
  Notifications: undefined;
  MessagesList: undefined;
  WhoLikeMe: undefined;
  Chat: ChatRouteParams;
  Seekers: undefined;
  SeekerSendRequest: SeekerFormRouteParams;
  Settings: undefined;
  AccountSetting: undefined;
  Profile: undefined;
  MyProfile: undefined;
  SelectInformation: SelectInformationRouteParams;
  OtherProfile: OtherProfileRouteParams;
  AllPhotos: AllPhotoRouteParams | undefined;
  Payments: undefined;
  PaymentPackages: undefined;
  PaymentMethod: PaymentMethodRouteProps;
  SeekerRequest: undefined;
  SeekerUser: SeekerUsersRouteParams;
  SendMySeekerRequest: undefined;
  SeekerDetail: SeekerDetailRouteParams;
};

type RouteList = AppRouteList;

type NavigationProps = NativeStackNavigationProp<RouteList>;

type RouteProps<RouteName extends keyof RouteList> = RouteProp<
  RouteList,
  RouteName
>;

export type {NavigationProps, RouteProps, RouteList};
