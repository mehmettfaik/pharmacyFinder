import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import axios from "axios";
import { BASE_URL, API_KEY } from "../constants/config";
import SelectBox from "../components/SelectBox";
import PharmacyCard from "../components/PharmacyCard";


const HomeScreen = () => {
  const theme = useTheme();
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchDistricts();
      setSelectedDistrict(null);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      fetchPharmacies();
    }
  }, [selectedCity, selectedDistrict]);

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${BASE_URL}pharmacies-on-duty/cities`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const cityData = response.data.data.map((city) => ({
        label: city.cities,
        value: city.slug,
      }));
      setCities(cityData);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchDistricts = async () => {
    if (selectedCity) {
      try {
        const response = await axios.get(
          `${BASE_URL}pharmacies-on-duty/cities?city=${selectedCity}`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        const districtData = response.data.data.map((district) => ({
          label: district.cities,
          value: district.slug,
        }));
        setDistricts(districtData);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }
  };

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}pharmacies-on-duty?city=${selectedCity}&district=${selectedDistrict}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      setPharmacies(response.data.data);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

   return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.pharmacy, { color: theme.colors.text }]}> Pharmacy Finder </Text>
      <Text style={[styles.title, { color: theme.colors.text }]}>Pharmacy on Duty</Text>
      <SelectBox
        items={cities}
        value={selectedCity}
        setValue={setSelectedCity}
        placeholder="Select City"
        open={cityOpen}
        setOpen={setCityOpen}
        zIndex={3000}
        zIndexInverse={3000}
        theme={theme}
      />
      <SelectBox
        items={districts}
        value={selectedDistrict}
        setValue={setSelectedDistrict}
        placeholder="Select District"
        open={districtOpen}
        setOpen={setDistrictOpen}
        zIndex={2000}
        zIndexInverse={2000}
        theme={theme}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
          style={styles.loading}
        />
      ) : (
        <ScrollView style={styles.pharmacyList}>
          {pharmacies.map((pharmacy, index) => (
            <PharmacyCard key={index} pharmacy={pharmacy} theme={theme} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 19,
    marginBottom: 16,
    textAlign: "center",
    marginTop: 10, 
  },
  loading: {
    marginTop: 20,
  },
  pharmacyList: {
    marginTop: 16,
  },
  pharmacy:{
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 20,
  },

});

export default HomeScreen;