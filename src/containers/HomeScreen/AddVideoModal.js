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

export default class AddVideoModal extends Component {
	constructor(props) {
        super(props);
        this.state = {
            modalTitle: '',
            videoUrl: '',
        };
    }


    showAddVideoModal(modalTitle, videoUrl) {
        this.setState({modalTitle: modalTitle});
    	this.setState({videoUrl: videoUrl});
        this.refs.myVideoModal.open();
    }

    render() {
    	const { modalTitle, videoUrl } = this.state
    	var image = {
    		'Youtube': require('../../images/youtubeicon.png'),
    	}
    	return (
    		<Modal
                ref={'myVideoModal'}
                style={styles.modal}
                backdrop={true}
                position='center'
                onClosed={() => {
                }}
            >
            	<TextInput editable={false} underlineColorAndroid='transparent' defaultValue={modalTitle} style={styles.title}></TextInput>
                <Image style={styles.youtubeIcon} source={image['Youtube']} resizeMode='contain'/>
                <TextInput
                    style={styles.input}
                    autoCapitalize={"none"}
                    underlineColorAndroid='transparent'
                    placeholder={'Enter the youtube code'}
                    value={videoUrl}
                    onChangeText={(text) => this.setState({ videoUrl: text})}
                />
                <CustomButton
                    text={'SUBMIT'}
                    buttonStyle={styles.button}
                    onPress={()=>{
                        if (videoUrl.length == 0) {
                            Alert.alert("Please link a video!");
                            return;
                        }
                        this.props.parentScreen._onSubmitVideoModal(videoUrl)
                        this.refs.myVideoModal.close();
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
  youtubeIcon: {
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
})
