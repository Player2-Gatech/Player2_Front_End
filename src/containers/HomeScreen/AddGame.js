import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet, AppRegistry, ScrollView,
    View, Text, TextInput, Image, ActivityIndicator,
    TouchableOpacity, TouchableHighlight
} from 'react-native'

//import ModalPicker from 'react-native-modal-picker'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'
import GameInformation from './GameInformation'
import AddModal from './AddModal'

//const data = require('./ActionBarMenuList.js')

export default class AddGame extends Component {
    constructor() {
        super();
        this.state = {
            myPosition: "",
            duoPosition: "",
            gameUsername: ""
        }
        this._onPressAddGame = this._onPressAddGame.bind(this)
    }
    /*static propTypes = {
        modalSubmit: PropTypes.func.isRequired,
        playerGames: PropTypes.object.isRequired,
        allGameInfo: PropTypes.object.isRequired,
        skillSpinner: PropTypes.bool.isRequired
    }*/

    _onPressAddGame(gameTitle, allGameInfo) {
        var matchingGame = allGameInfo.filter(g => g.title == gameTitle)[0]
        this.refs.addModal.showAddModal('Add Game Details', gameTitle, matchingGame.ignDescriptor, matchingGame.roles);
    }

    _onSubmitModal(myPosition, duoPosition, gameUsername, gameTitle) {
        let body = JSON.stringify({
           'gameTitle': gameTitle,
           'displayName': gameUsername,
           'role': myPosition,
           'partnerRole': duoPosition
        })

         const base64 = require('base-64')
         fetch(baseUrl + "/api/playerGame", {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': 'Basic ' + base64.encode(authKey+":")
             },
            body: body
         }).then((response) => response.json())
         .then((responseJson) => {
            this.props.navigation.state.params.modalSubmit(myPosition, duoPosition, gameUsername, gameTitle)
         })
         .catch((error) => {
             console.error(error)
         });
    }

    renderAddGames(playerGames, allGameInfo) {
      // add only games the player is signed up for
      playerGameTitleList = playerGames.map(g => g.gameTitle)
      const images = {
        'League of Legends': require('../../images/lolLogo.png'),
        'Overwatch': require('../../images/overwatchLogo.png'),
        'World of Warcraft': require('../../images/wowLogo.png')
      }
      return allGameInfo.map((item) => {
          if (playerGameTitleList.indexOf(item.title) < 0) {
            return (
                  <View style={styles.gameContainer}>
                      <TouchableOpacity
                          onPress={() => this._onPressAddGame(item.title, allGameInfo)}
                      >
                          <Image
                              style={styles.gameLogo}
                              source={images[item.title]}
                              resizeMode={'contain'}/>
                      </TouchableOpacity>
                  </View>
            );
          }
      });
    }

    renderSpinner(enableSpinner) {
      if (enableSpinner) {
        return (
          <View>
            <Text style={styles.spinnerText}>{'Getting stats...'}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      }
    }

    render () {
        const { modalSubmit,
                playerGames,
                allGameInfo,
                skillSpinner} = this.props.navigation.state.params;
        return (
          <View>
            <View style={styles.container}>
              {
                this.renderAddGames(playerGames, allGameInfo)
              }
                <AddModal
                    ref={'addModal'}
                    parentScreen={this}
                />
            </View>
        </View>
        )
    }
}
          /*<View style={styles.spinnerContainer}>
            { this.renderSpinner(skillSpinner) }
          </View>*/

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
    height: metrics.DEVICE_HEIGHT
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
  sectionTitle: {
    fontSize: 16,
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  gameContainer: {
    //flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH * 0.95,
    height: 100,
    marginVertical: 8,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#99E7FF',
  },
  gameLogo: {
    width: metrics.DEVICE_WIDTH * 0.60,
    height: 100,
  },
  spinnerText: {
    fontSize: 20,
    color: '#9B9FA4',
    marginHorizontal: 8,
    marginVertical: 10,
    textAlign: 'center'
  },
})

AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
