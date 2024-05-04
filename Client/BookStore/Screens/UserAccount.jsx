import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {React, useState} from 'react';
import {Avatar, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UserAccount = () => {
  const fetchData = async () => {
    const res = axios.get('http://192.168.58.124:8000/api/');
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmailAddress] = useState('');
  const [Username, setUsername] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSectionOne}>
          <View
            style={[
              {flexDirection: 'row', marginTop: 16},
              styles.backgroundStyle,
            ]}>
            <Avatar.Image source={require('../Assets/Avatar.png')} size={80} />
            <View
              style={{
                marginLeft: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Title
                style={[
                  styles.title,
                  {
                    marginTop: 16,
                    marginBottom: 5,
                  },
                ]}>
                <Text>
                  {firstName}
                  {lastName}
                </Text>
              </Title>
            </View>
          </View>
        </View>

        <View style={[styles.userInfoSectionTwo, styles.backgroundStyle]}>
          <View style={styles.row}>
            <Text>
              <AntDesign name="user" size={20} color="#E52B50" />
            </Text>
            <Text style={{marginLeft: 20}}>{Username}</Text>
          </View>
          <View style={styles.row}>
            <Text>
              <Icon name="mail" size={20} color="#E52B50" />
            </Text>
            <Text style={{marginLeft: 20}}>{email}</Text>
          </View>
        </View>

        <View style={{marginTop: -10}}>
          <View>
            <TouchableOpacity style={styles.menuItem}>
              <Text>
                <Icon name="shopping-bag" size={20} color="#E52B50" />
              </Text>
              <Text style={styles.menuItemText}>Book Issued</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="settings" size={20} color="#E52B50" />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.menuItem}>
              <Text>
                <Icon name="help" size={20} color="#E52B50" />
              </Text>
              <Text style={styles.menuItemText}>help</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.menuItem}>
              <Text>
                <Icon name="logout" size={20} color="#E52B50" />
              </Text>
              <Text style={styles.menuItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 75,
  },
  userInfoSectionOne: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  userInfoSectionTwo: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 65,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: '#E5e4e2',
    marginTop: 15,
    marginHorizontal: 30,
    borderRadius: 20,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 26,
  },
  backgroundStyle: {
    backgroundColor: '#E5E4E2',
    borderRadius: 27,
    padding: 10,
  },
  button: {
    backgroundColor: '#E52B50',
    width: '100%',
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 10,
  },
});
