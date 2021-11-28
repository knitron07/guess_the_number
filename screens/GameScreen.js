import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
const generateRandonNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  if (randomNumber === exclude) {
    return generateRandonNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};
const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandonNumber(1, 100, props.userChoice),
  );
  const [guessStreek, setGuessStreek] = useState([]);
  const low = useRef(1);
  const high = useRef(100);
  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess > props.userChoice) ||
      (direction === 'greater' && currentGuess < props.userChoice)
    ) {
      if (direction === 'lower') {
        high.current = currentGuess;
      } else {
        low.current = currentGuess;
      }

      const newGuessNumber = generateRandonNumber(
        low.current,
        high.current,
        currentGuess,
      );
      setGuessStreek((prev) => [currentGuess, ...prev]);
      setCurrentGuess(newGuessNumber);
    } else {
      Alert.alert("Don't cheat", "Don't cheat in your life or in game....! ");
    }
  };
  const { userChoice, gameOverHandler } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.gameOverHandler(guessStreek.length);
    }
  }, [gameOverHandler, currentGuess, userChoice]);

  return (
    <View style={styles.screen}>
      <Text>Your Guess is ...</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonConatiner}>
        <Button title="-" onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title="+" onPress={nextGuessHandler.bind(this, 'greater')} />
      </Card>
      <View style={styles.guessContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {guessStreek.map((guess, idx) => (
            <View key={idx} style={styles.guess}>
              <Text>#{guessStreek.length - idx}</Text>
              <Text>{guess}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
  guessContainer: {
    flex: 1,
    width: Dimensions.get('window').width < 600 ? '80%' : '60%',
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  guess: {
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
