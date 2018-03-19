import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, StatusBar} from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/profileicon.png'
import metrics from '../../config/metrics'

import Game from './Game'

export default class EditProfile extends Component {
    static propTypes = {
        edit: PropTypes.bool.isRequired,
        username: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        done: PropTypes.func.isRequired,
        authKey: PropTypes.string.isRequired
    }
    
    //TODO Hee : set BIO max length / make scroll view for multiple lines
    //TODO Hee : like view
    state = {
        editUsername: '',
        editBio: '',
        editPlayerRole: '',
        editPartnerRole: '',
        editGame: 'League of Legends',
        editURL: '',
    }
    render () {
        const {editUsername, editBio, editPlayerRole, editPartnerRole, editGame, editURL} = this.state
        if (this.props.edit) {
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.whiteText}>Profile</Text>
                    </View>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={imgProfile}/>
                    </View>
                    <View style={styles.editUsernameContainer}>
                        <TextInput
                            ref={(ref) => this.usernameInputRef = ref}
                            onSubmitEditing={() => this.bioInputRef.focus()}
                            placeholder={this.props.username}
                            onChangeText={(value) => this.setState({ editUsername: value})}
                        />
                    </View>
                    <View style={styles.bioContainer}>
                        <TextInput
                            ref={(ref) => this.bioInputRef = ref}
                            placeholder={this.props.bio}
                            onChangeText={(value) => this.setState({ editBio: value})}
                        />
                    </View>

                    <CustomButton
                        text={'DONE'}
                        textStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={() => this.props.done(editUsername, editBio,  this.props.authKey)}
                    />
                    
                    <Game/>
                </View>
            )
        } else { 
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.whiteText}>Profile</Text>
                    </View>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={imgProfile}/>
                    </View>
                    <View style={styles.usernameContainer}>
                        <Text style={styles.whiteText}>{this.props.username}</Text>
                    </View>
                    <View style={styles.bioContainer}>
                        <Text>{this.props.bio}</Text>
                    </View>

                    <CustomButton
                        text={'EDIT'}
                        textStyle={styles.buttonText}
                        buttonStyle={styles.button}
                        onPress={() => this.props.done()}
                    />
                    
                    <Game/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1976D2",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH
  },
  titleContainer: {
    marginTop: 20
  },
  imgContainer: {
    marginTop: 28
  },
  img: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    //width: metrics.Device_WIDTH / 3,
    //height: metrics.Device_WIDTH / 3,
    width: 112,
    height: 112,
    borderRadius: 15
  },
  usernameContainer: {
    marginTop: 10
  },
  whiteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  bioContainer: {
    width: metrics.DEVICE_WIDTH - 100,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#99E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  editUsernameContainer: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#99E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold'
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
