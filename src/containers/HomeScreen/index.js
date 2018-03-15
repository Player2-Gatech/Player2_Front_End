import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image, StatusBar} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'
import Profile from './Profile'

import ChatScreen from '../ChatScreen'
import MatchingScreen from '../MatchingScreen'

class HomeScreenTabNavigator extends Component {
    render() {
        return <Navigator screenProps={this.props} />; 
    }
}

class HomeScreen extends Component {
    /*static propTypes = {
        logout: PropTypes.func,
        authKey: PropTypes.string.isRequired
    }*/
    //TODO Hee: StatusBar background color
    render () {
        const { logout, authKey } = this.props.screenProps
        return (
            <ScrollView>
                <StatusBar barStyle="dark-content"/>
                <Profile authKey={authKey}/>
            </ScrollView>
        )
    }
}

/*const AppNavigator = StackNavigator({
    ProfileScreen: { screen: HomeScreen },
    MatchingScreen: { screen: MatchingScreen },
    ChatScreen: { screen: ChatScreen }
})*/

const Navigator = TabNavigator({
    HomeScreen: { screen: HomeScreen },
    MatchingScreen: { screen: MatchingScreen },
    ChatScreen: { screen: ChatScreen }
}, {
    animationEnabled: true
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
    alignItems: 'center'
  },
})

export default HomeScreenTabNavigator;
//AppRegistry.registerComponent('HomeScreenTabNavigator', () => HomeScreenTabNavigator);
