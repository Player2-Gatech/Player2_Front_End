import React, { Component } from 'react'
import { Alert } from 'react-native'

import AuthScreen from './src/containers/AuthScreen'
import HomeScreen from './src/containers/HomeScreen'

global.baseUrl = "http://ec2-34-203-205-241.compute-1.amazonaws.com"

export class LoginAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, // Is the user authenticated?
      isLoading: false, // Is the user loggingIn/signinUp?
      isAppReady: false, // Has the app completed the login animation?
      authKey: null,
    }
  }

  _simulateLogin = (username, password) => {

    const base64 = require('base-64')
    fetch(baseUrl + "/api/token", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(username+":"+password)
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        checker = Object.keys(responseJson)[0];
        if (checker == "message") {
          Alert.alert('Error', 'Invalid username or password!')
        } else {

          this.setState({ authKey: responseJson.token })
          //console.log(this.state.authKey)
          this.setState({ isLoading: true })
          setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }

  _simulateSignup = (username, password, confirmPassword) => {
    const base64 = require('base-64')
    if (password == confirmPassword) {
        let body = JSON.stringify({
            'email': username,
            'password': password,
        })
        fetch(baseUrl + "/api/player", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: body
        })
        .then((response) => response.json())
        .then((responseJson) => {
            checker = Object.keys(responseJson)[0];
            if (checker == "message") {
              Alert.alert("Error", "That email is in use!")
            } else {
              this.setState({ isLoading: true })
              setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
            }
        })
        .catch((error) => {
            console.error(error);
        });
        fetch(baseUrl + "/api/token", {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(username+":"+password)
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ authKey: responseJson.token})
        })
        .catch((error) => {
          console.error(error);
        });


    } else {
        Alert.alert("Error", 'The passwords do not match!')
    }
  }

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render () {

    if (this.state.isAppReady) {
      return (
        <HomeScreen
          authKey={this.state.authKey}
          logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
        />
      )
    } else {
      return (
        <AuthScreen
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      )
    }
  }
}

export default LoginAnimation
