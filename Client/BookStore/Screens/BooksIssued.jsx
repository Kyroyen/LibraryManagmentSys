import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomBook from '../Components/CustomBook';
import axios from 'axios';

const BooksIssued = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksOwned, setBooksOwned] = useState([]);

  useEffect(() => {
    const fetchBooksOwned = async () => {
      try {
        const response = await axios.get(
          'http://192.168.58.124:8000/api/owned/',
        );
        setBooksOwned(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    console.log(booksOwned);
    fetchBooksOwned();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : booksOwned.length === 0 ? (
        <Text>No books have been issued.</Text>
      ) : (
        <FlatList
          data={booksOwned}
          renderItem={({item}) => <CustomBook book={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default BooksIssued;
