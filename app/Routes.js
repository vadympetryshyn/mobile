import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './containers/HomePage/Loadable';
import Login from './containers/LoginPage/Loadable';
import Registration from './containers/RegistrationPage/Loadable';
import Vacancy from './containers/VacancyPage/Loadable';
import { navigationRef } from './utils/RootNavigation';
import Modals from './containers/Modals/Modals';
import Modals2 from './containers/Modals/Modals2';
import { useInjectSaga } from './utils/injectSaga';
import saga from './containers/App/sagas';
import { DAEMON } from './utils/constants';

const Stack = createStackNavigator();

export default function Routes() {
  useInjectSaga({ key: 'app', saga, mode: DAEMON });
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Vacancy" component={Vacancy} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
      <Modals />
      <Modals2 />
    </NavigationContainer>
  );
}
