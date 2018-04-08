import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from '../containers/HomeScreen/Profile';
import ChatScreen from '../containers/ChatScreen/index';
import MatchingScreen from '../containers/MatchingScreen/index';

import Search from '../containers/MatchingScreen/Search';
import MatchingProfile from '../containers/MatchingScreen/Profile';

import FriendList from '../containers/ChatScreen/FriendList';
import PendingProfile from '../containers/ChatScreen/Profile';
import ChatRoom from '../containers/ChatScreen/ChatRomm';

export const MatchingStack = StackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Search',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2'
            }
        },
    },
    MatchingProfile: {
        screen: MatchingProfile,
        navigationOptions: {
            title: 'Matching',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            }
        },
    }
});

export const ChatStack = StackNavigator({
    FriendList: {
        screen: FriendList,
        navigationOptions: {
            title: 'Chat',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
                borderBottomWidth: 0,
            }
        },
    },
    PendingProfile: {
        screen: PendingProfile,
        navigationOptions: {
            title: 'User Profile',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
                borderBottomWidth: 0,
            }
        },
    },
    // TODO : change Details to chatting room screen
    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: ({ navigation }) => ({
            //title: `${navigation.state.params.name.first.toUpperCase()} ${'Chat'}`,
            title: 'Chat',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
                borderBottomWidth: 0,
            }
        }),
    }
});

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

