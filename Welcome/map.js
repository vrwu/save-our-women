import React from 'react';
import MapView from 'react-native-maps';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

export default class map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dates: [],
      latitude: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    var fbInfo = await axios.get('https://save-our-women-b9aef.firebaseio.com/coordinates/August%2014,%202020%204:27%20PM')
    var dataObj = Object.values(fbInfo)[0]
  }

  componentDidUpdate() {
    if (this.state.dates == null) {
    }
    else {
    }
  }

  render() {
    const {navigation} = this.props
    return (
      <View>
      <TouchableOpacity
        style = {styles.backButton}
        onPress={
          () => navigation.dispatch(StackActions.pop(1))}
      >
        <Text style = {styles.backArrow}>
          ←
        </Text>
      </TouchableOpacity>

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(158, 101, 144, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headContainer: {
    backgroundColor: 'rgba(158, 101, 144, .2)',
    alignSelf: 'center',
    borderRadius: 25,
    width: Dimensions.get('window').width,
    height: 150,
    position:'absolute'
  },
  darkContainer: {
    backgroundColor: 'rgba(158, 101, 144, 0.9)',
    alignSelf: 'center',
    borderRadius: 25,
    width: Dimensions.get('window').width,
    height: 150,
    position:'absolute',
    bottom: 20

  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.5,
    top: 120
  },
  backButton:{
    fontSize: 10000,
    fontWeight: "bold",
    right: 175,
    bottom: 800,
    alignSelf: 'center'
  },
});
