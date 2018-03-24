import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        myPosition: PropTypes.string.isRequired,
        duoPosition: PropTypes.string.isRequired,
        gameUsername: PropTypes.string.isRequired,
        skillInfo: PropTypes.object.isRequired,
    }
    state = {
        rank: "Challenger",
        win: 10,
        loss: 5,
        prefWin: 10,
        prefLoss: 5
    }
    render () {
        const { myPosition, duoPosition, gameUsername, skillInfo} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View style={styles.colmContainer}>
                        <Text style={styles.sectionTitle}>Rank</Text>
                    </View>
                    <View style={styles.colmContainer}>
                        <Text style={styles.sectionTitle}>Pocket Pick</Text>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.rankContainer}>
                        <View style={styles.rankContainer}>
                            <View style={styles.rowContainer}>
                                <View style={styles.colmContainer}>
                                    <Image style={styles.rankIcon} source={require('../../images/challengerIcon.png')}/>
                                </View>
                                <View style={styles.colmContainer}>
                                    <Text>{gameUsername}</Text>
                                    <Text>{skillInfo ? skillInfo.rank : ""}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.mostPickContainer}>
                        <View style={styles.rankIconContainer}>
                            <Image style={styles.rankIcon} source={require('../../images/ezreal.jpeg')}/>
                        </View>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.colmContainer}>
                        <Text style={styles.sectionTitle}>Recent Game Winrate</Text>
                    </View>
                    <View style={styles.colmContainer}>
                        <Text style={styles.sectionTitle}>{myPosition} Winrate</Text>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.rankContainer}>
                        <View style={styles.rankIconContainer}>
                            <Text>{skillInfo ? skillInfo.wins : ""}</Text>
                            <Text>{skillInfo ? skillInfo.losses : ""}</Text>
                        </View>
                    </View>
                    <View style={styles.mostPickContainer}>
                        <View style={styles.rankIconContainer}>
                            <Text>{skillInfo ? skillInfo.roleWins : ""}</Text>
                            <Text>{skillInfo? skillInfo.roleLosses : ""}</Text>
                        </View>
                    </View>
                </View>
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
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#99E7FF'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  colmContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: 50
  },
  sectionTitle: {
    fontSize: 14,
    color: '#9B9FA4',
    marginHorizontal: 8,
    textAlign: 'left'
  },
  rankContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  mostPickContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  rankIcon: {
    width: 50,
    height: 50
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
