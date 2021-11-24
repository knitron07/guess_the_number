import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
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
  const [rounds, setRounds] = useState(0);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandonNumber(1, 100, props.userChoice),
  );
  const low = useRef(1);
  const high = useRef(100);
  const nextGuessHandler = (direction) => {
    console.log(currentGuess, props.userChoice);
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
      console.log(newGuessNumber);
      setCurrentGuess(newGuessNumber);
      setRounds((currentRounds) => currentRounds + 1);
    } else {
      Alert.alert("Don't cheat", "Don't cheat in your life or in game....! ");
    }
  };
  const { userChoice, gameOverHandler } = props;
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.gameOverHandler(rounds);
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
});
