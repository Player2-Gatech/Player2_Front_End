import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/profileicon.png'
import metrics from '../../config/metrics'

export default class HomeScreen extends Component {
    static propTypes = {
        logout: PropTypes.func
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text>My Profile</Text>
                    </View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.img} source={imgProfile}/>
                        <View style={styles.informationContainer}>
                            <View style={styles.usernameContainer}>
                                <Text>Username : </Text>
                                <TextInput placeholder="username"
                                    style={styles.usernameInput} />
                            </View>
                            <View style={styles.usernameContainer}>
                                <Text>Bio :</Text>
                                <TextInput placeholder="bio" multiline={true}
                                    style={styles.bioInput} />
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal={true} style={styles.gameIconContainer}>
                        <Image style={styles.gameIcon}
                            source={require('../../images/lolicon.jpeg')}/>
                        <Image style={styles.gameIcon}
                            source={require('../../images/overwatchicon.png')}/>
                        <Image style={styles.gameIcon}
                            source={require('../../images/diabloicon.png')}/>
                        <Image style={styles.gameIcon}
                            source={require('../../images/dotaicon.jpeg')}/>
                        <Image style={styles.gameIcon}
                            source={require('../../images/plugicon.png')}/>
                    </ScrollView>
                    <CustomButton
                        text={'Logout'}
                        onPress={this.props.logout}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
                <View style={styles.redView}>
                    <Text>Username :</Text>
                    <Text>Bio :</Text>
                    <Text>Yellow</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    //justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    width: metrics.DEVICE_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 40
  },
  img: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    height: 100
  },
  informationContainer: {
    flex: 2,
    marginLeft: 10,
    marginRight: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    //backgroundColor: 'yellow'
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5
  },
  usernameInput: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'rgb(236, 240, 241)',
    borderRadius: 25,
    color: '#3498db',
    textAlign: 'center'
  },
  bioInput: {
    flex: 4,
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'rgb(236, 240, 241)',
    borderRadius: 25,
    color: '#3498db',
    textAlign: 'center',
    padding: 4
  },
  gameIconContainer: {
    marginTop: 16,
    padding:10
  },
  gameIcon: {
    width: 50,
    height: 50
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  redView: {
    height: 1000,
    justifyContent: 'flex-end',
    backgroundColor: 'red'
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
