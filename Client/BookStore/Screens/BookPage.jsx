import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Card} from 'react-native-paper';

const BookPage = () => {
  return (
    <ScrollView style={{marginBottom: 100}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#FFE5AD',
          padding: 20,
          borderBottomEndRadius: 40,
          borderBottomStartRadius: 40,
        }}>
        <Card style={{width: 180}}>
          <Card.Cover
            source={require('../Assets/Books.jpeg')}
            style={{height: 270}}
          />
        </Card>
      </View>
      <View style={{padding: 20, gap: 10}}>
        <Text style={styles.Title}>Harry Potter and the Philosopher Stone</Text>
        <Text style={styles.author}>Author: JK Rowling</Text>
        <Text style={styles.Available}>Available: Yes</Text>
        <Text style={styles.return}>Return : 20/12/2024</Text>
        <Text styles={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          inventore voluptas assumenda maiores ipsam nisi veniam ipsum
          necessitatibus! Sit earum obcaecati ducimus nisi laudantium in
          reiciendis itaque nostrum delectus soluta.
        </Text>
      </View>

      <Button icon="cart" mode="contained" style = {{marginHorizontal: 20, marginBottom: 15}} buttonColor='#CE5959'>
        Add to Cart
      </Button>
    </ScrollView>
  );
};

export default BookPage;

const styles = StyleSheet.create({
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  author: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  Available: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  return: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    color: '#D80032',
  },
  desc: {
    fontWeight: '700',
    fontSize: 17,
  },
});
