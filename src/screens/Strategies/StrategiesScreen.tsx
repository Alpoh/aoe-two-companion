import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import strategies from '../../data/strategies.json';
import BuildOrderCard from '../../components/BuildOrderCard';

export default function StrategiesScreen() {
  return (
    <ScrollView style={styles.container}>
      {strategies.map((strat) => (
        <BuildOrderCard
          key={strat.id}
          id={strat.id}
          civ={strat.civ}
          strategy={strat.strategy}
          timing={strat.timing}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
});
