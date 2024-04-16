import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import data from '../Data/DummyData';
import { useNavigation } from '@react-navigation/native';

const HomeCat = ({title}) => {
  const navigation = useNavigation();
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
            <TouchableOpacity   onPress={() => navigation.navigate('BookPage')}>
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
    backgroundColor: '#F5EEE6',
  },
  SecContainer: {
    padding: 5,
    margin: 10,
  },
  title: {
    marginTop: 5,
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
