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

const HomeCat = ({title, genre}) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://192.168.58.124:8000/api/genre/${genre}/`);
      setData(res.data);
    } catch (error) {
      console.log('Error in fetching', error);
    }
  };
  useEffect(() => {
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
