import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions/deck'
import Button from './Button'
import { lightGray, white, gray } from '../utils/colors'

class AddDeck extends Component {
  state = {
    text: ''
  }

  handleChangeText = (text) => {
    this.setState((previousState) => ({
      ...previousState,
      text,
    }))
  }

  handleSubmit = () => {
    const { text } = this.state
    const { dispatch, navigation } = this.props

    if (!text || !text.trim().length) {
      return Alert.alert('Deck Title can not be empty')
    }

    dispatch(addDeck({
      [text]: {
        title: text,
        questions: [],
      },
    }))
    navigation.replace('Deck', { deck: text })
    submitDeck(text)
  }

  render() {
    const { text } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={64}
      >
        <View style={styles.form}>
          <Text style={styles.title}>Deck Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChangeText}
            placeholder='Deck title'
            value={text}
          />
        </View>
        <View style={styles.button}>
          <Button style={styles.button} onPress={this.handleSubmit}>
            Add Deck
          </Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: lightGray,
    padding: 20,
    alignItems: 'stretch',
  },
  form: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingBottom: 20
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
  },
  input: {
    fontSize: 20,
    backgroundColor: white,
    borderRadius: 5,
    padding: 20,
    marginTop: 30,
    alignSelf: 'stretch',
    paddingBottom: 20
  },
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: gray,
    borderRadius: 5,
    fontSize: 18,
  }
})

export default connect()(AddDeck)