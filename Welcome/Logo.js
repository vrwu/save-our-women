import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image
} from 'react-native';

// Login component
export default class Logo extends Component<{}> {
  render() {
    return(
      <View>
      <Image style={style.container}
          source={require('../src/sow.png')} />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container : {
    width: 200,
    height: 200,
    }
})
