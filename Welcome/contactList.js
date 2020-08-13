import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';


export function contactList({navigation}) {
  return (

    <View style={styles.container}>
      <Text style = {styles.title}>
        Emergency Contacts List
      </Text>
      <Text style = {styles.nameVar}>
        Jane Doe
      </Text>

      <Text style = {styles.phoneText}>
        Phone Number:
      </Text>
      <Text style = {styles.sampleNum}>
        858-555-5555
      </Text>

      <Text style = {styles.emailText}>
        Email Address:
      </Text>
      <Text style = {styles.sampleEmail}>
        techtank@ucsd.edu
      </Text>

      <Text style = {styles.nameVar2}>
        John Doe
      </Text>

      <Text style = {styles.phoneText2}>
        Phone Number:
      </Text>
      <Text style = {styles.sampleNum2}>
        858-555-5555
      </Text>

      <Text style = {styles.emailText2}>
        Email Address:
      </Text>
      <Text style = {styles.sampleEmail2}>
        techtank@ucsd.edu
      </Text>
    </View>

  );
}
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(221,221,221,1)',
      alignSelf:'center',
      height: 130,
      width:420,

    },

    title: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'rgba(158, 101, 144, 1)',
      fontWeight: 'bold',
      top: 70
    },

    //*name variable generated from database*
    nameVar: {
      fontSize: 25,
      //marginLeft: 50,
      color: 'rgba(85,85,85,1)',
      fontWeight: 'bold',
      top: 105,
      alignSelf: 'center'
    },

    phoneText: {
      fontSize: 20,
      //marginLeft: 50,
      top: 110,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    sampleNum: {
      fontSize: 16,
      //marginLeft: 50,
      top: 110,
      color: 'grey',
      fontWeight: 'bold',
        alignSelf: 'center'
    },

    emailText: {
      fontSize: 20,
      //marginLeft: 50,
      top: 130,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    sampleEmail: {
      fontSize: 16,
      //marginLeft: 50,
      top: 130,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    //*name variable generated from database*
    nameVar2: {
      fontSize: 25,
      //marginLeft: 50,
      color: 'rgba(85,85,85,1)',
      fontWeight: 'bold',
      top: 170,
      alignSelf: 'center'
    },

    phoneText2: {
      fontSize: 20,
      //marginLeft: 50,
      top: 175,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    sampleNum2: {
      fontSize: 16,
      //marginLeft: 50,
      top: 175,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    emailText2: {
      fontSize: 20,
      //marginLeft: 50,
      top: 195,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },

    sampleEmail2: {
      fontSize: 16,
      //marginLeft: 50,
      top: 195,
      color: 'grey',
      fontWeight: 'bold',
      alignSelf: 'center'
    },



});
