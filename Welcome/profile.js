import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';


export function profile({navigation}) {
  return (
    <View>
      <Image style={styles.container}
        source={require('../src/profileIcon.png')} />

      <Text style = {styles.nameVar}>
        Random Name
      </Text>

      <Text style = {styles.phoneText}>
        Phone Number:
      </Text>

      <Text style = {styles.emailText}>
        Email Address:
      </Text>


      <TouchableOpacity
        style = {styles.viewContactsButton}
        onPress={() => navigation.navigate('contacts')}
      >
        <Text style = {styles.viewContactsText}>
          View Contacts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.addContactButton}
        onPress={() => navigation.navigate('contacts')}
      >
        <Text style = {styles.addcontactText}>
          Add Emergency Contacts
        </Text>
      </TouchableOpacity>
    </View>
  )
}
  const styles = StyleSheet.create({
    container: {

      alignSelf:'center',
      backgroundColor:'rgba(158, 101, 144, 1)',
      height: 400,
      width:420,

    },

    //*name variable generated from database*
    nameVar: {
      fontSize: 25,
      marginLeft: 50,
      position: 'absolute',
      color: 'white',
      fontWeight: 'bold',
      top: 355
    },

    phoneText: {
      fontSize: 20,
      marginLeft: 50,
      top: 30,
      color: 'grey',
      fontWeight: 'bold'
    },

    emailText: {
      fontSize: 20,
      marginLeft: 50,
      top: 65,
      color: 'grey',
      fontWeight: 'bold'
    },

    viewContactsText: {
        position: 'relative',
        color: '#FFFFFF',
        flex:1,

        fontSize: 16,
        textAlign:'center',
        top: 13
      },

    viewContactsButton: {
      width: 300,
      height: 50,
      backgroundColor: 'rgba(158, 101, 144, 1)',
      borderRadius:25,
      top: 200,
      //marginBottom: 10,
      //later on figure out how to position button from the bottom so that
      //it's not pushed down by the contacts shown from backend
      alignSelf:'center'
    },

    addcontactText: {
        position: 'relative',
        color: '#FFFFFF',
        flex:1,

        fontSize: 16,
        textAlign:'center',
        top: 13
      },

    addContactButton: {
      width: 300,
      height: 50,
      backgroundColor: 'rgba(158, 101, 144, 1)',
      borderRadius:25,
      top: 210,
      //marginBottom: 10,
      //later on figure out how to position button from the bottom so that
      //it's not pushed down by the contacts shown from backend
      alignSelf:'center'
    },




});
