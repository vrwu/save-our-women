import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Image, Dimensions } from 'react-native';
//import Video from 'react-native-video';
//import { Video } from 'expo-av';


export function videos() {
  return (
    <View style = {styles.container}>
      <Text style={styles.title}>Videos</Text>
      <Text style = {styles.subtitle}> Situational Fake Phone Calls: </Text>
      <Image style={styles.call1}
        source={require('../Welcome/screenshots/tiktok1.png')} />
      <Image style={styles.call2}
        source={require('../Welcome/screenshots/tiktok2.png')} />
      <Image style={styles.call3}
        source={require('../Welcome/screenshots/tiktok3.png')} />
      <Image style={styles.call4}
        source={require('../Welcome/screenshots/tiktok4.png')} />
      <Text style = {styles.subtitle2}> Safety Tips: </Text>
      <Image style={styles.safety1}
        source={require('../Welcome/screenshots/tiktok5.png')} />
      <Image style={styles.safety4}
        source={require('../Welcome/screenshots/tiktok6.png')} />
      <Image style={styles.safety3}
        source={require('../Welcome/screenshots/tiktok7.png')} />
      <Image style={styles.safety2}
        source={require('../Welcome/screenshots/tiktok8.png')} />
    </View>
);
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'rgba(158, 101, 144, 1)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 5,
    position: 'absolute',
  },

  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    top: 100,
    color: 'white',

  },

  subtitle: {
    fontSize: 20,
    left: 30,
    color: 'rgba(0, 0, 0, 0.7)',
    top: 210
  },

  subtitle2: {
    fontSize: 20,
    left: 30,
    color: 'rgba(0, 0, 0, 0.7)',
    top: 490
  },

  call1: {
    width: 110,
    height: 220,
    left: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: 250
  },

  call2: {
    width: 110,
    height: 220,
    left: 130,
    position: 'absolute',
    alignSelf: 'center',
    top: 250
  },

  call3: {
    width: 110,
    height: 220,
    left: 250,
    position: 'absolute',
    alignSelf: 'center',
    top: 250
  },

  call4: {
    width: 110,
    height: 220,
    left: 370,
    position: 'absolute',
    alignSelf: 'center',
    top: 250
  },

  safety1: {
    width: 110,
    height: 220,
    left: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: 550
  },

  safety2: {
    width: 110,
    height: 220,
    left: 130,
    position: 'absolute',
    alignSelf: 'center',
    top: 550
  },

  safety3: {
    width: 110,
    height: 220,
    left: 250,
    position: 'absolute',
    alignSelf: 'center',
    top: 550
  },

  safety4: {
    width: 110,
    height: 220,
    left: 370,
    position: 'absolute',
    alignSelf: 'center',
    top: 550
  }



});
