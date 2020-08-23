
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, ScrollView, FlatList, Component, Root,
  SafeAreaView, List
 } from 'react-native';

import newReport from '../Welcome/newReport'

const reportItem = ({ date }) => {
  <View style = {styles.newsContainer}>
    <Text> {date} </Text>
  </View>
}

export default class newsfeed extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      reports: [],
      dates: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    let apiRecentRep: string = '/recent_reports'
    var fbInfo = await axios.get('https://save-our-women-b9aef.firebaseio.com/reports.json')
    var repObj = Object.values(fbInfo)[0]
    this.setState({dates: Object.keys(repObj)})
    this.setState({reports: Object.values(repObj)})
  }

  FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "40%",
        backgroundColor: "rgba(158, 101, 144, 0.2)",
        alignSelf: 'center',
        marginVertical: 30
      }}
    />
  );
}

  componentDidUpdate() {
    if (this.state.reports == null) {
      console.log('fail')
    }
    else {
      console.log("success")
    }
  }

  render() {
    const {navigation} = this.props;
    return(
     <View>
      <View style = {styles.header}>
        <Text style = {styles.mainText}>
          Newsfeed
        </Text>
        <TextInput
          style = {styles.searchBox}
          placeholder = "Search"
          placeholderTextColor = "#FFFFFF"
        >
        </TextInput>
        <TouchableOpacity
          onPress={
            () => navigation.dispatch(StackActions.pop(1))}
        >
          <Text style = {styles.backArrow}>
            ←
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>navigation.navigate('new report')}
        >
          <Text style = {styles.addReport}>
            +
          </Text>
        </TouchableOpacity>
        <View style = {styles.newsContainer}>
        <FlatList
        data={this.state.reports}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent = { this.FlatListItemSeparator }
        renderItem={({item}) => <Text style = {{
          alignSelf: 'center',
          marginLeft: 20,
          marginRight: 20,
          color: 'rgba(0, 0, 0, .8)'
        }}>{Object.values(item)[0]}{"\n\n"}{Object.values(item)[1]} {Object.values(item)[2]}</Text> }

        />
          </View>
      </View>
     </View>

   )
 }
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign:'center',
    top: 50,
    color: 'white'
  },

  header: {
    backgroundColor:'rgba(158, 101, 144, 1)',
    height: 150,
    width: 378,
    borderRadius: 25,
    alignSelf: 'center',
    top: 50
  },

  backArrow: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.3)',
    alignSelf:'flex-start',
    marginLeft:15,
    bottom: 3,
    position: 'absolute'
  },

  addReport: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.3)',
    alignSelf:'flex-end',
    marginRight: 15,
    bottom: 40
  },

  searchBox: {
    width: 300,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 25,
    paddingHorizontal: 13,
    fontSize: 16,
    color: '#FFFFFF',
    top: 80,
    alignSelf: 'center'
  },

  newsContainer: {
    height: 660,
    width: 378,
    alignSelf: 'center',
    backgroundColor:'white',
    borderRadius: 25,
    marginVertical: 10,
    top: 60,
    color: "black"
  },
})
