import * as React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, FlatList
} from 'react-native';
import { StackActions } from '@react-navigation/native';

import api from '../baseURL.js'

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default class contactList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contacts: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    let apiContacts: string = '/emergency_contacts';
    var info = await api.get(apiContacts)
    var dataObj = Object.values(info.data)
    this.setState({contacts: dataObj[0]})
    console.log(this.state.contacts)
  };

  renderItem = ({ item }) => {
    return(
      <View>
      <Image style = {styles.icon}
        source={require('../src/icons/phone.png')} />
        <Text style = {{alignSelf: 'center', fontSize: 15,
        color: 'rgba(0, 00, 0, 0.6)'}}>
          {Object.values(item[0])}{'\n'}{JSON.stringify(item[1])}{'\n'}
        </Text>
      </View>
    )
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "40%",
          backgroundColor: "rgba(158, 101, 144, 0.2)",
          alignSelf: 'center',
          marginVertical: 20
        }}
      />
    );
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
            <Text style = {styles.header}>Contacts</Text>
            <View style = {{width: Dimensions.get('window').width,
             height: Dimensions.get('window').height / 1.35,
             top: 100
          }}>
            <FlatList
              data={this.state.contacts}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              ItemSeparatorComponent = { this.FlatListItemSeparator }
            />
            </View>
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
      top: 50,
      position: 'absolute'
    },

    header: {
      fontSize: 25,
      position: 'absolute',
      alignSelf: 'center',
      top: 50,
      color: 'rgba(0, 0, 0, 0.6)',
    },

    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },

    icon: {
      height: 20,
      width: 20,
      position: 'absolute',
      top: 5,
      left: 100,
      opacity: 0.5,
    }

});
