import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PharmacyCard from '../components/PharmacyCard';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Pharmacies</Text>
      <ScrollView style={styles.pharmacyList}>
        {favorites.length > 0 ? (
          favorites.map((pharmacy, index) => (
            <PharmacyCard key={index} pharmacy={pharmacy} />
          ))
        ) : (
          <Text style={styles.emptyText}>You haven't added a favorite pharmacy yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  pharmacyList: {
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default FavoritesScreen;