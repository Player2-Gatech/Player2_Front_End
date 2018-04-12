import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View,
         Text, TextInput, Image, ActivityIndicator,
         TouchableOpacity, Button } from 'react-native'

import TopNavigationBar from './TopNavigationBar'

import EditProfile from './EditProfile'
import ViewProfile from './ViewProfile'
import SelectGame from './SelectGame'
import AddGame from './AddGame'
import Game from './Game'
import Video from './Video'
import Comment from './Comment'

import AddVideoModal from './AddVideoModal'
import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'

export default class Profile extends Component {
    state = {
        profileSpinner: false,
        editMode: true,
        editGame: false,
        username: "",
        bio: "",
        photo: "",
        gameUsername: "",
        myPosition: "",
        duoPosition: "",
        playerGames: "",
        allGameInfo: "",
        skillInfo: "",
        skillSpinner: false,
        videoUrl: "",
        playerVideo: null,
        playerComments: null
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

                //<View style={{ flex: 1, alignItems: 'flex-end', }}>
        return {
            headerRight: (
                    <TouchableOpacity onPress={ params.handleEditProfile } >
                        <Image
                            source = { require('../../images/pencilIcon.png') }
                            style  = {{ resizeMode: 'contain',
                                        tintColor: 'white',
                                        width: 20,
                                        height: 20,
                                        marginHorizontal: 16,
                                        alignSelf: 'center' }}
                        />

                    </TouchableOpacity>
            ),
            headerLeft: <View/>
        }
                //</View>
    }

    componentWillMount() {
        this._pullProfile()
        this.props.navigation.setParams({ handleEditProfile : this._navigateToEditProfile });
    }
    _navigateToEditProfile = () => {
        this.props.navigation.navigate('EditProfile', { _editProfile: this._editProfile,
                                                        username: this.state.username,
                                                        bio     : this.state.bio,
                                                        photo   : this.state.photo})
    }

    _editProfile = (username, bio, photo) => {
        this.setState({editMode:true})
        if (username != '' ) {
            this.setState({username:username })
        }

        if (bio != '' ) {
            this.setState({bio:bio })
        }

        if (photo != '' ) {
            this.setState({photo:photo })
        }
        let body = JSON.stringify({
           'displayName': username ? username : this.state.username,
           'bio': bio ? bio : this.state.bio,
           'profilePhoto' : photo ? photo : this.state.photo
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
    
    _toggleEditMode() {
        this.props.navigation.navigate('EditProfile');
    }

    _toggleEditGame = () => {
        //alert("Hello?")
        this.props.navigation.navigate('SelectGame', {playerGames: this.state.playerGames,
                                                      allGameInfo: this.state.allGameInfo,
                                                      addGameFunc: this._toggleAddGame,
                                                      skillSpinner: this.state.skillSpinner,
                                                      modalSubmit: this._modalSubmit});
    }

    _toggleAddGame = () => {
        this.props.navigation.navigate('AddGame', {playerGames: this.state.playerGames,
                                                    allGameInfo: this.state.allGameInfo,
                                                    skillSpinner: this.state.skillSpinner,
                                                    modalSubmit: this._modalSubmit});
    }

    _onPressAddVideo(videoUrl) {
        this.refs.addVideoModal.showAddVideoModal('Add Video Url', videoUrl);
    }

    _onSubmitVideoModal(videoUrl) {
        let body = JSON.stringify({
           'videoUrl': videoUrl
        })

         const base64 = require('base-64')
         fetch(baseUrl + "/api/playerVideo", {
             method: 'PUT',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Basic ' + base64.encode(authKey+":")
             },
            body: body
         }).then((response) => response.json())
         .then((responseJson) => {
            console.log(responseJson)
            this._modalVideoSubmit(videoUrl)
         })
         .catch((error) => {
             console.error(error)
         });
    }

    _modalVideoSubmit = (videoUrl) => {
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
        this.setState({playerVideo: responseJson.playerVideo})
        if (this.state.playerVideo != null) {
          this.setState({videoUrl: this.state.playerVideo[0].video_url})
        }
      })
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
             this.setState({ skillSpinner: 1})
             // user profile only updates for a league of legends submit
             if (gameTitle == "League of Legends") {
                const base64 = require('base-64')
                fetch(baseUrl + "/api/playerSkill?update=1", {
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

                    // kind of tricky, but we have to make a third request to put the old gameUsername
                    //role info back in case the update was invalid
                    // We'll only know if the update was invalid after we get the response of the skills route
                    if (!responseJson.playerSkill) {
                      let body = JSON.stringify({
                        'playerGameRole': {
                        'gameTitle': gameTitle,
                        'displayName': this.state.gameUsername,
                        'role': this.state.myPosition,
                        'partnerRole': this.state.duoPosition
                        }})
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
                    }
                    this.setState({ skillInfo: responseJson.playerSkill,
                                    skillSpinner: 0,
                                    myPosition: myPosition,
                                    duoPosition: duoPosition,
                                    gameUsername: gameUsername,
                                    editMode: true,
                                    editGame: false})
                  })
                .catch((error) => {
                    console.error(error)
                })
             } else {
                this.setState({editMode: true, editGame: false, skillSpinner: 0})
             }
         })
    }

     _pullProfile = () => {
        this.setState({profileSpinner : true})
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
             var playerGame = responseJson.playerGameRole.filter(g => g.gameTitle == "League of Legends")[0]
             if (playerGame) {
              this.setState({ username: responseJson.displayName,
                              bio: responseJson.bio,
                              photo: responseJson.profilePhoto,
                              skillInfo: responseJson.playerSkill[0],
                              myPosition: playerGame.role,
                              duoPosition: playerGame.partnerRole,
                              gameUsername: playerGame.displayName,
                              playerVideo: responseJson.playerVideo,
                              playerComments: responseJson.playerComments})
            } else {
              this.setState({ username: responseJson.displayName,
                              bio: responseJson.bio,
                              photo: responseJson.profilePhoto,
                              skillInfo: responseJson.playerSkill[0],
                              playerVideo: responseJson.playerVideo, playerComments: responseJson.playerComments})
            }
            var playerVideo = responseJson.playerVideo
            if (playerVideo.length > 0) {
              this.setState({videoUrl: playerVideo[0].video_url})
            }
            this._pullGameData()
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
             this.setState({profileSpinner : false})
         })
         .catch((error) => {
             console.error(error)
         });
     }

    render () {
        const { editMode, editGame, username, bio, photo,
                gameUsername, myPosition, duoPosition, playerGames,
                allGameInfo, skillInfo, skillSpinner, profileSpinner,
                playerVideo, videoUrl, playerComments} = this.state

        if (profileSpinner) {
            return (
                <View style={styles.spinnerContainer}>
                  <ActivityIndicator size="large" color="#99E7FF" />
                </View>
            )
        }
        if (username == null&& bio == null && photo == "" && gameUsername == "" && playerVideo.length == 0 && playerComments.length == 0) {
          return (
              <ScrollView>
                  <View style={styles.container}>
                      <ViewProfile
                          username={ username }
                          bio={ bio }
                          photo= {photo}
                      />
                      <Game
                          editGame={ editGame }
                          editGameFunc={ this._toggleEditGame }
                          gameUsername={ gameUsername }
                          myPosition={ myPosition }
                          duoPosition={ duoPosition }
                          skillInfo = { skillInfo }
                          isEmpty={playerGames.length == 0}
                      />
                      <Video
                        videoUrl={ videoUrl }
                        isEmpty={videoUrl == ""}
                        onVideoPress={ this._onPressAddVideo.bind(this) }
                      />
                      <Comment
                        comments={playerComments}
                      />
                      <View
                        style={{flex: 1, width: metrics.DEVICE_WIDTH, height: metrics.DEVICE_HEIGHT * 0.25}}
                      />
                      <AddVideoModal
                        ref={'addVideoModal'}
                        parentScreen={this}
                      />
                  </View>
              </ScrollView>
          )
        } else {
          return (
              <ScrollView>
                  <View style={styles.container}>
                      <ViewProfile
                          username={ username }
                          bio={ bio }
                          photo= {photo}
                      />
                      <Game
                          editGame={ editGame }
                          editGameFunc={ this._toggleEditGame }
                          gameUsername={ gameUsername }
                          myPosition={ myPosition }
                          duoPosition={ duoPosition }
                          skillInfo = { skillInfo }
                          isEmpty={playerGames.length == 0}
                      />
                      <Video
                        videoUrl={ videoUrl }
                        isEmpty={videoUrl == ""}
                        onVideoPress={ this._onPressAddVideo.bind(this) }
                      />
                      <Comment
                        comments={playerComments}
                      />
                      <AddVideoModal
                        ref={'addVideoModal'}
                        parentScreen={this}
                      />
                  </View>
              </ScrollView>
          )
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 70
  },
  button: {
    backgroundColor: '#1976D2'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
