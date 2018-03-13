import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import EditProfile from './EditProfile'
import Video from './Video'
import Comment from './Comment'

import CustomButton from '../../components/CustomButton'

export default class Profile extends Component {
    // TODO : _editProfile : store the passed username and bio parameters into database,
    state = {
        edit: true,
        username: "MY NAME",
        bio: "BIO"
    }
    
    _editProfile = (username, bio) => {
        alert('username : ' + username + 'bio : ' + bio)
        if (username == '' || bio == '') {
            this.setState({ edit:false, username:'MY NAME', bio:'BIO' })
        } else {
            this.setState({ edit:false, username:username, bio:bio })
        }
    }

    render () {
        if (this.state.edit) {
            return (
                <View style={styles.container}>
                    <EditProfile
                        edit={this.state.edit}
                        username={this.state.username}
                        bio={this.state.bio}
                        done={this._editProfile}
                    />
                    <Video/>
                    <Comment/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <EditProfile
                        edit={this.state.edit}
                        username={this.state.username}
                        bio={this.state.bio}
                        done={() => this.setState({ edit:true })}
                    />
                    <Video/>
                    <Comment/>
                </View>
            )
        }
        /*
        return (
            <View style={styles.container}>
                <EditProfile edit={this.state.edit}/>
                <Game edit={this.state.edit}/>
                <Video/>
                <Comment/>
            </View>
        )
        */
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1976D2'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
