import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import EditProfile from './EditProfile'
import Video from './Video'
import Comment from './Comment'
import Game from './Game'

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
        imgUrl: "test",

        gameTitle: "League of Legends",
        role: "ADC",
        partnerRole: "SUP",

        // wins: null,
        // losses: null,
        // role: null,
        // role_champ: null,
        // rank: null,
        // tier: null,
        // role_wins: null,
        // role_losses: null,
    }
    //method that calls the initial method
    componentDidMount() {
        this._pullProfile(this.props.authKey)
        if (this.state.gameTitle == "League of Legends") {
            this._getSkill(this.props.authKey)
        } 
        
    }
    //called when user presses the "done" button that can be seen after editing. Will push all the updated data to the back-end
    _putProfile = () => {
        if (this.state.username == '') {
            alert("Display name cannot be empty!")
        } else {
            const base64 = require('base-64')
            let body = JSON.stringify({
                'display_name': this.state.username,
                'bio': this.state.bio,
                'imgUrl': this.state.imgUrl,
                'playerGameRole': [{
                    'gameTitle': this.state.gameTitle,
                    'role': this.state.role,
                    'partnerRole': this.state.partnerRole,
                }],
                
            })
            fetch("http://ec2-54-86-68-14.compute-1.amazonaws.com/api/player", {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64.encode(this.props.authKey+":")
                },
                body: body
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }
    _getProfile = (username, bio, imgUrl) => {
        this.setState({ username: username, bio: bio, imgUrl: imgUrl, edit: false})
        this._putProfile();
    }

    _getGame = (myRole, partnerRole, gameTitle) => {
        this.setState({ role: myRole, partnerRole: partnerRole, gameTitle: gameTitle, edit: false})
    }
    //called every time profile is called. Populates the profile screen with user info
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
    //Method to grab all the skill data about the given user
    _getSkill = (authKey) => {
        const base64 = require('base-64')
        fetch("http://ec2-54-86-68-14.compute-1.amazonaws.com/api/playerSkill", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(authKey+":")
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ wins: responseJson.wins, losses: responseJson.losses, role: responseJson.role, role_champ: responseJson.role_champ,
                rank: responseJson.rank, tier: responseJson.tier, role_wins: responseJson.role_wins, role_losses: responseJson.role_losses})
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
                        imgUrl={this.state.imgUrl}
                        done={this._getProfile}
                    />
                    <Game
                        edit={this.state.edit}
                        gameTitle={this.state.gameTitle}
                        role={this.state.role}
                        partnerRole={this.state.partnerRole}
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
