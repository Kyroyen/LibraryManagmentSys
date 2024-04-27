import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import items from '../Data/Caterory';
import {useNavigation} from '@react-navigation/native';

const Browse = () => {
  const navigation = useNavigation();
  const navigateToListBook = genre => {
    navigation.navigate('ListBook',{genre});
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {items.map(obj => {
          return (
            <View style={styles.outerBox} key={obj.name}>
              <TouchableOpacity
                key={obj.id}
                onPress={() => navigateToListBook(obj.name)}>
                <View style={styles.mainItem}>
                  <Image source={obj.imagesrc} style={styles.image} />
                  <Text style={styles.text}>{obj.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Browse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 65,
  },
  scrollView: {
    marginHorizontal: 20,
    marginBottom: 45,
  },
  outerBox: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  mainItem: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  text: {
    paddingLeft: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    textAlignVertical: 'center',
  },
});