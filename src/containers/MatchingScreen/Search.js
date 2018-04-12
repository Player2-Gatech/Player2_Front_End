import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView,
         View, Text, TextInput, Image,
         ActivityIndicator, TouchableOpacity } from 'react-native'
import Slider from "react-native-slider";
import CustomButton from '../../components/CustomButton'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import metrics from '../../config/metrics'

var radio_props = [
  {label: 'Ranked\t', value: true },
  {label: 'Casual', value: false }
];

export default class Search extends Component {
    constructor() {
      super()
      this.state = {
        skillModifier: .6,
        roleModifier: .2,
        commentModifier: .1,
        restrictRanks: true,
        animating: true,
        enableSpinner: false
      }
    }

    //closeActivityIndicator = () => setTimeout(() => this.setState({ animating: false }), 6000)

    //componentDidMount = () => this.closeActivityIndicator()

    getMatches() {
      this.setState({enableSpinner : true})
      // just league for now
      const base64 = require('base-64')
      total = this.state.roleModifier + this.state.commentModifier + this.state.skillModifier
      _skillModifier = this.state.skillModifier / total
      _commentModifier = this.state.commentModifier / total
      _roleModifier = this.state.roleModifier / total
      fetch(baseUrl + `/api/matches?gameTitle=League%20of%20Legends&skillModifier=${_skillModifier}&roleModifier=${_roleModifier}&commentModifier=${_commentModifier}&restrictRanks=${this.state.restrictRanks}`, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(authKey+":")
          }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson)
          this.setState({enableSpinner : false})
          this.props.navigation.navigate("MatchingProfile", { matchingProfiles: responseJson.matches })
      })
    }

    render () {
        const { navigate } = this.props.navigation
        const { enableSpinner, skillModifier, roleModifier, commentModifier, restrictRanks} = this.state
                return (
                <View style={{paddingVertical:20}}>
                  <CustomButton
                      onPress={() => this.getMatches(navigate)}
                      buttonStyle={styles.button}
                      textStyle={styles.buttonText}
                      text={enableSpinner ? '' : 'Search'}
                  />
                </View>
                )
        /*return (
            <View style={styles.container}>
              <View style={styles.mainContainer}>
                <View
                  style={{flex:1}}/>
              <View style={styles.sectionTitleContainer}>
                  <Text style={styles.titleStyle}>{'Configure Your Search'}</Text>
              </View>
                <View
                  style={{flex:1}}/>
                <View style={styles.vertContainer}>
                  <Text style={styles.textStyle}>{'Game Performance'}</Text>
                  <Slider
                    value={this.state.skillModifier}
                    onValueChange={value => this.setState({ skillModifier })}
                    style={styles.slider}
                    trackStyle={customStyles.track}
                    thumbStyle={customStyles.thumb}
                    minimumTrackTintColor='#1976D2'
                    thumbImage={require('../../images/trophy.png')}

                  />
                </View>
                <View style={styles.vertContainer}>
                  <Text style={styles.textStyle}>{'Role Compatbility'}</Text>
                  <Slider
                    value={this.state.roleModifier}
                    onValueChange={value => this.setState({ roleModifier })}
                    style={styles.slider}
                    trackStyle={customStyles.track}
                    thumbStyle={customStyles.thumb}
                    minimumTrackTintColor='#1976D2'
                    thumbImage={require('../../images/sword.png')}
                  />
                </View>
                <View style={styles.vertContainer}>
                  <Text style={styles.textStyle}>{'Feedback Rating'}</Text>
                  <Slider
                    value={this.state.commentModifier}
                    onValueChange={value => this.setState({ commentModifier })}
                    style={styles.slider}
                    trackStyle={customStyles.track}
                    thumbStyle={customStyles.thumb}
                    minimumTrackTintColor='#1976D2'
                    thumbImage={require('../../images/star.png')}
                  />
                </View>
                <View
                  style={{flex:1}}/>
                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => {this.setState({restrictRanks:value})}}
                    formHorizontal={true}
                    labelHorizontal={true}
                    animation={true}
                  />
                <View
                  style={{flex:2}}/>
                <View style={{paddingVertical:20}}>
                  <CustomButton
                      onPress={() => this.getMatches(navigate)}
                      buttonStyle={styles.button}
                      textStyle={styles.buttonText}
                      text={enableSpinner ? '' : 'Search'}
                  />
                </View>
                <View
                  style={{flex:0.5}}/>
              </View>
            </View>
            */
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionTitleContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  titleStyle: {
    fontSize: 18,
    color: '#000',
    marginHorizontal: 30,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  vertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  textStyle: {
    fontSize: 14,
    color: '#9B9FA4',
    marginHorizontal: 30,
    textAlign: 'left'
  },
  button: {
    backgroundColor: '#1976D2',
    height: 60,
    width: 200
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slider: {
    width: metrics.DEVICE_WIDTH * 0.6,
    height: 30
  }
});

var customStyles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E6E6E6'
  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(150, 150, 150, 0.0)',
    borderColor: 'rgba(150, 150, 150, 0.0)'
  }
});
