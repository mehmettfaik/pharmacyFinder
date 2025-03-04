import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async (pharmacy) => {
    try {
      const isFavorite = favorites.some(fav => fav.pharmacyName === pharmacy.pharmacyName);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = favorites.filter(fav => fav.pharmacyName !== pharmacy.pharmacyName);
      } else {
        newFavorites = [...favorites, pharmacy];
      }
      
      setFavorites(newFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const isFavorite = (pharmacy) => {
    return favorites.some(fav => fav.pharmacyName === pharmacy.pharmacyName);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);