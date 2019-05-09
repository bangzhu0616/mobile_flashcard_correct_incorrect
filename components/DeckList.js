import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { receiveDecks } from '../actions/deck'
import Button from './Button'
import { fetchDecks } from '../utils/api'
import { gray, lightGray, white } from '../utils/colors'

class DeckList extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState(() => ({ ready: true }))
      })
  }

  render() {
    const { decks, navigation } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return (
        <AppLoading />
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'stretch'}}>
          <View style={styles.deckList}>
            {Object.keys(decks).map((deck) => {
              const { title, questions } = decks[deck];

              return (
                <TouchableOpacity
                  key={deck}
                  onPress={() => navigation.navigate('Deck', { deck })}
                  style={styles.deck}>
                  <Text>
                    {title}
                  </Text>
                  <Text>
                    {questions.length} cards
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.button}>
          <Button style={styles.button} onPress={() => navigation.navigate('AddDeck')}>
            Add Deck
          </Button>
        </View>
      </View>
  )}
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: lightGray,
        padding: 20,
        alignItems: 'stretch',
    },
    deckList: {
      flex: 1,
    },
    deck: {
      fontSize: 18,
      backgroundColor: white,
      margin: 10,
      padding: 20,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
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

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DeckList)