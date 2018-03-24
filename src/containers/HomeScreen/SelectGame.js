import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet, AppRegistry, ScrollView,
    View, Text, TextInput, Image, Alert,
    TouchableOpacity, TouchableHighlight
} from 'react-native'
import Modal from 'react-native-modalbox'

//import ModalPicker from 'react-native-modal-picker'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'
import GameInformation from './GameInformation'
import AddModal from './AddModal'

//const data = require('./ActionBarMenuList.js')

export default class SelectGame extends Component {
    constructor(props) {
        super(props);
        this._onPressSelectGame = this._onPressSelectGame.bind(this)
    }
    static propTypes = {
        addGame: PropTypes.bool.isRequired,
        addGameFunc: PropTypes.func.isRequired,
        modalSubmit: PropTypes.func.isRequired
    }
    _onPressSelectGame(gameTitle) {
        // TODO fetch player game details
        fetch(baseUrl + "/api/games", { method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if (checker == "message") {
              checker = Object.keys(responseJson)[0];
              Alert.alert('Error', responseJson.checker)
          } else {
            console.log("YO")
            console.log(responseJson)
          }
        })
        .catch((error) => {
            console.error(error);
        });
        this.refs.addModal.showAddModal('Edit Game Details', gameTitle, 'lol', [{value: 'ADC'}]);
    }
    _onSubmitModal(myPosition, duoPosition, gameUsername) {
        // TODO post for player game role, not necessary for demo right now
        this.props.modalSubmit(myPosition, duoPosition, gameUsername)
    }
    render () {
        const { addGame, addGameFunc, modalSubmit } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.gameContainer}>
                    <TouchableOpacity
                        onPress={() => this._onPressSelectGame('League of Legends')}
                    >
                        <Image
                            style={styles.gameLogo}
                            source={require('../../images/lolLogo.png')}
                            resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                  <TouchableOpacity
                      onPress={() => addGameFunc(addGame)}
                  >
                      <Image
                          style={styles.button}
                          source={require('../../images/plusIconWhite.png')}
                          resizeMode={'contain'}/>
                  </TouchableOpacity>
                <AddModal
                    ref={'addModal'}
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
    //justifyContent: 'center',
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
  button: {
    height: 50,
    width: metrics.DEVICE_WIDTH * 0.95,
    backgroundColor: '#1976D2'
  },
})
