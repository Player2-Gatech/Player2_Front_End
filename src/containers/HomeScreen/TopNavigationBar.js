import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import {
    AppRegistry,
    StyleSheet,
    Text,Image,
    View, 
    TouchableOpacity,
} from 'react-native';
import NavigationBar from 'navigationbar-react-native';
 
const ComponentLeft = ({ editMode, editModeFunc }) => {
    return(
        <View style={{ flex: 1, alignItems: 'flex-start'}} >
            <TouchableOpacity
                style={{justifyContent:'center', flexDirection: 'row'}}
                onPress={() => editModeFunc(editMode)}
            >
                <Image 
                    source = {require('../../images/backIcon.png')}
                    style  = { styles.icon }
                />
                <Text style={{ color: 'white', }}></Text>
            </TouchableOpacity>
        </View>
    );
};
 
const ComponentProfileCenter = () => {
    return(
        <View style={{ flex: 1, }}>
            <Text style={ styles.title }>Profile</Text>
        </View>
    );
};

const ComponentSelectGameCenter = () => {
    return(
        <View style={{ flex: 1, }}>
            <Text style={ styles.title }>Select Game</Text>
        </View>
    );
};

const ComponentAddGameCenter = () => {
    return(
        <View style={{ flex: 1, }}>
            <Text style={ styles.title }>Add Game</Text>
        </View>
    );
};
 
const ComponentProfileRight = ({ editMode, editModeFunc }) => {
    return(
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
            <TouchableOpacity onPress={() => editModeFunc(editMode)}>
                <Image 
                    source = { require('../../images/pencilIcon.png') }
                    style  = { styles.icon }
                />
                
            </TouchableOpacity>
        </View>
    );
};
 
export default class TopNavigationBar extends Component {
    static propTypes = {
        editMode: PropTypes.bool.isRequired,
        editModeFunc: PropTypes.func.isRequired,
        editGame: PropTypes.bool.isRequired,
        editGameFunc: PropTypes.func.isRequired,
        addGame: PropTypes.bool.isRequired,
        addGameFunc: PropTypes.func.isRequired,
    }
    render() {
        const { editMode, editModeFunc, editGame, editGameFunc, addGame, addGameFunc } = this.props
        if (!editMode) {
            return (
                <NavigationBar 
                    componentLeft     =     {<ComponentLeft
                                                    editMode={ editMode }
                                                    editModeFunc={ editModeFunc }/>}
                    componentCenter   =     {<ComponentProfileCenter />}
                    navigationBarStyle=     {{ backgroundColor: '#1976D2' }}
                    statusBarStyle    =     {{ barStyle: 'light-content', backgroundColor: '#1976D2' }}
                />
            );
        } else {
            if (!editGame) {
                return (
                    <NavigationBar 
                        componentCenter   =     {<ComponentProfileCenter />}
                        componentRight    =     {<ComponentProfileRight
                                                        editMode={ editMode }
                                                        editModeFunc={ editModeFunc }/>}
                        navigationBarStyle=     {{ backgroundColor: '#1976D2' }}
                        statusBarStyle    =     {{ barStyle: 'light-content', backgroundColor: '#1976D2' }}
                    />
                );
            } else {
                if (addGame) {
                    return (
                        <NavigationBar 
                            componentLeft     =     {<ComponentLeft
                                                            editMode={ addGame }
                                                            editModeFunc={ addGameFunc }/>}
                            componentCenter   =     {<ComponentAddGameCenter />}
                            navigationBarStyle=     {{ backgroundColor: '#1976D2' }}
                            statusBarStyle    =     {{ barStyle: 'light-content', backgroundColor: '#1976D2' }}
                        />
                    );
                } else {
                    return (
                        <NavigationBar 
                            componentLeft     =     {<ComponentLeft
                                                            editMode={ editGame }
                                                            editModeFunc={ editGameFunc }/>}
                            componentCenter   =     {<ComponentSelectGameCenter />}
                            navigationBarStyle=     {{ backgroundColor: '#1976D2' }}
                            statusBarStyle    =     {{ barStyle: 'light-content', backgroundColor: '#1976D2' }}
                        />
                    );
                }
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        resizeMode: 'contain',
        tintColor: 'white',
        width: 20,
        height: 20,
        marginHorizontal: 16,
        alignSelf: 'center' 
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center' 
    }
})
