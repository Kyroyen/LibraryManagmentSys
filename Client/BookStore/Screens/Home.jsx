import {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, Searchbar, ActivityIndicator} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeCat from '../Components/HomeCat';
import axios, { all } from 'axios';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const API_ENDPOINT = `http://192.168.58.124:8000/api/books/`;
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchData = async links => {
    try {
      const response = await axios.get(links);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      console.log('Cannot be searched', error);
      setIsLoading(false);
      setError('Error fetching data. Please check your internet connection.');
    }
  };

  const handleSearch = async () => {
    const searchEndpoint =
      `http://192.168.58.124:8000/api/books/` + `${'?'}search=${searchQuery}`;
    setIsLoading(true);
    const bookData = await fetchData(searchEndpoint);
    navigation.navigate('SeachedBook', {books: bookData});
    console.log(data);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setData([]);
  };

  const getAllBooks = async () => {
    const allBooksData = await fetchData(
      `http://192.168.58.124:8000/api/books/`,
    );
    setData(allBooksData);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllBooks();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color="#DD5746" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
          Error in finding data... Please check your internet connection
        </Text>
      </View>
    );
  }

  return (
    <View>
      {
        <ScrollView
          style={{marginBottom: 107}}
          showsVerticalScrollIndicator={false}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            value={searchQuery}
            icon={() => <FontAwesome name="search" size={20} />}
            clearIcon={() => (
              <FontAwesome
                name="times-circle"
                size={20}
                onPress={handleClearSearch}
              />
            )}
            style={styles.Searchbar}
          />
          <View style={styles.cardStyle}>
            <Card>
              <Card.Cover source={require('../Assets/Banner.jpg')} />
            </Card>
          </View>
          <View style={{marginLeft: 13, marginTop: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
              Top Pick's 💯
            </Text>
          </View>
          <View style={{gap: 20}}>
            <View>
              <HomeCat title={'Fiction'} genre={'Fiction'} />
            </View>
            <View>
              <HomeCat
                title={'Thriller and Crime'}
                genre={'Thriller and Crime'}
              />
            </View>
            <View>
              <HomeCat title={'Science'} genre={'Science'} />
            </View>
          </View>
        </ScrollView>
      }
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Searchbar: {
    backgroundColor: '#E3F6FF',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  cardStyle: {
    padding: 15,
  },
});
