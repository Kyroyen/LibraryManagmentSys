import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeCat = ({title, genre}) => {
  const [data, setData] = useState([]);
  const [isToken, setIsToken] = useState(null);
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setIsToken(value);
        return value;
      } else {
        console.log('Token not found');
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const fetchData = async () => {
    let token = isToken;
    if(token==null){
      token = await getToken();
    }
    try {
      const res = await axios.get(`http://192.168.58.124:8000/api/genre/${genre}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      },
      );
      setData(res.data);
    } catch (error) {
      console.log('Error in fetching', error);
    }
  };
  useEffect(() => {
    getToken();
    fetchData();
  }, [genre]);

  return (
    <View>
      <View style={{marginLeft: 15, marginVertical: 10}}>
        <Text style={styles.heading}>{title}</Text>
      </View>
      <View style={styles.mainContainer}>
        <FlatList
          data={data}
          horizontal={true}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('BookPage', {book: item})}>
              <View style={styles.SecContainer}>
                <Image
                  source={{uri: item.book_image}}
                  style={{width: 100, height: 150, borderRadius: 5}}
                />
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default HomeCat;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: '#808080',
    borderWidth: 1,
    backgroundColor: '#F0EBE3',
  },
  SecContainer: {
    padding: 5,
    margin: 10,
  },
  title: {
    marginTop: 5,
    maxWidth: 100,
    marginBottom: -10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  heading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
