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
              <View style={styles.videoSectionContainer}>

                    <View style={styles.videoIconContainer}>
                        <Text style={styles.sectionTitle}>{'Video'}</Text>
                    </View>
                    <View style={styles.emptyStateTextContainer}>
                      <Text style={styles.emptyStateText}>{'Start by adding a video!'}</Text>
                    </View>
                    <View style={styles.videoDescriptionContainer}>
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
                <AddVideoModal
                  ref={'addVideoModal'}
                  
                />
            </View>
        )
      } else {
        return (
              <View style={styles.container}>
                  <View style={styles.videoSectionContainer}>

                      <View style={styles.videoIconContainer}>
                          <Text style={styles.sectionTitle}>{'Video'}</Text>
                      </View>

                      <View style={styles.videoDescriptionContainer}>
                          <TouchableOpacity
                              style={styles.editIconContainer}
                              onPress={() => onVideoPress(videoUrl)}
                          >
                              <Image
                                  style={styles.editIcon}
                                  source={require('../../images/plusIcon.png')}
                              />
                          </TouchableOpacity>
                          <WebView
                            source={{uri: "https://www.youtube.com/embed/" + videoUrl}}
                            style={styles.videoClipContainer}
                          />
                      </View>
                  </View>
                  <AddVideoModal
                    ref={'addVideoModal'}
                  
                  />
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
    alignItems: 'center'
  },
  bigContainer: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center',
    height: metrics.DEVICE_HEIGHT
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
    marginHorizontal: 4
  },
  videoSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#99E7FF'
  },
  videoIconContainer: {
    flex: 1,
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  videoDescriptionContainer: {
    flex: 3
  },
  gameIcon: {
    width: 50,
    height: 50,
    marginTop: 10
  },
  searchOption: {
    justifyContent: 'center',
  },
  emptyStateTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  emptyStateText: {
    textAlign: 'right',
    fontSize: 13,
  },
  videoClipContainer: {
    //width: metrics.Device_WIDTH,
    width: 240,
    height: 160,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    borderColor: '#9B9FA4',
    backgroundColor: "#9B9FA4",
    //justifyContent: 'center',
    alignItems: 'center'
  },
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
