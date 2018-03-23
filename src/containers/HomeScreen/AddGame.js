import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet, AppRegistry, ScrollView,
    View, Text, TextInput, Image,
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
            myPosition: "SELECT",
            duoPosition: "SELECT",
            gameUsername: "HEE"
        }
        this._onPressAddGame = this._onPressAddGame.bind(this)
    }
    static propTypes = {
        modalSubmit: PropTypes.func.isRequired,
    }
    _onPressAddGame(gameTitle) {
        this.refs.addModal.showAddModal('Add Game Details', gameTitle);
    }
    _onSubmitModal(myPosition, duoPosition, gameUsername) {
        this.props.modalSubmit(myPosition, duoPosition, gameUsername)
    }
    render () {
        const { modalSubmit } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.gameContainer}>
                    <TouchableOpacity
                        onPress={() => this._onPressAddGame('Overwatch')}
                    >
                        <Image
                            style={styles.gameLogo}
                            source={require('../../images/overwatchLogo.png')}
                            resizeMode={'stretch'}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.gameContainer}>
                    <TouchableOpacity
                        onPress={() => this._onPressAddGame('World of Warcraft')}
                    >
                        <Image
                            style={styles.gameLogo}
                            source={require('../../images/wowLogo.png')}
                            resizeMode={'stretch'}/>
                    </TouchableOpacity>
                </View>
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
})

AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
