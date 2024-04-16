import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  return (
    <View style={{marginLeft: 4}}>
      <SliderBox
        images={images}
        autoplay
        circleLoop
        borderRadius={15}
        dotColor="#E52B50"
        inactiveDotColor="white"
        ImageComponentStyle={{
          width: '98%',
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
