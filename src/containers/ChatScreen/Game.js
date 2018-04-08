import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet, AppRegistry, ScrollView,
    View, Text, Image,
} from 'react-native'

import CustomButton from '../../components/CustomButton'
import metrics from '../../config/metrics'
import GameInformation from './GameInformation'

export default class Game extends Component {
    constructor() {
        super();
    }
    static propTypes = {
        gameUsername: PropTypes.string.isRequired,
        myPosition: PropTypes.string.isRequired,
        duoPosition: PropTypes.string.isRequired,
        skillInfo: PropTypes.object.isRequired
    }
    render () {
        const { gameUsername, myPosition, duoPosition, skillInfo} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.gameSectionContainer}>

                    <View style={styles.gameIconContainer}>
                        <Text style={styles.sectionTitle}>{'Game'}</Text>
                        <Image style={styles.gameIcon} source={require('../../images/lolicon.jpeg')}/>
                    </View>

                    <View style={styles.gameDescriptionContainer}>
                        <View style={styles.searchOption}>
                            <Text>Preferred Position : {myPosition}</Text>
                            <Text>Preferred Duo Position : {duoPosition}</Text>
                        </View>
                    </View>
                </View>

                <GameInformation
                    myPosition={myPosition}
                    duoPosition={duoPosition}
                    gameUsername={gameUsername}
                    skillInfo={skillInfo}
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
  editIcon: {
    height: 24,
    width: 24
  },
  editIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
    marginBottom: 8
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
  },
  searchOption: {
    justifyContent: 'center',
  }
})

AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
