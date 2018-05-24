import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';

const styles = StyleSheet.create({
  hamburger: {
    backgroundColor: '#fdfdfd',
    position: 'absolute',
    top: 50,
    left: 30,
    height: 60,
    width: 60,
    zIndex: 2,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowRadius: 15,
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  burgerLineContainer: {
    padding: 10,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  burgerLine: {
    width: '100%',
    height: 8,
    backgroundColor: '#343434',
    borderRadius: 30,
  },
});


export default Hamburger = ({
  onClick,
}) => (
  <TouchableHighlight style={styles.hamburger} onPress={onClick}>
    <View style={styles.burgerLineContainer}>
      <Text style={styles.burgerLine}></Text>
      <Text style={styles.burgerLine}></Text>
      <Text style={styles.burgerLine}></Text>
    </View>
  </TouchableHighlight>
)