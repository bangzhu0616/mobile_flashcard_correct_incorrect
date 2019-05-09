import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { gray, lightRed, lightGray, white } from '../utils/colors';
import Button from './Button';
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {
  static navigationOptions({ navigation }) {
    const { deck } = navigation.state.params;

    return {
      title: `${deck} Quiz`,
    }
  }

  state = {
    showAnswer: false,
    answeredQuestions: [],
  }

  handleToggleAnswer = () => {
    this.setState((previousState) => ({
      ...previousState,
      showAnswer: !previousState.showAnswer,
    }));
  }

  handeAnswer = (correct) => {
    const { answeredQuestions } = this.state;
    const { questions } = this.props.deck;

    if (answeredQuestions.length === questions.length -1) {
      clearLocalNotifications()
        .then(setLocalNotification);
    }

    this.setState((previousState) => ({
      ...previousState,
      showAnswer: false,
      answeredQuestions: previousState.answeredQuestions.concat(correct),
    }));
  }

  reset = () => {
    this.setState(() => ({
      showAnswer: false,
      answeredQuestions: [],
    }));
  }

  render() {
    const { deck, navigation } = this.props;
    const { showAnswer, answeredQuestions } = this.state;

    const currentCard = deck.questions[answeredQuestions.length];
    if (!currentCard) {
      const correctCount = answeredQuestions.filter((question) => question).length;
      const questionsCount = answeredQuestions.length;
      const correctPercent = Math.round(correctCount / questionsCount * 100);

      return (
        <View style={styles.container}>
          <View style={styles.progress}>
            <Text style={styles.text}>
              completed
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}>
              {correctCount}/{questionsCount} questions correct ({correctPercent}%)
            </Text>
          </View>
          <Button style={styles.button} onPress={this.reset}>
            Restart Quiz
          </Button>
          <Button style={styles.button} onPress={() => navigation.goBack()}>
            Back to Deck
          </Button>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.progress}>
          <Text style={styles.text}>
            {answeredQuestions.length + 1}/{deck.questions.length}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.card}
          onPress={this.handleToggleAnswer}
        >
          <Text style={styles.text}>
            {showAnswer ? currentCard.answer : currentCard.question}
          </Text>
          <Text style={styles.smallText}>
            {showAnswer ? 'Touch to show question' : 'Touch to show answer'}
          </Text>
        </TouchableOpacity>
        <Button style={[styles.button, { backgroundColor: gray }]} onPress={() => this.handeAnswer(true)}>
          Correct
        </Button>
        <Button style={[styles.button, { backgroundColor: lightRed }]} onPress={() => this.handeAnswer(false)}>
          Incorrect
        </Button>
      </View>
    );
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
  progress: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  card: {
    backgroundColor: white,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
  smallText: {
    fontSize: 16,
    color: gray,
  },
  button: {
    padding: 10,
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
  },
})

function mapStateToProps(decks, { navigation }) {
  const { deck } = navigation.state.params;
  return {
    deck: decks[deck],
  }
}
export default connect(mapStateToProps)(Quiz)