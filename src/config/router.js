import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from '../containers/HomeScreen/Profile';
import ChatScreen from '../containers/ChatScreen/index';
import MatchingScreen from '../containers/MatchingScreen/index';

export const Tabs = TabNavigator({
    Profile: { 
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../images/tabBarProfileIcon.png')}
                    style={{width:22, height:22, tintColor: tintColor}}>
                </Image>
            )
        }
    },
    MatchingScreen: {
        screen: MatchingScreen,
        navigationOptions: {
            tabBarLabel: 'Match',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../images/searchIcon.png')}
                    style={{width:22, height:22, tintColor: tintColor}}>
                </Image>
            )
        }
    },
    ChatScreen: {
        screen: ChatScreen,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../images/chatIcon.png')}
                    style={{width:22, height:22, tintColor:tintColor}}>
                </Image>
            )
        }
    }
}, {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: 'white',
        activeBackgroundColor: '#1976D2',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: 'white',
        labelStyle: {
            fontSize: 16,
            padding: 0
        }
    }
});

