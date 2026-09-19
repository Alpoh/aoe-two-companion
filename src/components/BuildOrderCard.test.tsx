import React from 'react';
import { render, screen } from '@testing-library/react-native';
import BuildOrderCard from './BuildOrderCard';

describe('BuildOrderCard', () => {
  it('renders the civilization, strategy, and timing', () => {
    render(<BuildOrderCard civ="Britons" strategy="Feudal Scout Rush" timing="14:30" />);

    expect(screen.getByText('Britons')).toBeTruthy();
    expect(screen.getByText('Feudal Scout Rush')).toBeTruthy();
    expect(screen.getByText('⏱️ 14:30')).toBeTruthy();
  });
});
