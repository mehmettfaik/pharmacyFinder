import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BASE_URL, API_KEY } from "../constants/config"; 

export default function App() {
  const [pharmacies, setPharmacies] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [region, setRegion] = useState({
    latitude: 38.9637, 
    longitude: 35.2433, 
    latitudeDelta: 5, 
    longitudeDelta: 5, 
  });

  // API'den Türkiye'deki tüm eczaneleri al
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}pharmacies-on-duty/locations?latitude=38.432561&longitude=27.143503&`, {
          params: {
            latitude: region.latitude, 
            longitude: region.longitude, 
            apiKey: API_KEY, 
          },
          headers: {
            Authorization: `Bearer ${API_KEY}`, 
          },
        });

        setPharmacies(response.data.data); 
      } catch (error) {
        console.error('Eczane verileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies();
  }, [region]); 

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        {}
        {pharmacies.map((pharmacy, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pharmacy.latitude, 
              longitude: pharmacy.longitude, 
            }}
            title={pharmacy.pharmacyName} 
            description={pharmacy.address} 
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
