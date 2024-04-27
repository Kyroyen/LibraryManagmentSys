import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBook from '../Components/CustomBook'
import { useRoute } from '@react-navigation/native'

const SearchedBook = () => {
  const route = useRoute();
  const {books} = route.params;
  console.log(books);
  return (
    <View>

      <CustomBook book = {books}/>
    </View>
  )
}

export default SearchedBook

const styles = StyleSheet.create({})