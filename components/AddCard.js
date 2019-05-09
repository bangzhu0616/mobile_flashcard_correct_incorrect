import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { submitCard } from '../utils/api'
import { addCard } from '../actions/card'
import Button from './Button'
import { lightGray, white, gray } from '../utils/colors'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: `Add Card to ${deck}`,
    }
  }

  state = {
    question: '',
    answer: '',
  }

  handleChangeQuestion = (text) => {
    this.setState((previousState) => ({
      ...previousState,
      question: text
    }))
  }
  handleChangeAnswer = (text) => {
    this.setState((previousState) => ({
      ...previousState,
      answer: text
    }))
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const { dispatch, navigation } = this.props
    const { deck } = navigation.state.params

    if (!question || !question.trim().length) {
      return Alert.alert('Question can not be empty')
    }

    if (!answer || !answer.trim().length) {
      return Alert.alert('Answer can not be empty')
    }

    const card = {
      question,
      answer,
    }

    dispatch(addCard(deck, card))
    navigation.replace('Deck', { deck: deck })
    submitCard(deck, card)
  }

  render() {
    const { question, answer } = this.state

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80 }
      >
        <View style={styles.form}>
          <Text style={styles.title}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChangeQuestion}
            placeholder='Question'
            value={question}
          />
          <Text style={styles.title}>Answer</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChangeAnswer}
            placeholder='Answer'
            value={answer}
          />
        </View>
        <View style={styles.button}>
          <Button style={styles.button} onPress={this.handleSubmit}>
            Submit
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
    paddingTop: 20
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

export default connect()(AddCard)