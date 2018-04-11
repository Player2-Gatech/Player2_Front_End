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
import AddVideoModal from './AddVideoModal'

export default class Video extends Component {
  constructor() {
    super();
  }
  static PropTypes = {
    onVideoPress: PropTypes.func,
    videoUrl: PropTypes.string,
    isEmpty: PropTypes.bool,
  }

    render () {
      const { onVideoPress, videoUrl, isEmpty } = this.props
      if (isEmpty) {
        return (
          <View style={styles.container}>
            <View style={styles.noVideoContainer}>
              <View style={styles.emptySectionContainer}>
                <Text style={styles.sectionTitle}>{'Video'}</Text>
              </View>
              <View style={styles.emptyStateTextContainer}>
                <Text style={styles.emptyStateText}>{'Start by adding a video!'}</Text>
              </View>
              <View style={{flex: 3}}>
                <TouchableOpacity
                  style={styles.editIconContainer}
                  onPress={() => onVideoPress(videoUrl)}
                >
                  <Image
                    style={styles.editIcon}
                    source={require('../../images/plusIcon.png')}
                  />
                </TouchableOpacity>
              </View>
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
                  <View style={{flex: 3, justifyContent: "flex-end"}}>
                    <TouchableOpacity
                      style={styles.editIconContainer}
                      onPress={() => onVideoPress(videoUrl)}
                    >
                      <Image
                        style={styles.editIcon}
                        source={require('../../images/plusIcon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <WebView
                  source={{uri: "https://www.youtube.com/embed/" + videoUrl}}
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
  editIcon: {
    height: 24,
    width: 24
  },
  editIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
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
    alignContent: 'center'
  },
  emptySectionContainer: {
    flex: 1,
    marginRight:20,
    flexDirection: 'row'
  },

})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
