import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet,
    AppRegistry,
} from 'react-native'

import { MatchingStack } from '../../config/router';
import Profile from './Profile'
import Search from './Search'

export default class HomeScreen extends Component {
    static propTypes = {
        logout: PropTypes.func
    }
    render () {
        return (
            <MatchingStack />
        )
    }
}

AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
