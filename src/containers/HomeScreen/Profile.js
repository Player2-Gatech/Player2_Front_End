import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import EditProfile from './EditProfile'
import Video from './Video'
import Comment from './Comment'

import CustomButton from '../../components/CustomButton'

export default class Profile extends Component {
    // TODO : _editProfile : store the passed username and bio parameters into database,

    static propTypes = {
        authKey: PropTypes.string.isRequired,
    }
    state = {
        edit: false,
        username: "MY DISPLAY NAME",
        bio: "MY BIO",
        imgUrl: "",
        playerGameRole: [{
            gameTitle: "League of Legends",
            role: "",
            partnerRole: "",
        }],

    }
    
    componentDidMount() {
        this._pullProfile(this.props.authKey)
    }
    _editProfile = (username, bio, authKey) => {
        if (username == '') {
            alert("Display name cannot be empty!")
        } else {
            const base64 = require('base-64')
            let body = JSON.stringify({
                'display_name': username,
                'bio': bio
            })
            fetch("http://ec2-54-86-68-14.compute-1.amazonaws.com/api/player", {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64.encode(authKey+":")
                },
                body: body
            })
            .then((response) => response.json())
            .then((responseJson) => {
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }
    
    _pullProfile = (authKey) => {
        const base64 = require('base-64')
        fetch("http://ec2-54-86-68-14.compute-1.amazonaws.com/api/player", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(authKey+":")
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ username: responseJson.display_name, bio: responseJson.bio })
        })
        .catch((error) => {
            console.error(error)
        });
    }
    render () {
        
        if (this.state.edit) {
            return (
                <View style={styles.container}>
                    <EditProfile
                        edit={this.state.edit}
                        username={this.state.username}
                        bio={this.state.bio}
                        authKey={this.props.authKey}
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
//AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
