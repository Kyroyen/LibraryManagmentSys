import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomBook from '../Components/CustomBook';

const BooksIssued = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [booksOwned, setBooksOwned] = useState([]);

  useEffect(() => {
    const fetchBooksOwned = async () => {
      try {
        const response = await fetch('http://192.168.58.124:8000/api/owned/');
        const data = await response.json();
        setBooksOwned(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books owned:', error);
        setIsLoading(false);
      }
    };
    console.log(booksOwned);
    fetchBooksOwned();
  }, []);

  const RenderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <CustomBook book={item} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={booksOwned}
          renderItem={item => <RenderItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
      <View style={{height: 100}}></View>
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
