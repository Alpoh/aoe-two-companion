import React from 'react';
import { View, Text } from 'react-native';

export default function CalculatorScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Calculator</Text>
    </View>
  );
}
