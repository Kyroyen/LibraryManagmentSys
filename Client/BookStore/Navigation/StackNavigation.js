import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Onboarding from '../Screens/Onboarding';
import BookPage from '../Screens/BookPage';
import Home from '../Screens/Home';
import ListBook from '../Screens/ListBook';

import MyTabs from './BottomNavigation';
import SearchedBook from '../Screens/SearchedBook';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={MyTabs} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BookPage" component={BookPage} />
      <Stack.Screen name="ListBook" component={ListBook} />
      <Stack.Screen name="SeachedBook" component={SearchedBook} />
    </Stack.Navigator>
  );
}



export default MyStack;
