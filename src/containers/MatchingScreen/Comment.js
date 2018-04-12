import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { StyleSheet, AppRegistry, ScrollView, View, Text, TextInput, Image } from 'react-native'
import Stars from 'react-native-star-rating'

import CustomButton from '../../components/CustomButton'
import imgProfile from '../../images/logo.png'
import metrics from '../../config/metrics'

export default class Comment extends Component {

    addCommentComponent(comments) {
      if (comments.length > 0) {
        return comments.map((item) => {
            return (
                <View style={styles.commentContainer}>
                    <View style={styles.nameStarContainer}>
                        <Text style={{ alignItems: 'flex-start', fontWeight: 'bold' }} > {item.commenter} </Text>
                        <View style={styles.starContainer}>
                            <Stars
                                disabled={false}
                                maxStars={5}
                                starSize={20}
                                fullStarColor={'#F1C40F'}
                                emptyStarColor={'#F1C40F'}
                                rating={item.rating}
                            />
                        </View>
                    </View>
                    <Text> {item.message} </Text>
                </View>
            );
        });
      } else {
        return (
          <View style={styles.emptyContainer}>
            <Text>{'No comments for this user yet!'}</Text>
          </View>
        )
      }
    }

    render () {
        const { comments } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>{'Comments'}</Text>
                </View>
                { this.addCommentComponent(comments) }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: metrics.DEVICE_WIDTH * 0.95,
    backgroundColor: '#fff',
  },
  sectionTitleContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    fontSize: 14,
    color: '#9B9FA4',
    marginHorizontal: 8,
    textAlign: 'left'
  },
  commentContainer: {
    borderWidth: .8,
    borderRadius: 10,
    borderColor: '#99E7FF',
    padding: 5,
    margin: 5
  },
  emptyContainer: {
    alignItems: 'center',
  },
  nameStarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})
AppRegistry.registerComponent('AwesomeProject', () => HomeScreen);
