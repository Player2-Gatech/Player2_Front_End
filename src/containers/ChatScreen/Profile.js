import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, Alert } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import metrics from '../../config/metrics'

import { users, pendingUsers } from '../../config/data';

import ViewProfile from './ViewProfile'
import Game from './Game'
import Video from './Video'
import Comment from './Comment'
import AddModal from './AddModal'

import CustomButton from '../../components/CustomButton'

export default class Profile extends Component {
    // TODO : _editProfile : store the passed username and bio parameters into database,
    state = {
        username: "MY NAME",
        bio: "BIO",
        gameUsername: "NONE",
        myPosition: "NONE",
        duoPosition: "NONE",
    }
    _onPressComment() {
        this.refs.commentModal.showAddModal()
    }
    _onSubmitModal(starCount, comment) {
        alert("likes : " + starCount + " comment : " + comment)
    }
    render () {
        const { username, bio, gameUsername, myPosition, duoPosition } = this.state
        const { picture, name, email, isPending } = this.props.navigation.state.params;
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        <ViewProfile
                            picture = { picture }
                            username= { name }
                            bio     = { email }
                        />
                        <Game
                            gameUsername={ gameUsername }
                            myPosition={ myPosition }
                            duoPosition={ duoPosition }
                        />
                        <Video/>
                        <Comment/>
                    </View>
                </ScrollView>
                { !isPending && <ActionButton buttonColor='#1976D2'>
                    <ActionButton.Item buttonColor='#9b59b6'
                                        title='leave comment'
                                        onPress = {() => this._onPressComment()}>
                        <Icon name='md-create'/>
                    </ActionButton.Item>
                </ActionButton>}
                { isPending && <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={() => {alert('Delete the selected pending item from DB. Also, reload the list of items')}}
                        buttonStyle={styles.skipButton}
                        textStyle={styles.skipButtonText}
                        text={'SKIP'}
                    />
                    <CustomButton
                        onPress={() => {alert('Delete the selected pending item from DB and Add to friend list from DB. Also, reload the list of items')}}
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
