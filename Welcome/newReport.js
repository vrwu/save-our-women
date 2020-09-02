import React from 'react';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView,
  Keyboard, Alert, TextInput, Image, Component, Button
} from 'react-native';
import api from '../baseURL'


export default class newReport extends React.Component {

  constructor(){
    super()
    this.state = {
      image: null,
      location: '',
      report: '',
      latitude: '',
      longitude: ''
    }
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeLocation = this.handleChangeLocation.bind(this)
    this.handleChangeLatitude = this.handleChangeLatitude.bind(this)
    this.handleChangeLongitude = this.handleChangeLongitude.bind(this)
    this._pickImage = this._pickImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

 handleChangeDescription = (textValue) => {
    this.setState({
      report: textValue
    })
  }

  handleChangeLocation = (val) => {
     this.setState({
       location: val
     })
     console.log(this.state.location);
   }

    handleChangeLatitude = (val) => {
       this.setState({
         latitude: val
       })
            console.log(this.state.latitude);
     }

     handleChangeLongitude = (val) => {
        this.setState({
          longitude: val
        })
             console.log(this.state.longitude);
      }



 handleSubmit () {
   //console.log(this.state)
    let baseURL: string = '/make_report';
    console.log(this.state.report)
    console.log(this.state.location)
    console.log(this.state.latitude)
    console.log(this.state.longitude)
    let payload : object = {
      "location": this.state.location,
      "report": this.state.report,
      "fileToUpload": this.state.image,
      "latitude": this.state.latitude,
      "longitude": this.state.longitude
    };

    api.post(baseURL, payload)
      .then(function (response) {
        console.log(this.state.report);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getPermissionAsync();

  }


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Please turn on camera permissions to upload a photo');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {

        this.setState({
          image: String(result.base64)
        })
      }
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
          <View style = {{flex: 1, top: 20}}>
          <GooglePlacesAutocomplete
            placeholder='Search Location'
            autoFocus = {false}
            returnKeyType = 'search'
            fetchDetails = {true}
            currentLocation = {true}
            disableScroll = {false}
            placeholderTextColor = 'rgba(158, 101, 144, 0.8)'
            styles = {{
              textInputContainer: {
                backgroundColor:'rgba(158, 101, 144, 0.8)',
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderRadius: -25
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: 'rgba(158, 101, 144, 0.8)',
                fontSize: 16,
              },
              listView: {
                color: 'rgba(158, 101, 144, 0.8)'
              }
            }}
            onPress={(data, details = null) => {
              this.handleChangeLatitude(details.geometry.location.lat);
              this.handleChangeLongitude(details.geometry.location.lng);
              this.handleChangeLocation(data.terms[0].value);
            }}
            query={{
              key: 'AIzaSyAeQmNz_y5iceHHdjfQPFC-JJP98NjBO6U',
              language: 'en',
            }}
          />
          </View>

          <TextInput style = {styles.moreInfo}
            placeholder="   Description"
            multiline={true}
            onChangeText={this.handleChangeDescription}

          >
          </TextInput>

          <TouchableOpacity
            style = {styles.addButton}
            title="Add Image"
            onPress={this._pickImage}>
              <Text style = {styles.buttonText}> Add Image
              </Text>
          </TouchableOpacity>
              {image && <Image source={require('../src/icons/polaroid.png')}
              style = {styles.photoUpload} /
              >}

          <TouchableOpacity
            style = {styles.submitButton}
            onPress={() => this.handleSubmit()}
          >
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
    height: 200,
    width: 275,
    alignSelf:'center',
    borderRadius: 25,
    top: 80,
  },



  submitButton: {
    backgroundColor: 'rgba(158, 101, 144, 0.7)',
    height: 50,
    width: 125,
    alignSelf: 'center',
    left: 80,
    marginVertical: 15,
    borderRadius: 25,
    bottom: 160
  },

  addButton: {
    backgroundColor: 'rgba(158, 101, 144, 0.5)',
    height: 50,
    width: 125,
    alignSelf: 'center',
    marginVertical: 95,
    borderRadius: 25,
    right: 80,
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15
  },

  photoUpload: {
    height: 50,
    width: 50,
    position: 'absolute',
    left: 75,
    top: 520

  }
})
