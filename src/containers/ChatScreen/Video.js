import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet, AppRegistry, ScrollView,
    View, Text, TextInput, Image,
    TouchableOpacity, TouchableHighlight, WebView
} from 'react-native'
import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'

export default class Video extends Component {
  constructor() {
    super();
  }

  static PropTypes = {
    playerVideo: PropTypes.array,
  }

    render () {
      const { playerVideo } = this.props
      if (playerVideo.length == 0) {
        return (
          <View style={styles.container}>
            <View style={styles.noVideoContainer}>
              <View style={styles.emptySectionContainer}>
                <Text style={styles.sectionTitle}>{'Video'}</Text>
              </View>
              <View style={styles.emptyStateTextContainer}>
                <Text style={styles.emptyStateText}>{'Looks like there is nothing here!'}</Text>
              </View>
              <View style={{flex:1}}/>
            </View>
          </View>
        )
      } else {
        return (
          <View style={styles.container}>
              <View style={styles.videoShowContainer}>
                <View style={styles.sectionTitleContainer}>
                  <View style={styles.emptySectionContainer}>
                    <Text style={styles.sectionTitle}>{'Video'}</Text>
                  </View>
                  <View style={styles.emptySectionContainer}>
                  </View>
                  <View style={{flex: 2}}>
                  </View>
                </View>
                <WebView
                  source={{uri: "https://www.youtube.com/embed/" + playerVideo[0].video_url}}
                  style={styles.videoClipContainer}
                />
              </View>
          </View>
          )
        }
      }

    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#99E7FF',
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 14,
    color: '#9B9FA4',
    marginHorizontal: 8,
  },
  emptyStateText: {
  textAlign: 'right',
  fontSize: 11,
  },
  noVideoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  videoShowContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoClipContainer: {
    width: 280,
    height: 170,
    marginHorizontal: 10,
    backgroundColor: "#9B9FA4",
    alignContent: 'center',
    paddingVertical: 5
  },
  emptySectionContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  emptyStateTextContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
AppRegistry.registerComponent('AwesomeProject', () => ChatScreen);
