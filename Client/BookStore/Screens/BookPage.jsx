import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Card} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookPage = ({}) => {
  const [buttonData, setButtonData] = useState('');
  const [selected, setSelected] = useState('');
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [daysDifference, setDaysDifference] = useState(0);
  const [isToken, setIsToken] = useState(null);
  const screenHeight = Dimensions.get('window').height;

  const calculateDaysDifference = selectedDate => {
    const currentDate = new Date();
    const returnDate = new Date(selectedDate);
    currentDate.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);
    const differenceInTime = returnDate.getTime() - currentDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setDaysDifference(Math.ceil(differenceInDays));
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setIsToken(value);
        return value;
      } else {
        console.log('Token not found');
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    getToken();
    if (book.available) {
      setButtonData('Buy now');
    } else {
      setButtonData('Not available');
    }
  }, [book]);

  const route = useRoute();
  const {book} = route.params;

  const handleBorrowReturn = async () => {
    let token = isToken;
    if(token == null){
      token = await getToken();
    }
    try {
      console.log('Book unique ID:', book.unique_id);
      console.log('Days difference:', daysDifference);

      const requestData = {
        days_to_be_rented: daysDifference,
      };

      const response = await fetch(
        `http://192.168.58.124:8000/api/book/${book.unique_id}/borrow-return/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.cardStyles}>
        <Card style={{width: 180}}>
          <Card.Cover source={{uri: book.book_image}} style={{height: 270}} />
        </Card>
      </View>
      <View style={{padding: 20, gap: 10}}>
        <Text style={styles.Title}>{book.name}</Text>
        <Text style={styles.author}>By {book.author}</Text>

        <Text style={styles.price}>₹30/week</Text>
        <View>
          <Text style={styles.bookDetails}>Book details</Text>
        </View>
        <View style={styles.returnSelected}>
          <View style={styles.return}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Return :</Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setCalenderOpen(true);
                }}>
                <Text style={styles.selectBtn}> Select Date</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Selected Date:{' '}
              {selected ? (
                selected
              ) : (
                <Text style={{color: 'grey'}}>Date not yet selected</Text>
              )}
            </Text>
          </View>
          <Text style={styles.Available}>
            Status: {book.avaliable ?<Text style={{color: 'grey'}}>Yes</Text> : <Text style={{color: 'grey'}}>No</Text>}
          </Text>
        </View>
        <Text style={styles.bookDetails}>Description</Text>
        <View style={styles.BookDesc}>
          <Text styles={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
            inventore voluptas assumenda maiores ipsam nisi veniam ipsum
            necessitatibus! Sit earum obcaecati ducimus nisi laudantium in
            reiciendis itaque nostrum delectus soluta.
          </Text>
        </View>
      </View>
      <Button
        icon="cart"
        mode="contained"
        style={{marginHorizontal: 20, marginBottom: 15}}
        buttonColor="#104196"
        onPress={() => {
          if (book?.avaliable == true) {
            handleBorrowReturn();
          } else {
            console.log('hello hi');
          }
        }}>
        {book.avaliable ? 'Buy now' : 'Book is not available'}
        {console.log(book.avaliable)}
      </Button>
      <Modal visible={calenderOpen} animationType="fade" transparent={true}>
        <BlurView
          overlayColor="rgba(0,0,0,0.2)"
          style={styles.BlurViewStyles}
          blurAmount={5}
        />
      </Modal>
      <Modal visible={calenderOpen} transparent={true} animationType="fade">
        <View
          style={{
            height: screenHeight * 0.5,
            width: '80%',
            position: 'absolute',
            alignSelf: 'center',
            top: screenHeight * 0.25,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            <Text style={styles.selectDateStyles}>Select Date</Text>
            <TouchableOpacity
              style={{width: '12%', paddingBottom: 10}}
              onPress={() => setCalenderOpen(false)}>
              <Entypo name="cross" size={30} />
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
              setCalenderOpen(false);
              calculateDaysDifference(day.dateString);
              console.log(daysDifference);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
              },
            }}
          />
        </View>
      </Modal>
      <View style={{height: 100}}></View>
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
    color: 'grey',
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
    flexDirection: 'row',
  },
  desc: {
    fontWeight: '700',
    fontSize: 17,
  },
  selectBtn: {
    fontWeight: 'bold',
    color: 'grey',
  },
  price: {
    color: 'white',
    fontSize: 15,
    backgroundColor: '#185bce',
    maxWidth: 110,
    borderRadius: 10,
    padding: 15,
    textAlign: 'center',
  },
  returnSelected: {
    backgroundColor: '#e3ebf9',
    padding: 10,
    gap: 8,
    borderRadius: 10,
  },
  bookDetails: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f66e0',
    marginTop: 15,
  },
  BookDesc: {
    backgroundColor: '#e3ebf9',
    padding: 8,
    borderRadius: 10,
  },
  BlurViewStyles: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0},
  selectDateStyles: {
    textAlign: 'center',
    width: '85%',
    paddingLeft: 53,
    paddingTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  cardStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
  calendarStyles: {},
});
