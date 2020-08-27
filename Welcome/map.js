import React from 'react';
import MapView from 'react-native-maps';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

import api from '../baseURL.js'

export default class map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    let apiLocations: string = '/map';
    var info = await api.get(apiLocations)
    var dataObj = info.data.coord
    this.setState({locations: dataObj})
    for (var key in dataObj) {
    //  console.log(dataObj[key][2] + ", " + dataObj[key][3])
    }
  }

  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
          showsUserLocation ={true}
        >
          {this.state.locations.map((report, index) => {
            return (
              <MapView.Marker
                key = {index}
                onLoad={() => this.forceUpdate()}
                coordinate={{ latitude: parseFloat(report[2]),
                  longitude: parseFloat(report[3]) }}
                title = {report[0]}
                description = {report[1]}
                pinColor = 'purple'
              >
              </MapView.Marker>
            )
          })}
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
    top:10,
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
