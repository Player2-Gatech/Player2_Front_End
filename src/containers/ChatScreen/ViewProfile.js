import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/profileicon.png'
import metrics from '../../config/metrics'

export default class ViewProfile extends Component {
    static propTypes = {
        pricture: PropTypes.object,
        username: PropTypes.object.isRequired,
        bio: PropTypes.string.isRequired
    }
    render () {
        const { picture, username, bio } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{ uri: picture.large}}/>
                </View>
                <View style={styles.usernameContainer}>
                    <Text style={styles.whiteText}>{ username.first.toUpperCase() }</Text>
                </View>
                <View style={styles.bioContainer}>
                    <Text style={styles.bioText} adjustsFontSizeToFit={true}>{ bio }</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1976D2",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    width: metrics.DEVICE_WIDTH
  },
  imgContainer: {
    //marginTop: 28
  },
  img: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    //width: metrics.Device_WIDTH / 3,
    //height: metrics.Device_WIDTH / 3,
    width: 112,
    height: 112,
    borderWidth: 2,
    borderColor: '#99E7FF',
    borderRadius: 15
  },
  usernameContainer: {
    marginTop: 10
  },
  whiteText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  bioContainer: {
    width: metrics.DEVICE_WIDTH - 100,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#99E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  bioText: {
    color: "#1976D2",
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
