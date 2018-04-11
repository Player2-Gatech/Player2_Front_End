import React from 'react';
import { Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from '../containers/HomeScreen/Profile';

import EditProfile from '../containers/HomeScreen/EditProfile';
import AddGame from '../containers/HomeScreen/AddGame';
import SelectGame from '../containers/HomeScreen/SelectGame';

import Search from '../containers/MatchingScreen/Search';
import MatchingProfile from '../containers/MatchingScreen/Profile';

import FriendList from '../containers/ChatScreen/FriendList';
import PendingProfile from '../containers/ChatScreen/Profile';
import ChatRoom from '../containers/ChatScreen/ChatRoom';

export const HomeStack = StackNavigator({
    HomeProfile: {
        screen: Profile,
        navigationOptions: {
            title: 'My Profile',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            }
        },
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            title: 'Edit Profile',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            }
        },
    },
    SelectGame: {
        screen: SelectGame,
        navigationOptions: {
            title: 'Select Game',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            }
        },
    },
    AddGame: {
        screen: AddGame,
        navigationOptions: {
            title: 'AddGame',
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            }
        },
    },
});

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
            title: 'Friends List',
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
        screen: HomeStack,
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
        screen: MatchingStack,
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
        screen: ChatStack,
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

export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
    
});
