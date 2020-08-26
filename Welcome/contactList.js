import * as React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import { StackActions } from '@react-navigation/native';

import api from '../baseURL.js'

export default class newsfeed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style = {styles.banner}>
            <TouchableOpacity
              onPress={
                () => navigation.dispatch(StackActions.pop(1))}
            >
              <Text style = {styles.backArrow}>
                ←
              </Text>
            </TouchableOpacity>
          </View>
        <View styles = {styles.innerBanner}>
        </View>
      </View>

    );
  }
}
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(158, 101, 144, 1)',
      alignSelf:'center',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      borderRadius: 25
    },

    banner: {
      backgroundColor: 'white',
      width: Dimensions.get('window').width / 1,
      height: Dimensions.get('window').height / 1.05,
      alignSelf: 'center',
      top: 50,
      borderRadius: 25
    },

    innerBanner: {
      backgroundColor: 'blue',
      width: Dimensions.get('window').width,
      height: 1300 ,
      borderRadius: 25,
      position: 'absolute',
      bottom:50
    },

    backArrow: {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.3)',
      left: 5,
      alignSelf:'flex-start',
      marginLeft:15,
      top: 55,
      position: 'absolute'
    },

});
