import {createStackNavigator} from '@react-navigation/stack';
import BookPage from '../Screens/BookPage';
import Home from '../Screens/Home';
import ListBook from '../Screens/ListBook';

const Stack = createStackNavigator();

function InsideStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BookPage" component={BookPage} />
      <Stack.Screen name="ListBook" component={ListBook} />
    </Stack.Navigator>
  );
}



export default InsideStack;
