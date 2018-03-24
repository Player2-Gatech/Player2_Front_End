import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import TopNavigationBar from './TopNavigationBar'

import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'
import SelectGame from './SelectGame'
import AddGame from './AddGame'
import Game from './Game'
import Video from './Video'
import Comment from './Comment'

import CustomButton from '../../components/CustomButton'

export default class Profile extends Component {
    state = {
        editMode: true,
        editGame: false,
        addGame: false,
        username: "",
        bio: "",
        gameUsername: "",
        myPosition: "",
        duoPosition: "",
        playerGames: "",
        allGameInfo: "",
    }

    componentDidMount() {
      this._pullProfile()
      this._pullGameData()
    }

    _editProfile = (username, bio) => {
        this.setState({editMode:true})
        if (username != '' ) {
            this.setState({username:username })
        }

        if (bio != '' ) {
            this.setState({bio:bio })
        }
        let body = JSON.stringify({
           'displayName': username ? username : this.state.username,
           'bio': bio ? bio : this.state.bio,
        })

         const base64 = require('base-64')
         fetch(baseUrl + "/api/player", {
             method: 'PUT',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Basic ' + base64.encode(authKey+":")
             },
            body: body
         })
         .catch((error) => {
             console.error(error)
         });
    }

    _toggleEditMode = (editMode) => {
        this.setState({ editMode: editMode? false: true })
    }

    _toggleEditGame = (editGame) => {
        this.setState({ editGame: editGame? false: true })
    }

    _toggleAddGame = (addGame) => {
        this.setState({ addGame: addGame? false: true })
    }

    _modalSubmit = (myPosition, duoPosition, gameUsername, gameTitle) => {
         const base64 = require('base-64')
         fetch(baseUrl + "/api/playerGame", {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Basic ' + base64.encode(authKey+":")
             }
         })
         .then((response) => response.json())
         .then((responseJson) => {
             console.log(responseJson)
             this.setState({ playerGames: responseJson.userGames})
             // user profile only updates for a league of legends submit
             if (gameTitle == "League of Legends") {
               this.setState({ myPosition: myPosition, duoPosition: duoPosition,
                               gameUsername: gameUsername, editMode: true, editGame: false, addGame: false})
             } else {
               this.setState({editMode: true, editGame: false, addGame: false})
             }
            })
         .catch((error) => {
             console.error(error)
         })
    }

     _pullProfile = () => {
         const base64 = require('base-64')
         fetch(baseUrl + "/api/player", {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Basic ' + base64.encode(authKey+":")
             }
         })
         .then((response) => response.json())
         .then((responseJson) => {
             console.log(responseJson)
             this.setState({ username: responseJson.displayName, bio: responseJson.bio })
         })
         .catch((error) => {
             console.error(error)
         });
     }
     _pullGameData = () => {
         const base64 = require('base-64')
         fetch(baseUrl + "/api/games", {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
             }
         })
         .then((response) => response.json())
         .then((responseJson) => {
             console.log(responseJson)
             this.setState({allGameInfo: responseJson.games})
         })
         .catch((error) => {
             console.error(error)
         });

         fetch(baseUrl + "/api/playerGame", {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Basic ' + base64.encode(authKey+":")
             }
         })
         .then((response) => response.json())
         .then((responseJson) => {
             console.log(responseJson)
             this.setState({ playerGames: responseJson.userGames})
         })
         .catch((error) => {
             console.error(error)
         });
     }

    render () {
        const { editMode, editGame, addGame, username, bio,
                gameUsername, myPosition, duoPosition, playerGames, allGameInfo} = this.state
        return (
            <View>
                <TopNavigationBar
                    editMode = { editMode }
                    editModeFunc = { this._toggleEditMode }
                    editGame = { editGame }
                    editGameFunc = { this._toggleEditGame }
                    addGame = { addGame }
                    addGameFunc = { this._toggleAddGame }
                />
                <ScrollView>
                    {editMode && !editGame && <View style={styles.container}>
                        <ViewProfile
                            username={ username }
                            bio={ bio }
                        />
                        <Game
                            editGame={ editGame }
                            editGameFunc={ this._toggleEditGame }
                            gameUsername={ gameUsername }
                            myPosition={ myPosition }
                            duoPosition={ duoPosition }
                            isEmpty={playerGames.length == 0}
                        />
                        <Video/>
                        <Comment/>
                    </View>}
                    {editMode && editGame && !addGame && <SelectGame
                            playerGames= {playerGames}
                            allGameInfo= {allGameInfo}
                            addGame = { addGame }
                            addGameFunc = { this._toggleAddGame }
                            modalSubmit={ this._modalSubmit }
                    />}
                    {editMode && addGame && <AddGame
                            playerGames= {playerGames}
                            allGameInfo= {allGameInfo}
                            modalSubmit={ this._modalSubmit }
                    />}
                    {!editMode && <View style={styles.container}>
                        <EditProfile
                            editProf={ this._editProfile }
                            username={ username }
                            bio={ bio }
                        />
                    </View>}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70
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
