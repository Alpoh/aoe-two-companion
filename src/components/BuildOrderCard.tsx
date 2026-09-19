import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { addFavorite, isFavorite, removeFavorite } from '../utils/storage';

interface BuildOrderCardProps {
  id: string;
  civ: string;
  strategy: string;
  timing: string;
}

export default function BuildOrderCard({ id, civ, strategy, timing }: BuildOrderCardProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    isFavorite(id).then(setFavorite);
  }, [id]);

  const toggleFavorite = async () => {
    if (favorite) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
    setFavorite(!favorite);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.civName}>{civ}</Text>
        <Text style={styles.strategy}>{strategy}</Text>
        <Text style={styles.timing}>⏱️ {timing}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.starButton}>
        <Text style={styles.starText}>{favorite ? '⭐' : '☆'}</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
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
  starButton: {
    padding: 8,
  },
  starText: {
    fontSize: 24,
  },
});
