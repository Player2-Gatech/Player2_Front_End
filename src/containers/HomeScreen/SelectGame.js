import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet, AppRegistry, ScrollView,
    View, Text, TextInput, Image, Alert, ActivityIndicator,
    TouchableOpacity, TouchableHighlight
} from 'react-native'
import Modal from 'react-native-modalbox'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'
import GameInformation from './GameInformation'
import AddModal from './AddModal'

export default class SelectGame extends Component {
    constructor(props) {
        super(props);
        this._onPressSelectGame = this._onPressSelectGame.bind(this)
    }
    /*static propTypes = {
        addGame: PropTypes.bool.isRequired,
        addGameFunc: PropTypes.func.isRequired,
        modalSubmit: PropTypes.func.isRequired,
        playerGames: PropTypes.object.isRequired,
        allGameInfo: PropTypes.object.isRequired,
        skillSpinner: PropTypes.bool.isRequired
    }*/
    
    _onPressSelectGame(gameTitle, allGameInfo) {
        var matchingGame = allGameInfo.filter(g => g.title == gameTitle)[0]
        this.refs.addModal.showAddModal('Edit Game Details', gameTitle, matchingGame.ignDescriptor, matchingGame.roles);
    }

    _onSubmitModal(myPosition, duoPosition, gameUsername, gameTitle) {
        let body = JSON.stringify({
          'playerGameRole': {
           'gameTitle': gameTitle,
           'displayName': gameUsername,
           'role': myPosition,
           'partnerRole': duoPosition
          }})
        console.log(body)
         const base64 = require('base-64')
         fetch(baseUrl + "/api/player", {
             method: 'PUT',
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

    renderSelectGames(playerGames, allGameInfo) {
        const images = { 'League of Legends': require('../../images/lolLogo.png'),
                         'Overwatch': require('../../images/overwatchLogo.png'),
                         'World of Warcraft': require('../../images/wowLogo.png') }
        return playerGames.map((item) => {
            return (
                <View style={styles.gameContainer}>
                    <TouchableOpacity
                        onPress={() => this._onPressSelectGame(item.gameTitle, allGameInfo)}
                    >
                        <Image style={styles.gameLogo}
                               source={images[item.gameTitle]}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
            );
        });
    }
    
    renderSpinner(enableSpinner) {
        if (enableSpinner) {
            return (
                <View>
                  <Text style={styles.spinnerText}>{'Getting stats...'}</Text>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        };
    }
    
    render () {
        const { addGameFunc,
                modalSubmit,
                playerGames,
                allGameInfo,
                skillSpinner
                } = this.props.navigation.state.params;
        return (
          <View>
            <View style={styles.container}>
                { this.renderSelectGames(playerGames, allGameInfo) }
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => addGameFunc()}
                    >
                    <Image
                        style={styles.button}
                        source={require('../../images/plusIconWhite.png')}
                        resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                <AddModal
                    ref={'addModal'}
                    parentScreen={this}
                />
            </View>
            <View style={styles.spinnerContainer}>
                { this.renderSpinner(skillSpinner) }
            </View>
          <View style={styles.spinnerContainer}>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: metrics.DEVICE_HEIGHT
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH * 0.95,
    height: 100,
    marginVertical: 8,
  },
  button: {
    height: 50,
    width: metrics.DEVICE_WIDTH * 0.95,
    backgroundColor: '#1976D2'
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
  spinnerText: {
    fontSize: 20,
    color: '#9B9FA4',
    marginHorizontal: 8,
    marginVertical: 10,
    textAlign: 'center'
  },
})

AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
