import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { gray, lightGray, white } from '../utils/colors'
import Button from './Button'

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params

    return {
      title: `${deck} Deck`,
    }
  }

  handleStartQuiz = () => {
    const { deck, navigation } = this.props;

    if (deck.questions.length === 0) {
      return Alert.alert('Deck is empty');
    }

    navigation.navigate('Quiz', { deck: deck.title });
  }

  render() {
    const { deck, navigation } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>
            {deck.title}
          </Text>
          <Text style={styles.deckDescription}>
            {deck.questions.length} cards
          </Text>
        </View>
        <Button style={styles.button} onPress={() => navigation.navigate('AddCard', { deck: deck.title })}>
          Add Card
        </Button>
        <Button style={styles.button} onPress={this.handleStartQuiz}>
          Start Quiz
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightGray,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  deck: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    borderRadius: 18,
    padding: 20,
    margin: 20
  },
  deckTitle: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  deckDescription: {
    fontSize: 16,
    color: gray,
    paddingBottom: 15,
  },
  button: {
    alignSelf: 'stretch',
    margin: 10,
  }
})

function mapStateProps(decks, { navigation }) {
  const { deck } = navigation.state.params

  return {
    deck: decks[deck]
  }
}

export default connect(mapStateProps)(Deck)