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
    // TODO : _editProfile : store the passed username and bio parameters into database,
    state = {
        editMode: true,
        editGame: false,
        addGame: false,
        username: "MY NAME",
        bio: "BIO",
        gameUsername: "NONE",
        myPosition: "NONE",
        duoPosition: "NONE",
    }

    _editProfile = (username, bio) => {
        alert('username : ' + username + 'bio : ' + bio)
        if (username == '' || bio == '') {
            this.setState({ editMode:true, username:'MY NAME', bio:'BIO' })
        } else {
            this.setState({ editMode:true, username:username, bio:bio })
        }
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

    _modalSubmit = (myPosition, duoPosition, gameUsername) => {
        this.setState({editMode: true, editGame: false, addGame: false,
                        myPosition: myPosition, duoPosition: duoPosition,
                        gameUsername: gameUsername})
    }

    render () {
        const { editMode, editGame, addGame, username, bio,
                gameUsername, myPosition, duoPosition } = this.state
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
                        />
                        <Video/>
                        <Comment/>
                    </View>}
                    {editMode && editGame && !addGame && <SelectGame
                            addGame = { addGame }
                            addGameFunc = { this._toggleAddGame }
                            modalSubmit={ this._modalSubmit }
                    />}
                    {editMode && addGame && <AddGame
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
