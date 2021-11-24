import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOverScreen';
import AppLoading from 'expo-app-loading';

//loading fonts in app
import * as Font from 'expo-font';
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (dataLoaded === false) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };
  let content = <StartGameScreen startGameHandler={startGameHandler} />;
  content = (
    <GameOverScreen
      numberOfRounds={4}
      userNumber={5}
      onRestart={configureNewGameHandler}
    />
  );

  // if (userNumber && guessRounds <= 0) {
  //   content = (
  //     <GameScreen userChoice={userNumber} gameOverHandler={gameOverHandler} />
  //   );
  // } else if (guessRounds > 0) {
  //   content = (
  //     <GameOverScreen
  //       numberOfRounds={guessRounds}
  //       userNumber={userNumber}
  //       onRestart={configureNewGameHandler}
  //     />
  //   );
  // }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
