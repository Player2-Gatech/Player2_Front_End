import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native'
import { Image, View } from 'react-native-animatable'

import imgLogo from '../../images/logo.png'
import metrics from '../../config/metrics'

import Opening from './Opening'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

export default class AuthScreen extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onLoginAnimationCompleted: PropTypes.func.isRequired
  }

  state = {
    visibleForm: null // Can be: null | SIGNUP | LOGIN
  }

  componentWillUpdate (nextProps) {         // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _hideAuthScreen = async () => {
    await this._setVisibleForm(null)        // 1. Slide out the form container
    await this.logoImgRef.fadeOut(800)      // 2. Fade out the logo
    this.props.onLoginAnimationCompleted()  // 3. Tell the container (app.js) that the animation has completed
  }

  _setVisibleForm = async (visibleForm) => {
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {  // 1. Hide the current form (if any)
      await this.formRef.hideForm()
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)           // 2. Configure a spring animation for the next step
    this.setState({ visibleForm })                                          // 3. Set the new visible form
  }

  render () {
    const { isLoggedIn, isLoading, signup, login } = this.props
    const { visibleForm } = this.state
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }
    return (
      <View style={styles.container}>
        <Image
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={(ref) => this.logoImgRef = ref}
          style={styles.logoImg}
          source={imgLogo}
        />
        {(!visibleForm && !isLoggedIn) && (
          <Opening
            onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
        >
          {(visibleForm === 'SIGNUP') && (
            <SignupForm
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignupPress={signup}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'LOGIN') && (
            <LoginForm
              ref={(ref) => this.formRef = ref}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onLoginPress={login}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: '#1976D2',
  }
})
