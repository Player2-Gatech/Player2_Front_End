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
import { GiftedChat } from 'react-native-gifted-chat';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'You wanna duo?',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Other User'
          }
        }
      ],
      userId: 1
    };
    this.roomName = 'roomName';

    this.onReceivedMessage = this.onReceivedMessage.bind(this);

    this.socket = io('http://ec2-34-203-205-241.compute-1.amazonaws.com:8001');
    this.socket.emit('join', {room: 'roomName'});
    this.socket.on('from_server', this.onReceivedMessage);
  }

  onSend = (message) => {
    this.socket.emit('room_send', {message: message[0], room: this.roomName});
  };

  onReceivedMessage = (message) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, message)
      };
    });
  }


  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={this.state.userId}
      />
    );
  }
}

export default ChatRoom;
