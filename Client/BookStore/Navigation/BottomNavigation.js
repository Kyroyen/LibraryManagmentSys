import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Browse from '../Screens/Browse';
import BooksIssued from '../Screens/BooksIssued';
import UserAccount from '../Screens/UserAccount';
import {StyleSheet, Image, View, Text} from 'react-native';
import InsideStack from './InsideStackNavigation';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...style.BtNavi,
        },
      }}>
      <Tab.Screen
        name="HomePage"
        component={InsideStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Assets/NavigationIcon/house.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#CE5959' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#CE5959' : '#748c94',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Assets/NavigationIcon/search.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#CE5959' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#CE5959' : '#748c94',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Browse
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="BooksIssued"
        component={BooksIssued}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Assets/NavigationIcon/book.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#CE5959' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#CE5959' : '#748c94',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Book Issued
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UserAccount"
        component={UserAccount}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../Assets/NavigationIcon/account.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#CE5959' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#CE5959' : '#748c94',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                User
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen name='InsideStackNavigation' component={MyStack}/> */}
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  BtNavi: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    elevation: 10,
    backgroundColor: '#F5EEE6',
    borderRadius: 15,
    height: 80,
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MyTabs;
