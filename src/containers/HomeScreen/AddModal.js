import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import {
    AppRegistry, StyleSheet, Text, View, Alert,
    Platform, TextInput,
} from 'react-native';

import Modal from 'react-native-modalbox'
import CustomButton from '../../components/CustomButton';
import metrics from '../../config/metrics'

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myPosition: '',
            duoPosition: '',
            gameUsername: '',
        };
    }
    showAddModal = () => {
        this.refs.myModal.open();
    }
    render() {
        const { myPosition, duoPosition, gameUsername } = this.state
        return (
            <Modal
                ref={'myModal'}
                style={styles.modal}
                position='center'
                backdrop={true}
                onClosed={() => {
                    this.props.parentScreen._onSubmitModal(myPosition, duoPosition, gameUsername)
                }}
            >
                <Text style={styles.title}>Set Options</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    value={gameUsername}
                    onChangeText={(text) => this.setState({ gameUsername: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder='My Position'
                    value={myPosition}
                    onChangeText={(text) => this.setState({ myPosition: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Duo Position'
                    value={duoPosition}
                    onChangeText={(text) => this.setState({ duoPosition: text})}
                />
                <CustomButton 
                    text={'SUBMIT'}
                    buttonStyle={styles.button}
                    onPress={()=>{
                        if (gameUsername.length == 0 || myPosition.length == 0 || duoPosition.length == 0) {
                            //alert("You must fill the options.");
                            //return;
                        }
                        this.refs.myModal.close();
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
    borderRadius: 16,
    backgroundColor: '#1976D2'
  },
})
