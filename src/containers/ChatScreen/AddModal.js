import React, { Component } from 'react';
import { PropTypes } from 'prop-types'
import {
    AppRegistry, StyleSheet, Text, View, Alert,
    Platform, TextInput,
} from 'react-native';
import Stars from 'react-native-star-rating'

import Modal from 'react-native-modalbox'
import CustomButton from '../../components/CustomButton';
import metrics from '../../config/metrics'

export default class AddModal extends Component {
    state = {
        comment: '',
        starCount: 0,
        user: null
    }
    showAddModal = (user) => {
        this.setState({user: user})
        this.refs.myModal.open()
    }
    onStarRatingPress(rating) {
        this.setState({starCount: rating})
    }
    onSubmit(user, starCount, comment) {
        this.props.parentScreen._onSubmitModal(user, starCount, comment)
    }
                /*onClosed={() => {
                    this.props.parentScreen._onSubmitModal(starCount, comment)
                }}*/
                        //this.refs.myModal.close();
    render() {
        const { starCount, comment, user} = this.state
        return (
            <Modal
                ref={'myModal'}
                style={styles.modal}
                position='center'
                backdrop={true}
                TouchableWithoutFeedback
            >
                <Text style={styles.title}>Like & Comment</Text>
                <View style={styles.starContainer}>
                    <Stars
                        disabled={false}
                        maxStars={5}
                        fullStarColor={'#F1C40F'}
                        emptyStarColor={'#F1C40F'}
                        rating={starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='Leave Comment'
                    value={comment}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(text) => this.setState({ comment: text})}
                />
                <CustomButton
                    text={'SUBMIT'}
                    buttonStyle={styles.button}
                    onPress={()=>{
                        if (comment.length == 0) {
                            alert("You must fill the options.");
                            return;
                        }
                        this.refs.myModal.close()
                        this.onSubmit(user, starCount, comment)
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
  starContainer: {
    //flex: 1,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
