import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Text, MD2Colors} from 'react-native-paper';

const CustomBook = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require('../Assets/Books.jpeg')}
          style={styles.ImagePic}
          resizeMode={'cover'}
        />
        <View style={styles.ContactDetails}>
          <View style={{gap: 5, fontSize: 20, marginLeft: '10%'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Black',
                color: MD2Colors.black,
              }}>
              Name: Harry Potter
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'baseline',}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: '100'}}>Price : ₹ </Text>
                <Text
                  style={{fontSize: 17, fontFamily: 'Montserrat-ExtraBold'}}>
                 10
                  {''}
                </Text>
              </View>
              <Text style={{fontSize: 13, fontFamily: 'Poppins-Bold'}}>
                /Per day
              </Text>
            </View>
            <Text>Iussed: 24/04/2024</Text>
          </View>
        </View>
      </View>
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
    borderRadius: 20,
    backgroundColor: '#FFF5E0',
    elevation: 2,
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 15,
  },

  ImagePic: {
    height: 160,
    width: 100,
    borderRadius: 25,
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
    justifyContent: 'center',
    gap: 5,
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
