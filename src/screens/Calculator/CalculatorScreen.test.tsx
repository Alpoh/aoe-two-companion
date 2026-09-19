import React from 'react';
import { Text as MockText } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import CalculatorScreen from './CalculatorScreen';

jest.mock('../../data/strategies.json', () => [
  { id: '1', civ: 'Mock Civ', strategy: 'Mock Strategy', timing: '5:00', steps: [] },
]);

jest.mock('../../components/Timer', () => {
  return function MockTimer({ initialTime }: { initialTime: string }) {
    return <MockText>{initialTime}</MockText>;
  };
});

describe('CalculatorScreen', () => {
  it('renders a Timer initialized with the first strategy timing', () => {
    render(<CalculatorScreen />);

    expect(screen.getByText('5:00')).toBeTruthy();
  });
});
