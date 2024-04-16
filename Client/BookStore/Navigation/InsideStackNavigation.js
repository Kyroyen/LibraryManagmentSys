import {createStackNavigator} from '@react-navigation/stack';
import BookPage from '../Screens/BookPage';
import Home from '../Screens/Home';

const Stack = createStackNavigator();

function InsideStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BookPage" component={BookPage} />
    </Stack.Navigator>
  );
}

export default InsideStack;