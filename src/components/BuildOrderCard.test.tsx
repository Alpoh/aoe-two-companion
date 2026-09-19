import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import BuildOrderCard from './BuildOrderCard';
import { isFavorite, addFavorite, removeFavorite } from '../utils/storage';

jest.mock('../utils/storage');

const mockIsFavorite = isFavorite as jest.Mock;
const mockAddFavorite = addFavorite as jest.Mock;
const mockRemoveFavorite = removeFavorite as jest.Mock;

describe('BuildOrderCard', () => {
  beforeEach(() => {
    mockIsFavorite.mockResolvedValue(false);
    mockAddFavorite.mockResolvedValue(undefined);
    mockRemoveFavorite.mockResolvedValue(undefined);
  });

  it('renders the civilization, strategy, and timing', async () => {
    render(<BuildOrderCard id="1" civ="Britons" strategy="Feudal Scout Rush" timing="14:30" />);

    expect(screen.getByText('Britons')).toBeTruthy();
    expect(screen.getByText('Feudal Scout Rush')).toBeTruthy();
    expect(screen.getByText('⏱️ 14:30')).toBeTruthy();
    await waitFor(() => expect(mockIsFavorite).toHaveBeenCalledWith('1'));
  });

  it('shows an empty star when the strategy is not favorited', async () => {
    render(<BuildOrderCard id="1" civ="Britons" strategy="Feudal Scout Rush" timing="14:30" />);

    await waitFor(() => expect(screen.getByText('☆')).toBeTruthy());
  });

  it('shows a filled star when the strategy is already favorited', async () => {
    mockIsFavorite.mockResolvedValue(true);

    render(<BuildOrderCard id="1" civ="Britons" strategy="Feudal Scout Rush" timing="14:30" />);

    await waitFor(() => expect(screen.getByText('⭐')).toBeTruthy());
  });

  it('adds the strategy to favorites when the empty star is pressed', async () => {
    render(<BuildOrderCard id="1" civ="Britons" strategy="Feudal Scout Rush" timing="14:30" />);
    await waitFor(() => expect(screen.getByText('☆')).toBeTruthy());

    fireEvent.press(screen.getByText('☆'));

    await waitFor(() => expect(screen.getByText('⭐')).toBeTruthy());
    expect(mockAddFavorite).toHaveBeenCalledWith('1');
  });

  it('removes the strategy from favorites when the filled star is pressed', async () => {
    mockIsFavorite.mockResolvedValue(true);
    render(<BuildOrderCard id="1" civ="Britons" strategy="Feudal Scout Rush" timing="14:30" />);
    await waitFor(() => expect(screen.getByText('⭐')).toBeTruthy());

    fireEvent.press(screen.getByText('⭐'));

    await waitFor(() => expect(screen.getByText('☆')).toBeTruthy());
    expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
  });
});
