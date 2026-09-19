import React from 'react';
import { Text as MockText } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import StrategiesScreen from './StrategiesScreen';

jest.mock('../../data/strategies.json', () => [
  { id: '1', civ: 'Mock Civ A', strategy: 'Mock Strategy A', timing: '10:00' },
  { id: '2', civ: 'Mock Civ B', strategy: 'Mock Strategy B', timing: '20:00' },
]);

jest.mock('../../components/BuildOrderCard', () => {
  return function MockBuildOrderCard({ id, civ }: { id: string; civ: string }) {
    return <MockText>{`${id}-${civ}`}</MockText>;
  };
});

describe('StrategiesScreen', () => {
  it('renders one BuildOrderCard per strategy, passing its id and civ', () => {
    render(<StrategiesScreen />);

    expect(screen.getByText('1-Mock Civ A')).toBeTruthy();
    expect(screen.getByText('2-Mock Civ B')).toBeTruthy();
  });
});
