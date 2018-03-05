import React, { Component } from 'react'
import { Alert } from 'react-native'

import AuthScreen from './src/containers/AuthScreen'
import HomeScreen from './src/containers/HomeScreen'

export class LoginAnimation extends Component {
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  }

  _simulateLogin = (username, password) => {
    // TODO replace alert to login logic

    const base64 = require('base-64')
    fetch("http://ec2-35-171-161-209.compute-1.amazonaws.com/api/token", {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + base64.encode(username+":"+password)
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
        checker = Object.keys(responseJson)[0];
        if (checker == "message") {
          Alert.alert('Error', 'Invalid username or password!')
        } else {
          this.setState({ isLoading: true })
          setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
        }
    })
    .catch((error) => {
        console.error(error);
    });
  }

  _simulateSignup = (username, password, confirmPassword) => {
    // TODO replace alert to signup logic
    if (password == confirmPassword) {
        let body = JSON.stringify({
            'email': username,
            'password': password,
        })
        fetch("http://ec2-35-171-161-209.compute-1.amazonaws.com/api/player", {
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
