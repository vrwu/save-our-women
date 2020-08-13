import React from 'react';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, Component, Button
} from 'react-native';

export default class newReport extends React.Component {
  state = {
    image: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please turn on camera permissions');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  render() {
    const {navigation} = this.props
    let { image } = this.state;
    return(
      <View style = {styles.background}>

        <Text style = {styles.mainText}>
          Make a Report
        </Text>

        <Text style = {styles.smallText}>
          Publish an online report about a potential threat or incident. Provide
          a description of the perpetuator or upload an image or video of the
          incident.
          If an emergency situation has occurred, contact authorities immediately
          for medical help.
        </Text>
        <View style = {styles.container}>

          <Text style = {styles.secondHeader}>
            Incident Report
          </Text>

          <TextInput style = {styles.moreInfo}
            placeholder="   Description"
            multiline={true}
          >
          </TextInput>

          <TouchableOpacity
            style = {styles.addButton}
            title="Add Image"
            onPress={this._pickImage}>
              <Text style = {styles.buttonText}> Add Image
              </Text>
          </TouchableOpacity>
              {image && <Image source={{ uri: image }}
              style={{ width: 200, height: 200 }} /
              >}

          <TouchableOpacity style = {styles.submitButton}>
            <Text style = {styles.buttonText}> Submit
            </Text>
          </TouchableOpacity>
        </View>

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
    )
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor:'rgba(158, 101, 144, 1)',
    flex:1
  },

  backButton: {
    bottom: 625,
    left: 25
  },

  backArrow: {
    fontSize: 25,
    color: 'rgba(0, 0, 0, 0.3)',
    position: 'relative'
  },

  mainText: {
    fontSize: 30,
    fontWeight: "bold",
    color: 'white',
    top: 80,
    alignSelf:'center',
    position: 'absolute'
  },

  smallText: {
    fontSize: 15,
    top: 150,
    position: 'absolute',
    alignSelf: 'center',
    color:'rgba(255, 255, 255, 0.7)',
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent:'center'

  },

  container: {
    backgroundColor: 'white',
    width: 378,
    height: 700,
    alignSelf:'center',
    top:300,
    borderRadius: 25
  },

  secondHeader: {
    color:'rgba(158, 101, 144, 1)',
    fontSize: 25,
    fontWeight: "bold",
    left: 25,
    top: 10,
  },


  moreInfo: {
    backgroundColor:'rgba(158, 101, 144, 0.2)',
    height: 400,
    width: 275,
    alignSelf:'center',
    borderRadius: 25,
    top: 25
  },

  submitButton: {
    backgroundColor: 'rgba(158, 101, 144, 0.7)',
    height: 50,
    width: 125,
    alignSelf: 'center',
    left: 80,
    marginVertical: 35,
    borderRadius: 25,
    bottom: 120
  },

  addButton: {
    backgroundColor: 'rgba(158, 101, 144, 0.5)',
    height: 50,
    width: 125,
    alignSelf: 'center',
    marginVertical: 35,
    borderRadius: 25,
    right: 80,
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15
  }
})
