import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from './storage';

describe('storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  describe('getFavorites', () => {
    it('returns an empty array when nothing is stored', async () => {
      expect(await getFavorites()).toEqual([]);
    });

    it('returns the stored favorite ids', async () => {
      await AsyncStorage.setItem('@aoe2_favorites', JSON.stringify(['1', '2']));

      expect(await getFavorites()).toEqual(['1', '2']);
    });
  });

  describe('addFavorite', () => {
    it('adds an id to an empty favorites list', async () => {
      await addFavorite('1');

      expect(await getFavorites()).toEqual(['1']);
    });

    it('does not duplicate an id already favorited', async () => {
      await addFavorite('1');
      await addFavorite('1');

      expect(await getFavorites()).toEqual(['1']);
    });
  });

  describe('removeFavorite', () => {
    it('removes an id from the favorites list', async () => {
      await addFavorite('1');
      await addFavorite('2');

      await removeFavorite('1');

      expect(await getFavorites()).toEqual(['2']);
    });

    it('does nothing when the id is not favorited', async () => {
      await addFavorite('1');

      await removeFavorite('2');

      expect(await getFavorites()).toEqual(['1']);
    });
  });

  describe('isFavorite', () => {
    it('returns true when the id is favorited', async () => {
      await addFavorite('1');

      expect(await isFavorite('1')).toBe(true);
    });

    it('returns false when the id is not favorited', async () => {
      expect(await isFavorite('1')).toBe(false);
    });
  });
});
