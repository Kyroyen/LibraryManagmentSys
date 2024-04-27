import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';

const BookPage = ({}) => {
  const calculateReturnDate = () => {
    const currentDate = new Date();
    const threeDaysLater = new Date(
      currentDate.setDate(currentDate.getDate() + 3),
    );
    const formattedDate = threeDaysLater.toLocaleDateString('en-US');
    setReturnDate(formattedDate);
  };
  const [returnDate, setReturnDate] = useState('');
  const [buttonData, setButtonData] = useState('');
  useEffect(() => {
    calculateReturnDate();
  }, []);

  useEffect(() => {
    if (book.available) {
      setButtonData('Buy now');
    } else {
      setButtonData('Not available');
    }
  }, [book]);

  const route = useRoute();
  const {book} = route.params;
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
          <Card.Cover source={{uri: book.book_image}} style={{height: 270}} />
        </Card>
      </View>
      <View style={{padding: 20, gap: 10}}>
        <Text style={styles.Title}>{book.name}</Text>
        <Text style={styles.author}>Author: {book.author}</Text>
        <Text style={styles.Available}>
          Available: {book.avaliable ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.return}>
          Return : <Calendar />
        </Text>
        <Text styles={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          inventore voluptas assumenda maiores ipsam nisi veniam ipsum
          necessitatibus! Sit earum obcaecati ducimus nisi laudantium in
          reiciendis itaque nostrum delectus soluta.
        </Text>
      </View>

      <Button
        icon="cart"
        mode="contained"
        style={{marginHorizontal: 20, marginBottom: 15}}
        buttonColor="#CE5959">
        {book.avaliable ? 'Buy now' : 'Book is not available'}
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
