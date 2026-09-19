import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BuildOrderCardProps {
  civ: string;
  strategy: string;
  timing: string;
}

export default function BuildOrderCard({ civ, strategy, timing }: BuildOrderCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.civName}>{civ}</Text>
      <Text style={styles.strategy}>{strategy}</Text>
      <Text style={styles.timing}>⏱️ {timing}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a574',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  civName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  strategy: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timing: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
