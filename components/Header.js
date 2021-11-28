import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Colors from '../constants/Colors';
const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomColor: Platform.OS === 'ios' ? 'grey' : 'white',
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
    alignItems: 'center',
  },
  headerTitle: {
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
    fontSize: 25,
  },
});
