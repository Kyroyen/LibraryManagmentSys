import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Text, MD2Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const CustomBook = ({book}) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {book.map((book, index) => (
        <View key={index} style={styles.container}>
          <Image
            source={{uri: book.book_image}}
            style={styles.ImagePic}
            resizeMode={'cover'}
          />
          <View style={styles.ContactDetails}>
            <View style={{gap: 5, fontSize: 20, marginRight: '19%'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Montserrat-Light',
                  color: MD2Colors.black,
                  fontWeight: '900',
                }}>
                {book.name}
              </Text>
              <Text style={{color: 'grey'}}>{book.author}</Text>
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
                  backgroundColor: '#DD5746',
                  width: 100,
                  borderRadius: 5,
                }}>
                <Text
                  style={{textAlign: 'center', color: 'white'}}
                  onPress={() => navigation.navigate('BookPage', {book: book})}>
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

export default CustomBook;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '2%',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderRadius: 10,
    backgroundColor: '#FFF5E0',
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
