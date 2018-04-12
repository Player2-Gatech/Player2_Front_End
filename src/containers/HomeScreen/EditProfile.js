import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, StatusBar} from 'react-native'
import { NavigationActions } from 'react-navigation'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/profileicon.png'
import metrics from '../../config/metrics'
import PhotoUpload from 'react-native-photo-upload'


export default class EditProfile extends Component {
    state = {
        editUsername: "",
        editBio: "",
        editPhoto: "",
    }
    
    handleSubmit = (_editProfile) => {
        _editProfile(this.state.editUsername, this.state.editBio, this.state.editPhoto)
        this.props.navigation.dispatch(NavigationActions.back())
    }
    
    render () {
        const { _editProfile, username, bio, photo} = this.props.navigation.state.params
        return (
            <ScrollView>
            <View style={styles.container}>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) { 
                            this.setState({editPhoto: avatar}) 
                        }
                    }}
                >
                <Image
                  resizeMode='contain'
                  style={styles.img}
                  source={photo ?  {uri: `data:image/png;base64,${photo}`} : imgProfile}
                />
                </PhotoUpload>
                <View style={styles.usernameContainer}>
                  <Text style={styles.usernameTitle}>Display Name</Text>
                  <TextInput
                      ref={(ref) => this.usernameInputRef = ref}
                      onSubmitEditing={() => this.bioInputRef.focus()}
                      placeholder={username}
                      onChangeText={(value) => this.setState({ editUsername: value})}
                      style={styles.usernameInput}
                  />
                </View>
                <View style={styles.bioContainer}>
                  <Text style={styles.bioTitle}>Bio</Text>
                  <TextInput
                      ref={(ref) => this.bioInputRef = ref}
                      placeholder={ bio }
                      multiline={true}
                      maxLength={180}
                      onChangeText={(value) => this.setState({ editBio: value})}
                      style={styles.bioInput}
                  />
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        text={'UPDATE'}
                        textStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={() => this.handleSubmit(_editProfile)}
                    />
                </View>

            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
  },
  container: {
    backgroundColor: "#00ff0000",
    flex: 1,
    marginTop: 10,
    width: metrics.DEVICE_WIDTH
  },
  imgContainer: {
    marginTop: 16,
  },
  img: {
    width: 112,
    height: 112,
    borderRadius: 15
  },
  usernameContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 10
  },
  usernameTitle: {
    flex: 2,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#1976D2'
  },
  usernameInput: {
    flex: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#99E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  bioContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16
  },
  bioTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#1976D2'
  },
  bioInput: {
    flex: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#99E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonContainer: {
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: 16,
    marginHorizontal: 100,
    backgroundColor: '#1976D2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
