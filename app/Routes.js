import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './containers/HomePage/Loadable';
import Login from './containers/LoginPage/Loadable';
import Registration from './containers/RegistrationPage/Loadable';
import Vacancy from './containers/VacancyPage/Loadable';
import Agreement from './containers/AgreementPage/Loadable';
import Profile from './containers/ProfilePage/Loadable';
import MyResumes from './containers/ProfilePage/MyResumes/Loadable';
import CreateResume from './containers/CreateResumePage/Loadable';
import { navigationRef } from './utils/RootNavigation';
import Modals from './containers/Modals/Modals';
import Modals2 from './containers/Modals/Modals2';
import { useInjectSaga } from './utils/injectSaga';
import saga from './containers/App/sagas';
import { DAEMON } from './utils/constants';
import { getItem } from './utils/storage';
import { setUserRequest } from './containers/App/actions/auth';
import { useDispatch } from 'react-redux';

const Stack = createStackNavigator();

export default function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    getItem('token').then((res) => {
      if (res) {
        dispatch(setUserRequest());
      }
    });
  }, []);
  useInjectSaga({ key: 'app', saga, mode: DAEMON });
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Vacancy" component={Vacancy} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Agreement" component={Agreement} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MyResumes" component={MyResumes} />
        <Stack.Screen name="CreateResume" component={CreateResume} />
      </Stack.Navigator>
      <Modals />
      <Modals2 />
    </NavigationContainer>
  );
}
