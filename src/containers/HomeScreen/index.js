import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
    StyleSheet,
    AppRegistry,
    View
} from 'react-native'

import { Tabs } from '../../config/router';
import { Root } from '../../config/router';

export default class HomeScreen extends Component {
    static propTypes = {
        logout: PropTypes.func
    }
    render () {
        return (
            <Root/>
        )
    }
}

AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
