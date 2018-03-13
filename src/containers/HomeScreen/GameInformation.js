import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'

export default class EditProfile extends Component {
    static propTypes = {
        myPosition: PropTypes.string.isRequired,
        duoPosition: PropTypes.string.isRequired,
        gameUsername: PropTypes.string.isRequired
    }
    //TODO get rank, win, loss, pref win, and pref loss
    //TODO Hee: make pie chart to display win rate
    state = {
        rank: "Challenger",
        win: 10,
        loss: 5,
        prefWin: 10,
        prefLoss: 5
    }
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View style={styles.colmContainer}>
                        <Text style={styles.sectionTitle}>Rank</Text>
                    </View>
                    <View style={styles.colmContainer}>
                        <Text style={styles.sectionTitle}>Most Pick</Text>
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
                                    <Text>{this.props.gameUsername}</Text>
                                    <Text>{this.state.rank}</Text>
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
                        <Text style={styles.sectionTitle}>{this.props.myPosition} Winrate</Text>
                    </View>
                </View>

                <View style={styles.rowContainer}>
                    <View style={styles.rankContainer}>
                        <View style={styles.rankIconContainer}>
                            <Text>{this.state.win}</Text>
                            <Text>{this.state.loss}</Text>
                        </View>
                    </View>
                    <View style={styles.mostPickContainer}>
                        <View style={styles.rankIconContainer}>
                            <Text>{this.state.prefWin}</Text>
                            <Text>{this.state.prefLoss}</Text>
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
