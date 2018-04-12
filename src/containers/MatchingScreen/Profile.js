import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, ActivityIndicator } from 'react-native'
import { NavigationActions } from 'react-navigation'

import metrics from '../../config/metrics'

import ViewProfile from './ViewProfile'
import Game from './Game'
import Video from './Video'
import Comment from './Comment'

import CustomButton from '../../components/CustomButton'

export default class Profile extends Component {
    state = {
      matchIndex: 0,
      videoUrl: "",
    }

    _sendPendingRequest(matchingUserId) {
      let body = JSON.stringify({
          'matchUserId': matchingUserId,
          'pending': true,
      })

      const base64 = require('base-64')
      fetch(baseUrl + "/api/playerFriends", {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(authKey+":")
          },
          body: body
      })
      .then((response) =>
          this.setState({matchIndex: this.state.matchIndex+1})
      )
    }

    render () {
        const {matchIndex, videoUrl} = this.state
        const {matchingProfiles} = this.props.navigation.state.params;
        const { navigate } = this.props.navigation
          if (matchIndex < matchingProfiles.length) {
              return (
              <View>
                  <ScrollView>
                      <View style={styles.container}>
                          <ViewProfile
                              username={matchingProfiles[matchIndex].displayName }
                              bio={matchingProfiles[matchIndex].bio }
                              photo={matchingProfiles[matchIndex].profilePhoto}
                          />
                          <Game
                              gameUsername={matchingProfiles[matchIndex].playerGameRole.filter(g => g.gameTitle == 'League of Legends')[0].displayName }
                              myPosition={matchingProfiles[matchIndex].playerGameRole.filter(g => g.gameTitle == 'League of Legends')[0].role }
                              duoPosition={matchingProfiles[matchIndex].playerGameRole.filter(g => g.gameTitle == 'League of Legends')[0].partnerRole }
                              skillInfo={matchingProfiles[matchIndex].playerSkill[0]}
                          />
                          <Video
                              playerVideo={matchingProfiles[matchIndex].playerVideo}
                          />
                          <Comment
                            comments = {matchingProfiles[matchIndex].playerComments}
                          />
                      </View>
                  </ScrollView>
                  <View style={styles.buttonContainer}>
                      <CustomButton
                          onPress={() => {
                            console.log(matchingProfiles[matchIndex + 1])
                            this.setState({matchIndex: matchIndex+1})}}
                          buttonStyle={styles.skipButton}
                          textStyle={styles.skipButtonText}
                          text={'SKIP'}
                      />
                      <CustomButton
                          onPress={() => {
                            this._sendPendingRequest(matchingProfiles[matchIndex].user_id)
                          }}
                          buttonStyle={styles.acceptButton}
                          textStyle={styles.acceptButtonText}
                          text={'DUO'}
                      />
                  </View>
              </View>
              )
           } else {
             return (
               <View style={styles.noMoreContainer}>
                  <Text style={styles.noMoreText}> No more potential matches to view!</Text>
                  <Image style={styles.img} source={require('../../images/sad.gif')} resize={'contain'}/>
                  <CustomButton
                      onPress={() => {
                        this.setState({matchIndex: 0})
                        this.props.navigation.dispatch(NavigationActions.back())
                      }}
                      buttonStyle={styles.button}
                      textStyle={styles.buttonText}
                      text={'Reconfigure Search'}
                  />
               </View>
             )
           }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    height: 70,
    //marginHorizontal: 50,
    backgroundColor: '#1976D2',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#99E7FF'
  },
  skipButton: {
    width: 100,
    height: 40,
    //marginLeft: metrics.DEVICE_WIDTH / 2 - 115,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  acceptButton: {
    width: 100,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  skipButtonText: {
    color: 'grey',
    fontWeight: 'bold'
  },
  acceptButtonText: {
    color: 'green',
    fontWeight: 'bold'
  },
  noMoreContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noMoreText: {
    fontSize: 20,
    color: '#9B9FA4',
    marginHorizontal: 8,
    marginVertical: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#9B9FA4',
    height: 60,
    width: 200
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  img: {
    height: 150,
    width: 150
  },
})
