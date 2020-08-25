
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, ScrollView, FlatList, Component, Root,
  SafeAreaView, List
 } from 'react-native';

import newReport from '../Welcome/newReport'
import api from '../baseURL.js'

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
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    let apiRecentRep: string = '/recent_reports';
    var info = await api.get(apiRecentRep)
    var dataObj = Object.values(info.data.reports)
    this.setState({reports: dataObj})
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

  renderItem = ({ item }) => {
    var img = Object.values(item)[2]
    var imgURL = img.toString()
    if (imgURL.length != 0) {
      return (
        <View>
          <Text style = {styles.date}>
            {Object.values(item[0])}
          </Text>
          <Text style = {styles.location}>
          {Object.values(item[1])}
          </Text>
          <Text style = {styles.details}>
            {Object.values(item[3])}
          </Text>
          <Image source = {{uri: imgURL}}
            style = {styles.picture}
          />
        </View>
      )
    }
    else {
      return (
        <View>
          <Text style = {styles.date}>
            {Object.values(item[0])}
          </Text>
          <Text style = {styles.location}>
          {Object.values(item[1])}
          </Text>
          <Text style = {styles.details}>
            {Object.values(item[3])}
          </Text>
        </View>
      )
    }
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
        <TouchableOpacity
          style = {styles.backArrow}
          onPress={
            () => navigation.dispatch(StackActions.pop(1))}
        >
          <Text style = {styles.backArrow}>
            ←
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.addReport}

          onPress={() =>navigation.navigate('new report')}
        >
          <Text style = {styles.addReport}>
            +
          </Text>
        </TouchableOpacity>
        <View style = {styles.newsContainer}>
        <FlatList
        data={this.state.reports}
        extraData={this.state}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent = { this.FlatListItemSeparator }
        renderItem={this.renderItem}
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
    top: 60,
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
    marginLeft:5,
    bottom: 46,
    position: 'absolute'
  },

  addReport: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.3)',
    alignSelf:'flex-end',
    right: 5,
    bottom: 1
  },

  newsContainer: {
    height: 660,
    width: 378,
    alignSelf: 'center',
    backgroundColor:'white',
    borderRadius: 25,
    marginVertical: 10,
    top: 100,
    color: "black"
  },

  date: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
    color: 'rgba(0, 0, 0, 0.6)',
  },

  location: {
    fontSize: 14,
    marginLeft: 0,
    marginRight: 30,
    marginLeft: 30,
    bottom: 5,
    alignSelf: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
  },

  details: {
    fontSize: 14,
    marginVertical: 5,
    alignSelf: 'flex-start',
    left: 50,
    color: 'rgba(0, 0, 0, 0.6)',
  },

  picture: {
    width: 350,
    height: 400,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 20,
    marginVertical: 40,
  }
})
