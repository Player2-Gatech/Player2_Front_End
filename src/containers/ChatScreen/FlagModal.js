import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import {
    AppRegistry, StyleSheet, Text, View, Alert,
    Platform, TextInput, Image
} from 'react-native';

import Modal from 'react-native-modalbox'
import CustomButton from '../../components/CustomButton';
import metrics from '../../config/metrics'

export default class FlagModal extends Component {
    state = {
        user: null,
        flagReason: ''
    }
    showFlagModal = (user) => {
        this.setState({user: user})
        this.refs.myModal.open()
    }
    render() {
        const {user, flagReason} = this.state
        return (
            <Modal
                ref={'myModal'}
                style={styles.modal}
                position='center'
                backdrop={true}
                TouchableWithoutFeedback
            >
                <Text style={styles.title}>Enter Flag Reason</Text>
                <View style={styles.flagContainer}>
                  <Image
                      style={styles.flag}
                      source={require('../../images/flag.png')}
                  />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Why is this a fake profile?'
                    value={flagReason}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(text) => this.setState({ flagReason: text})}
                />
                <CustomButton
                    text={'REPORT'}
                    buttonStyle={styles.button}
                    onPress={()=>{
                        if (flagReason.length == 0) {
                            alert("Enter a flag reason!");
                            return;
                        }
                        this.refs.myModal.close()
                    }}
                />
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    borderRadius: Platform.OS === 'ios' ? 30: 0,
    shadowRadius: 10,
    width: metrics.DEVICE_WIDTH * 0.80,
    height: 300
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1976D2',
    marginHorizontal: 8
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: metrics.DEVICE_WIDTH * 0.60,
    height: 50,
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#1976D2'
  },
  flag: {
    width: 50,
    height: 50,
  },
  flagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
})
