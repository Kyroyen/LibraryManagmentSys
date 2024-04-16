import {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Card, Searchbar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeCat from '../Components/HomeCat';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <ScrollView
      style={{marginBottom: 107}}
      showsVerticalScrollIndicator={false}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon={() => <FontAwesome name="search" size={20} />}
        style={styles.Searchbar}
      />
      <View style={styles.cardStyle}>
        <Card>
          <Card.Cover source={require('../Assets/Home.jpg')} />
        </Card>
      </View>
      <View style = {{gap:20}}>
        <View >
          <HomeCat title={'Kids and Young Adult'} />
        </View>
        <View>
          <HomeCat title={'Fiction & non fiction'} />
        </View>
        <View>
          <HomeCat title={'Auto Bio-Graphy'} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Searchbar: {
    backgroundColor: '#F5EEE6',
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
