import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@aoe2_favorites';

export async function getFavorites(): Promise<string[]> {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export async function addFavorite(id: string): Promise<void> {
  const favorites = await getFavorites();
  if (!favorites.includes(id)) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, id]));
  }
}

export async function removeFavorite(id: string): Promise<void> {
  const favorites = await getFavorites();
  const updated = favorites.filter((favoriteId) => favoriteId !== id);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function isFavorite(id: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.includes(id);
}
