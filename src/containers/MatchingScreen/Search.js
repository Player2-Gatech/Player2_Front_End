import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'

export default class Search extends Component {
    render () {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <CustomButton
                        onPress={()=> navigate("MatchingProfile", {screen: "MatchingProfile"})}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        text={'Search'}
                    />
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
  }
})
