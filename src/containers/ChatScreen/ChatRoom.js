import React, { Component } from 'react';
import io from 'react-native-socket.io-client';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image, Alert
} from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { users, pendingUsers } from '../../config/data';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props.navigation.state.params;
    this.state = {
      messages: [],
      user: {
        _id: user.idA
      }
    };
    this.roomName = Math.min(user.idA, user.idB).toString() + Math.max(user.idA, user.idB).toString();

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    //this._getMessages();

    this.socket = io('http://ec2-34-203-205-241.compute-1.amazonaws.com:8001');
    //this.socket = io('128.61.28.235:8001');
    this.socket.emit('join', {room: this.roomName});
    this.socket.on('from_server', this.onReceivedMessage);
  }

  onSend = (message) => {
    this.socket.emit('room_send', {message: message[0], room: this.roomName});
      let body = json.stringify({
        'text': message,
        'createdAt': new Date(),
      });
      const base64 = require('base-64')
      fetch(baseUrl + "/api/chat?roomName" + this.roomName, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(authKey+":")
          },
          body: body
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
      })
      .catch((error) => {
          console.error(error)
      });
  };

  onReceivedMessage = (message) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message)
      };
    });
  }

  _getMessages = () => {
      const base64 = require('base-64')
      fetch(baseUrl + "/api/chat?roomName=" + this.roomName, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(authKey+":")
          },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('CHAT RESPONSE: ', responseJson)
        this.setState({
          messages: responseJson.chats.sort({
            createdAt: -1
          })
        })
      })
      .catch((error) => {
          console.error(error)
      });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ccc',
          },
        }}
      />
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        user={this.state.user}
        onSend={this.onSend}
        renderBubble={this.renderBubble.bind(this)}
        renderAvatar={null}
      />
    );
  }
}

export default ChatRoom;
