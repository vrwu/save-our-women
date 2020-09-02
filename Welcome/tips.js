import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, Component, Button
} from 'react-native';

export default class tips extends React.Component {
  render() {
    return (
      <View style = {styles.bg}>
        <Text style = {styles.header}> Tips </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor:'white',
    flex:1
  },

  header: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    top: 75
  }
})
