import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'

export default class Comment extends Component {
    render () {
        return (
            <View style={styles.container}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>{'Comments'}</Text>
                </View>
                
                <View style={styles.commentContainer}>
                    <Text>Anonymous</Text>
                    <Text>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel orci porta non pulvinar neque laoreet suspendisse. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Gravida arcu ac tortor dignissim. Felis bibendum ut tristique et egestas."
                    </Text>
                </View>
                <View style={styles.commentContainer}>
                    <Text>Anonymous</Text>
                    <Text>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel orci porta non pulvinar neque laoreet suspendisse. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Gravida arcu ac tortor dignissim. Felis bibendum ut tristique et egestas."
                    </Text>
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
    marginHorizontal: 8
  },
  commentContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    borderColor: '#99E7FF',
    padding: 5,
    margin: 5
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
