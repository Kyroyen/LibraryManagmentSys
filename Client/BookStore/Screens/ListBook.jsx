import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { useRoute } from '@react-navigation/native'
import CustomListBook from '../Components/CustomListBook'


const ListBook = () => {
  const route = useRoute();
  const {genre} = route.params;
  console.log("Listbook", genre);
  return (
    <View>
     <CustomListBook genre={genre}/>
    </View>
  )
}

export default ListBook

const styles = StyleSheet.create({})