import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Alert,
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/Colors';
import Input from '../components/Input';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedValve, setSelectedValue] = useState(null);
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === null || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid Number!', 'Number has to between 0 to 99', [
        { text: 'Ok', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }

    setConfirmed(true);
    setSelectedValue(chosenNumber);
    setEnteredValue('');
  };
  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text> Choosen Number : {selectedValve}</Text>;
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}> Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text> Select A number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Reset"
              onPress={resetInputHandler}
              color={Colors.secondary}
            />
            <Button
              title="Confirm"
              onPress={confirmInputHandler}
              color={Colors.primary}
            />
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
  },
  summaryContainer: {
    margin: 10,
  },
});
