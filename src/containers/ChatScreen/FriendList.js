import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image, Alert
} from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import imgProfile from '../../images/profileicon.png'

class FriendList extends Component {
  onLearnMore = (user, isPending) => {
    this.props.navigation.navigate('PendingProfile', {screen: 'PendingProfile', user: user, isPending: isPending, updateFriends: this._update});
  };
  // TODO : change navigation to chatting room screen
  onChatting = (user) => {
    this.props.navigation.navigate('ChatScreen', {screen: 'ChatScreen', user:user});
  };

  state = {
    pendingUsers: null,
    friendUsers: null,
    loadingSpinner: true
  }

  componentWillMount() {
    this._getFriends()
  }

  _getFriends = () => {
      const base64 = require('base-64')
      fetch(baseUrl + "/api/playerFriends", {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(authKey+":")
          },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({pendingUsers: responseJson.pending, friendUsers: responseJson.friends, loadingSpinner: false})
      })
      .catch((error) => {
          console.error(error)
      });
  }

  _update = (updatedPending, updatedFriends) => {
    this.setState({pendingUsers: updatedPending, friendUsers: updatedFriends})
  }

  render() {
    const { pendingUsers, friendUsers, loadingSpinner}  = this.state
    if (loadingSpinner) {
      return (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#99E7FF" />
          </View>
      )
    } else {
      return (
        <ScrollView>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{'Duo Requests'}</Text>
            <View style={styles.separatorLine} />
          </View>
          <List containerStyle={{ marginTop: 0}}>
            {pendingUsers.length == 0 &&
              <ListItem
                key={"Empty State"}
                title={"No pending requests!"}
                hideChevron={true}
              />
            }
            {pendingUsers.map((user) => (
              <ListItem
                key={user.friendProfile.user_id}
                roundAvatar
                avatar= {
                  <Avatar
                  rounded
                  source= {user.friendProfile.profilePhoto ? {uri: `data:image/png;base64,${user.friendProfile.profilePhoto}`} : imgProfile}
                  onPress={() => this.onLearnMore(user.friendProfile, true)}
                  />}
                title={user.friendProfile.displayName ? user.friendProfile.displayName : 'Anonymous'}
                subtitle={user.friendProfile.email}
                onPress={() => this.onLearnMore(user.friendProfile, true)}
              />
            ))}
          </List>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>{'Friends List'}</Text>
            <View style={styles.separatorLine} />
          </View>
          <List containerStyle={{ marginTop: 0}}>
            {friendUsers.length == 0 &&
              <ListItem
                key={"Empty State"}
                title={"No friends added!"}
                hideChevron={true}
              />
            }
            {friendUsers.map((user) => (
              <ListItem
                key={user.friendProfile.user_id}
                roundAvatar
                avatar= {
                  <Avatar
                  rounded
                  source= {user.friendProfile.profilePhoto ? {uri: `data:image/png;base64,${user.friendProfile.profilePhoto}`} : imgProfile}
                  onPress={() => this.onLearnMore(user.friendProfile, false)}
                  />}
                title={user.friendProfile.displayName ? user.friendProfile.displayName : 'Anonymous'}
                subtitle={user.friendProfile.email}
                onPress={() => this.onChatting(user.friendProfile)}
              />
            ))}
          </List>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#1976D2'
  },
  separatorText: {
    color: '#1976D2',
    fontWeight: 'bold',
    marginHorizontal: 8
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
})

export default FriendList;
