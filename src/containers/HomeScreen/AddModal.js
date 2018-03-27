import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import {
    AppRegistry, StyleSheet, Text, View, Alert,
    Platform, TextInput, Image
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import Modal from 'react-native-modalbox'
import CustomButton from '../../components/CustomButton';
import metrics from '../../config/metrics'

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: '',
            gameTitle:'',
            ignIdentifier:'',
            myPosition: '',
            duoPosition: '',
            gameUsername: '',
            roleList: ''
        };
    }
    showAddModal(modalTitle, gameTitle, ignIdentifier, roleList) {
        this.setState({modalTitle : modalTitle});
        this.setState({gameTitle : gameTitle});
        this.setState({ignIdentifier : ignIdentifier});
        this.setState({roleList : roleList});
        this.refs.myModal.open();
    }
    onPlayerRoleSelected(text) {
      this.setState({myPosition : text});
    }

    onPartnerRoleSelected(text) {
      this.setState({duoPosition : text});
    }

    render() {
        const { myPosition, duoPosition, gameUsername, roleList, ignIdentifier, gameTitle} = this.state
        var images = {
          'League of Legends': require('../../images/lolicon.jpeg'),
          'Overwatch': require('../../images/overwatchicon.png'),
          'World of Warcraft': require('../../images/wowicon.png')
        }
        var data = []
        for (var i = 0; i < roleList.length; i++) {
          data.push({value : roleList[i]})
        }

        return (
            <Modal
                ref={'myModal'}
                style={styles.modal}
                backdrop={true}
                position='top'
                onClosed={() => {
                }}
            >
                <TextInput editable={false} underlineColorAndroid='transparent' defaultValue={this.state.modalTitle} style={styles.title}></TextInput>
                <Image style={styles.gameIcon} source={images[this.state.gameTitle]} resizeMode='contain'/>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder={'Enter your ' + this.state.ignIdentifier}
                    value={gameUsername}
                    onChangeText={(text) => this.setState({ gameUsername: text})}
                />
                <View style={styles.dropDownContainer}>
                  <View style={styles.dropDownMenu}>
                    <Dropdown
                      style={styles.dropDownMenu}
                      label='Your Role'
                      data={data}
                      onChangeText={this.onPlayerRoleSelected.bind(this)}/>
                  </View>
                  <View style={styles.dropDownMenu}>
                    <Dropdown
                      style={styles.dropDownMenu}
                      label='Partner Role'
                      data={data}
                      onChangeText={this.onPartnerRoleSelected.bind(this)}/>
                  </View>
                </View>
                <CustomButton
                    text={'SUBMIT'}
                    buttonStyle={styles.button}
                    onPress={()=>{
                        if (gameUsername.length == 0 || myPosition.length == 0 || duoPosition.length == 0) {
                            Alert.alert("Please fill out all of the fields!");
                            return;
                        }
                        this.props.parentScreen._onSubmitModal(myPosition, duoPosition, gameUsername, gameTitle)
                        this.refs.myModal.close();
                    }}
                />
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: Platform.OS === 'ios' ? 30: 0,
    shadowRadius: 10,
    width: metrics.DEVICE_WIDTH * 0.95,
    height: metrics.DEVICE_HEIGHT * 0.60,
    paddingTop: 30,
    paddingBottom: 30,
  },

  gameIcon: {
    alignSelf: 'center',
    height: 65,
    width: 65,
  },
  title: {
    flex:1,
    fontSize: 20,
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
    marginTop: 50,
    backgroundColor: '#1976D2'
  },
  dropDownContainer: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row'
  },
  dropDownMenu: {
    flex:1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  },
})
