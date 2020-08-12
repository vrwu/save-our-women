import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StackActions } from '@react-navigation/native';
import BottomSheet from 'reanimated-bottom-sheet'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, ScrollView, FlatList, Component, Root
 } from 'react-native';

 import newReport from '../Welcome/newReport'

export default class newsfeed extends React.Component {
  constructor(props){
    super(props);
    this.array = [],
    this.state = {
      arrayHolder: [],
      textInput_Holder: ''
    }
  }

  componentDidMount() {
    this.setState({ arrayHolder: [...this.array] })
  }

  joinData = () => {
    this.array.push({title : this.state.textInput_Holder});
    this.setState({ arrayHolder: [...this.array] })
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
      </View>

        <View>
        <TextInput
          style = {styles.testInput}
          placeholder="Enter Test Report"
          onChangeText={data => this.setState({ textInput_Holder: data })}
        />

      <TouchableOpacity
        style = {styles.testButton}
        onPress={this.joinData}
        activeOpacity={0.7}
      >
      <Text style={styles.buttonText}> Publish </Text>
      </TouchableOpacity>
          <FlatList
          data = {this.state.arrayHolder}
          keyExtractor = {(index) => index.toString()}
          renderItem={({ item }) =>
            <Text
              style={styles.newsContainer}
            >
              {item.title}
            </Text>}
          />
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
    height: 150,
    width: 378,
    alignSelf: 'center',
    backgroundColor:'white',
    borderRadius: 25,
    marginVertical: 10,
    top: 80
  },

  testButton: {
    alignSelf:'center',
  },

  testInput: {
    alignSelf:'center',
  }

})
