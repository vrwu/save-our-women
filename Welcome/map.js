import React from 'react';
import MapView from 'react-native-maps';
import { StackActions } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default class map extends React.Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
          showsUserLocation ={true}
        >
          <MapView.Marker
            coordinate={{latitude: 37.73538,
                          longitude: -122.4324,}}
            title={"test: san francisco"}
            description={"Date: today"}
            pinColor = "purple"
          />
        </MapView>
        <TouchableOpacity
          style = {styles.backButton}
          onPress={
            () => navigation.dispatch(StackActions.pop(1))}
        >
          <Text style = {styles.backArrow}>
            ←
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton:{
    backgroundColor:'white',
    borderRadius: 50,
    fontSize: 100,
    fontWeight: "bold",
    right: 175,
    bottom: 800,
  }
});
