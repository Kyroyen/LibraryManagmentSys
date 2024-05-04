import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, View, Text} from 'react-native';
import InsideStack from './InsideStackNavigation';
import Browse from '../Screens/Browse';
import BooksIssued from '../Screens/BooksIssued';
import UserAccount from '../Screens/UserAccount';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name="HomePage"
        component={InsideStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../Assets/NavigationIcon/house.png')}
                resizeMode="contain"
                style={[
                  styles.tabIcon,
                  {tintColor: focused ? '#CE5959' : '#748c94'},
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: focused ? '#CE5959' : '#748c94'},
                ]}>
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
          tabBarIcon: ({focused}) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../Assets/NavigationIcon/search.png')}
                resizeMode="contain"
                style={[
                  styles.tabIcon,
                  {tintColor: focused ? '#CE5959' : '#748c94'},
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: focused ? '#CE5959' : '#748c94'},
                ]}>
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
            <View style={styles.tabItem}>
              <Image
                source={require('../Assets/NavigationIcon/book.png')}
                resizeMode="contain"
                style={[
                  styles.tabIcon,
                  {tintColor: focused ? '#CE5959' : '#748c94'},
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: focused ? '#CE5959' : '#748c94'},
                ]}>
                Books Issued
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
            <View style={styles.tabItem}>
              <Image
                source={require('../Assets/NavigationIcon/account.png')}
                resizeMode="contain"
                style={[
                  styles.tabIcon,
                  {tintColor: focused ? '#CE5959' : '#748c94'},
                ]}
              />
              <Text
                style={[
                  styles.tabText,
                  {color: focused ? '#CE5959' : '#748c94'},
                ]}>
                User
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
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
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MyTabs;
