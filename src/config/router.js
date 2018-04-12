import React from 'react';
import { Image, View } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from '../containers/HomeScreen/Profile';

import EditProfile from '../containers/HomeScreen/EditProfile';
import AddGame from '../containers/HomeScreen/AddGame';
import SelectGame from '../containers/HomeScreen/SelectGame';

import Search from '../containers/MatchingScreen/Search';
import MatchingProfile from '../containers/MatchingScreen/Profile';

import ChatScreen from '../containers/ChatScreen/index';
import FriendList from '../containers/ChatScreen/FriendList';
import PendingProfile from '../containers/ChatScreen/Profile';
import ChatRoom from '../containers/ChatScreen/ChatRoom';

export const HomeStack = StackNavigator({
    HomeProfile: {
        screen: Profile,
        navigationOptions: {
            title: 'My Profile',
            headerTitleStyle: {
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
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
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            },
            headerRight: <View/>
        },
    },
    SelectGame: {
        screen: SelectGame,
        navigationOptions: {
            title: 'Select Game',
            headerTitleStyle: {
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            },
            headerRight: <View/>
        },
    },
    AddGame: {
        screen: AddGame,
        navigationOptions: {
            title: 'AddGame',
            headerTitleStyle: {
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
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
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
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
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
            },
            headerRight: <View/>
        },
    }
});

export const ChatStack = StackNavigator({
    FriendList: {
        screen: FriendList,
        navigationOptions: {
            title: 'Friends List',
            headerTitleStyle: {
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
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
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
                borderBottomWidth: 0,
            },
            headerRight: <View/>
        },
    },
    // TODO : change Details to chatting room screen
    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: ({ navigation }) => ({
            //title: `${navigation.state.params.name.first.toUpperCase()} ${'Chat'}`,
            title: 'Chat',
            headerTitleStyle: {
                color: 'white',
                flex: 1,
                textAlign: 'center',
                alignSelf:'center'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#1976D2',
                borderBottomWidth: 0,
            },
            headerRight: <View/>
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
    swipeEnabled: false,
    animationEnabled: false,
    lazy: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
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

<<<<<<< HEAD
=======
export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },

});
>>>>>>> e9fe151ecdebde5ccb507fe3b267a7f87168bfb6
