import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatSeconds, parseTimeToSeconds } from '../utils/time';

interface TimerProps {
  initialTime: string;
  onComplete?: () => void;
}

export default function Timer({ initialTime, onComplete }: TimerProps) {
  const initialSeconds = parseTimeToSeconds(initialTime);
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onComplete]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setSecondsLeft(initialSeconds);
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeDisplay}>{formatSeconds(secondsLeft)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning && styles.buttonStop]}
          onPress={toggleTimer}
        >
          <Text style={styles.buttonText}>{isRunning ? 'Pausar' : 'Iniciar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 16,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#d4a574',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: '#d4a574',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonStop: {
    backgroundColor: '#ff6b6b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
