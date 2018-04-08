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
                          <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>{'Video'}</Text>
                          </View>
                          <View style={styles.emptyStateTextContainer}>
                            <Text style={styles.emptyStateText}>{'Start by Adding a Video! '}</Text>
                          </View>
                          <View style={styles.tempContainer}>

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
                      <View style={styles.videoDescriptionContainer}>
                          <Text style={styles.sectionTitle}>{'Video'}</Text>
                          <View style={styles.emptyStateTextContainer}>
                            <Text style={styles.blankSpaceText}>{'                                                                                                '}</Text>
                          </View>
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
    padding: 10,
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
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 16,
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  videoSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoShowContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flex: 1,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1
  },
  videoDescriptionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
  blankSpaceText: {
    textAlign: 'right',
    fontSize: 13,
    paddingRight: 5
  },
  videoClipContainer: {
    //width: metrics.Device_WIDTH,

    width: 240,
    height: 160,
    marginHorizontal: 10,
    backgroundColor: "#9B9FA4",
    //justifyContent: 'center',
    alignContent: 'center'
  },
  tempContainer: {
    flex: 3,
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
