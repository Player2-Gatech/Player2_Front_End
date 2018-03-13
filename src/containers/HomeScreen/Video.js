import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'

export default class Video extends Component {
    render () {
        return (
            <View style={styles.container}>
                
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>{'Video'}</Text>
                </View>

                <View style={styles.gameSectionContainer}>
                    <ScrollView horizontal={true} style={styles.gameDescriptionContainer}>
                        <View style={styles.videoClipContainer}>
                        </View>
                        <View style={styles.videoClipContainer}>
                        </View>
                    </ScrollView>
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
    //alignItems: 'center'
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#99E7FF'
  },
  img: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: 50
  },
  sectionTitleContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    fontSize: 16,
    color: '#9B9FA4',
  },
  gameSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameIconContainer: {
    marginRight:20
  },
  gameIcon: {
    width: 50,
    height: 50
  },
  videoClipContainer: {
    //width: metrics.Device_WIDTH,
    width: 200,
    height: 100,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    borderColor: '#9B9FA4',
    backgroundColor: 'yellow',
    //justifyContent: 'center',
    alignItems: 'center'
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
