import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, StatusBar} from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/profileicon.png'
import metrics from '../../config/metrics'
import PhotoUpload from 'react-native-photo-upload'


export default class EditProfile extends Component {
    static propTypes = {
        editProf: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        bio     : PropTypes.string.isRequired,
        photo     : PropTypes.string.isRequired,
    }

    state = {
        editUsername: '',
        editBio: '',
        editPhoto: ''
    }

    //TODO Hee : like view

    render () {
        const { editProf, username, bio, photo} = this.props
        return (
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
                        onPress={() => editProf(this.state.editUsername, this.state.editBio, this.state.editPhoto)}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    //alignItems: 'center',
    width: metrics.DEVICE_WIDTH
  },
  imgContainer: {
    marginTop: 16,
  },
  img: {
    //width: metrics.Device_WIDTH / 3,
    //height: metrics.Device_WIDTH / 3,
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
