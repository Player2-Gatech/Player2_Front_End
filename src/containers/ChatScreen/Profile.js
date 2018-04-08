import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, Alert } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import metrics from '../../config/metrics'

import ViewProfile from './ViewProfile'
import Game from './Game'
import Video from './Video'
import Comment from './Comment'
import AddModal from './AddModal'

import CustomButton from '../../components/CustomButton'

export default class Profile extends Component {
    _onPressComment(user) {
        this.refs.commentModal.showAddModal(user)
    }
    _onSubmitModal(user, starCount, comment) {
        let body = JSON.stringify({
            'user_id': user.user_id,
            'message': comment,
            'rating': starCount
        })
        const base64 = require('base-64')
        fetch(baseUrl + "/api/playerComment", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(authKey+":")
            },
            body: body
        })
        .then((response) => response.json())
        // TODO update profile since comment has been posted?
    }

    _onRespondToRequest(user, skipped, updateFriends) {
      let body = JSON.stringify({
          'matchUserId': user.user_id,
          'pending': false,
          'delete': skipped,
          'retUpdated': true
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
      .then((response) => response.json())
      .then((responseJson) => {
           updateFriends(responseJson.pending, responseJson.friends)
            this.props.navigation.navigate('FriendList', {screen: 'FriendList'})
      })
    }

    render () {
        const { user, isPending, updateFriends} = this.props.navigation.state.params;
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <ViewProfile
                            username={user.displayName }
                            bio={user.bio }
                            photo={user.profilePhoto}
                        />
                        <Game
                            gameUsername={user.playerGameRole.filter(g => g.gameTitle == 'League of Legends')[0].displayName }
                            myPosition={user.playerGameRole.filter(g => g.gameTitle == 'League of Legends')[0].role }
                            duoPosition={user.playerGameRole.filter(g => g.gameTitle == 'League of Legends')[0].partnerRole }
                            skillInfo={user.playerSkill[0]}
                        />
                        <Video
                            playerVideo={ user.playerVideo }
                        />
                        <Comment/>
                    </View>
                </ScrollView>
                { !isPending && <ActionButton buttonColor='#1976D2'>
                    <ActionButton.Item buttonColor='#9b59b6'
                                        title='leave comment'
                                        onPress = {() => this._onPressComment(user)}>
                        <Icon name='md-create'/>
                    </ActionButton.Item>
                </ActionButton>}
                { isPending && <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={() => {this._onRespondToRequest(user, true, updateFriends)}}
                        buttonStyle={styles.skipButton}
                        textStyle={styles.skipButtonText}
                        text={'REJECT'}
                    />
                    <CustomButton
                        onPress={() => {this._onRespondToRequest(user, false, updateFriends)}}
                        buttonStyle={styles.acceptButton}
                        textStyle={styles.acceptButtonText}
                        text={'DUO'}
                    />
                </View>}
                <AddModal
                    ref={'commentModal'}
                    parentScreen={this}
                />
            </View>
        )
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
  }
})
