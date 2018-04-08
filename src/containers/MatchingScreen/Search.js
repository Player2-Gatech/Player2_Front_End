import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, ActivityIndicator } from 'react-native'

import CustomButton from '../../components/CustomButton'

export default class Search extends Component {
    constructor() {
      super()
      this.state = {
        enableSpinner: false
      }
    }

    renderSpinner(enableSpinner) {
      if (enableSpinner) {
        return (
          <ActivityIndicator size="large" color="#99E7FF" />
        )
      }
    }

    getMatches(navigate) {
      this.setState({enableSpinner : true})
      // just league for now
      const base64 = require('base-64')
      fetch(baseUrl + "/api/matches?gameTitle=League%20of%20Legends", {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(authKey+":")
          }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson.matches)
          this.setState({enableSpinner : false})
          navigate("MatchingProfile", {screen: "MatchingProfile", matchingProfiles: responseJson.matches})
      })
    }
    render () {
        const { navigate } = this.props.navigation
        const { enableSpinner } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomButton
                        onPress={() => this.getMatches(navigate)}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        text={enableSpinner ? '' : 'Search'}
                    />
                </View>
                <View style={styles.spinnerContainer}>
                {
                  this.renderSpinner(enableSpinner)
                }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1976D2',
    height: 60,
    width: 200
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
