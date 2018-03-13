import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'
import GameInformation from './GameInformation'

export default class EditProfile extends Component {
    state = {
        myPosition: "ADC",
        duoPosition: "SUP",
        gameUsername: "HEE"
    }
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.gameSectionContainer}>
                    <View style={styles.gameIconContainer}>
                        <Text style={styles.sectionTitle}>{'Game'}</Text>
                        <Image style={styles.gameIcon} source={require('../../images/lolicon.jpeg')}/>
                    </View>
                    <View style={styles.gameDescriptionContainer}>
                        <View style={styles.editIconContainer}>
                            <Image style={styles.editIcon} source={require('../../images/plusIcon.png')}/>
                        </View>
                        <View>
                            <Text>Preferred Position : {this.state.myPosition}</Text>
                            <Text>Preferred Duo Position : {this.state.duoPosition}</Text>
                        </View>
                    </View>
                </View>
                
                <GameInformation
                    myPosition={this.state.myPosition}
                    duoPosition={this.state.duoPosition}
                    gameUsername={this.state.gameUsername}
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
    alignItems: 'center'
  },
  img: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: 50
  },
  editIcon: {
    height: 16,
    width: 16
  },
  editIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 14
  },
  sectionTitle: {
    fontSize: 16,
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  gameSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#99E7FF'
  },
  gameIconContainer: {
    flex: 1,
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameDescriptionContainer: {
    flex: 3
  },
  gameIcon: {
    width: 50,
    height: 50,
    marginTop: 10
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
