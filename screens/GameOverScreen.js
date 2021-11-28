import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Game is over</Text>
      <View style={styles.imageConainer}>
        <Image
          //source={require('../assets/success.png')}
          source={{
            uri: 'https://fsb.zobj.net/crop.php?r=eSAss8jYsSW8QOcDzzXP-rXsaVlHA07wshHxz7Z3C0hcDTQ-0Q05e7ZjpT1j4ObOniYMe-ZzO2bbnfvyw3FUqzHpKR27LtcqLAAxsYaz6tqQQW7AQKDEuNlcERQe6X4slXSmEZ_evXjWs5RzwnbQknanPIanqCCWjgpuX9ZBNW1Gxef142u7VxsTC9Khe-ZLsdZyqYVGEftkU3Da',
          }}
          style={styles.image}
        />
      </View>
      <Text>Number of rounds : {props.numberOfRounds}</Text>
      <Text>Number was : {props.userNumber}</Text>
      <Button title="New Game" onPress={props.onRestart} />
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageConainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

