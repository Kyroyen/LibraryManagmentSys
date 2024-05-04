import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Text} from 'react-native-paper';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CustomBookList = ({genre}) => {
  const [books, setBooks] = useState([]);
  const [isToken, setIsToken] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const {book} = route.params;

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
    if(token == null) {
      token = await getToken();
    }
    try {
      const res = await axios.get(
        `http://192.168.58.124:8000/api/genre/${genre}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );
      setBooks(res.data);
    } catch (error) {
      console.log('Error in fetching', error);
    }
  };
  useEffect(() => {
    getToken();
    fetchData();
  }, []);
  return (
    <ScrollView>
      {books.map(book => (
        <View key={book.unique_id} style={styles.container}>
          <Image
            source={{uri: book.book_image}}
            style={styles.ImagePic}
            resizeMode={'cover'}
          />
          <View style={styles.ContactDetails}>
            <View style={{gap: 5, fontSize: 20, marginRight: '15%'}}>
              <View style={{width: 120}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Montserrat-Light',
                    fontWeight: '900',
                    color: 'black',
                  }}>
                  {book.name}
                </Text>
              </View>
              <Text style={{color: 'grey', maxWidth: 130}}>{book.author}</Text>
              <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{fontSize: 15, fontWeight: '100'}}>₹</Text>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'Montserrat-ExtraBold',
                      fontWeight: '900',
                    }}>
                    10
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Bold',
                    color: 'grey',
                  }}>
                  /Day
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: '#185bce',
                  width: 100,
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate('BookPage', {book: book})}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  View Book
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default CustomBookList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '2%',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderRadius: 10,
    backgroundColor: '#FAF7F0',
    elevation: 2,
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 15,
  },

  ImagePic: {
    height: 160,
    width: 100,
    borderRadius: 10,
    shadowColor: '#202020',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    alignSelf: 'center',
  },
  btn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    borderStyle: 'dashed',
  },
  ContactDetails: {
    marginTop: '5%',
    gap: 10,
  },
  increment: {
    backgroundColor: 'green',
    width: 50,
  },
  BtnValue: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});
