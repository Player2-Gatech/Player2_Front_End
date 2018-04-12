import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView,
         View, Text, TextInput, Image,
         ActivityIndicator, TouchableOpacity } from 'react-native'
import Slider from "react-native-slider";

import CustomButton from '../../components/CustomButton'

export default class Search extends Component {
    constructor() {
      super()
      this.state = {
        animating: true,
        enableSpinner: false
      }
    }

    renderSpinner(enableSpinner) {
      /*if (enableSpinner) {
                    //{ this.renderSpinner(enableSpinner) }
        return (
        )
      }*/
    }
    
    closeActivityIndicator = () => setTimeout(() => this.setState({ animating: false }), 6000)

    componentDidMount = () => this.closeActivityIndicator()
    
    getMatches() {
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
          this.props.navigation.navigate("MatchingProfile", { matchingProfiles: responseJson.matches })
      })
    }
    render () {
        const { navigate } = this.props.navigation
        const { enableSpinner } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#99E7FF" />
                </View>
                <View style={styles.mainContainer}>
                    <Slider
                      value={this.state.value}
                      onValueChange={value => this.setState({ value })}
                    />
                    <Slider
                      value={this.state.value}
                      onValueChange={value => this.setState({ value })}
                    />
                    <Slider
                      value={this.state.value}
                      onValueChange={value => this.setState({ value })}
                    />
                    <CustomButton
                        onPress={() => this.getMatches()}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        text={enableSpinner ? '' : 'Search'}
                    />
                </View>
            </View>
        )
    }
}
                /*<View style={styles.spinnerContainer}>
                {
                  this.renderSpinner(enableSpinner)
                }
                </View>
                    <TouchableOpacity onPress={() => this.getMatches()}>
                        <Text>"SEARCH"</Text>
                    </TouchableOpacity>
                    <CustomButton
                        onPress={() => this.getMatches()}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        text={enableSpinner ? '' : 'Search'}
                    />*/

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
