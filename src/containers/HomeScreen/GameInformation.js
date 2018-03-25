import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'
import {rankImages, champImages} from './ImageMap'
import Pie from 'react-native-pie'


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

    computePercentage(wins, losses) {
      return Math.round(100 * wins / (wins + losses))
    }
    render () {
        const { myPosition, duoPosition, gameUsername, skillInfo} = this.props
        if (skillInfo) {
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
                                      <Image style={styles.rankIcon} source={rankImages[skillInfo.tier]}/>
                                  </View>
                                  <View style={styles.colmContainer}>
                                      <Text>{gameUsername}</Text>
                                      <Text>{skillInfo.tier + " " + skillInfo.rank}</Text>
                                  </View>
                              </View>
                          </View>
                      </View>
                      <View style={styles.mostPickContainer}>
                          <View style={styles.rankIconContainer}>
                              <Image style={styles.rankIcon} source={champImages[skillInfo.rolePick]}/>
                          </View>
                      </View>
                  </View>

                  <View style={styles.rowContainer}>
                      <View style={styles.colmContainer}>
                          <Text style={styles.chartTitle}>Recent Game Winrate</Text>
                          <View style={styles.gauge}>
                            <Pie
                              radius={50}
                              innerRadius={45}
                              series={[this.computePercentage(skillInfo.wins, skillInfo.losses)]}
                              colors={['#1976D2']}
                              backgroundColor='#ddd' />
                              <Text style={styles.gaugeText}>{this.computePercentage(skillInfo.wins, skillInfo.losses)}%</Text>
                          </View>
                      </View>
                      <View style={styles.colmContainer}>
                          <Text style={styles.chartTitle}>{myPosition} Winrate</Text>
                          <View style={styles.gauge}>
                            <Pie
                              radius={50}
                              innerRadius={45}
                              series={[this.computePercentage(skillInfo.roleWins, skillInfo.roleLosses)]}
                              colors={['#1976D2']}
                              backgroundColor='#ddd' />
                              <Text style={styles.gaugeText}>{this.computePercentage(skillInfo.roleWins, skillInfo.roleLosses)}%</Text>
                          </View>
                      </View>
                  </View>

                  <View style={styles.rowContainer}>
                      <View style={styles.rankContainer}>
                          <View style={styles.rankIconContainer}>
                              <Text>{"W: " +  skillInfo.wins + " - L: " + skillInfo.losses}</Text>
                          </View>
                      </View>
                      <View style={styles.mostPickContainer}>
                          <View style={styles.rankIconContainer}>
                              <Text>{"W: " +  skillInfo.roleWins + " - L: " + skillInfo.roleLosses}</Text>
                          </View>
                      </View>
                  </View>
              </View>
          )
        } else {
          return (
              <View style={styles.container}>
                  <Text style={styles.errorText}>We had trouble finding your game stats...wrong IGN?</Text>
                  <Image style={styles.rankIcon} source={require('../../images/notfound.png')}/>
              </View>
          )
        }
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
  chartTitle: {
    fontSize: 14,
    color: '#9B9FA4',
    marginHorizontal: 8,
    marginVertical: 8,
    textAlign: 'left'
  },
  errorText: {
    fontSize: 14,
    color: '#9B9FA4',
    marginHorizontal: 8,
    marginVertical: 10,
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
    width: 75,
    height: 75
  },
  gauge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
   gaugeText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    color: '#000',
    fontSize: 24,
  },
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
