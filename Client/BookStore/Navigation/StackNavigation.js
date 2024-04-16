import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Onboarding from '../Screens/Onboarding';

import MyTabs from './BottomNavigation';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={MyTabs} />
    </Stack.Navigator>
  );
}



export default MyStack;
