import {StyleSheet, View, Button, TouchableOpacity, Image} from 'react-native';
import {Text} from 'react-native-paper';

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.MainContainer}>
      <Image
        style={styles.image}
        source={require('../Assets/OnboardingImages/bookshelf.png')}
      />
      <View style={styles.FirstContainer}>
        <Text variant="displayMedium" style={styles.Headtext}>
          Welcome to BookShelf !
        </Text>
      </View>
      <View style={styles.SecondContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.SecondText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.Secondtext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  image: {
    height: 180,
    marginTop: -55,
  },
  MainContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Headtext: {
    color: '#185bce',
    fontWeight: '900',
    fontSize: 24,
    fontFamily: 'Cochin',
  },
  SecondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  SecondText: {
    padding: 15,
    paddingHorizontal: 100,
    backgroundColor: '#185bce',
    borderRadius: 15,
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  Secondtext: {
    padding: 15,
    paddingHorizontal: 90,
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: '#96B6C5',
    borderWidth: 2,
    color: '#185bce',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 15,
  },
});
