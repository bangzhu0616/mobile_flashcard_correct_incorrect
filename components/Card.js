import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

class Card extends Component {
  render() {
    return (
      <View>
        <Text>Card</Text>
      </View>
    )
  }
}

export default connect()(Card)