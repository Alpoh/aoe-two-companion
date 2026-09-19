import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import strategies from '../../data/strategies.json';
import Timer from '../../components/Timer';

export default function CalculatorScreen() {
  const [firstStrategy] = strategies;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Build Order Timer</Text>
      <Timer initialTime={firstStrategy.timing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#333',
  },
});
