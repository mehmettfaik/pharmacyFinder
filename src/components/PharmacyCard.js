import React from 'react';
import { View, Linking } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFavorites } from '../context/FavoritesContext';

const PharmacyCard = ({ pharmacy }) => {
  const theme = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(pharmacy);

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${pharmacy.latitude},${pharmacy.longitude}`;
    Linking.openURL(url);
  };

  const callPharmacy = () => {
    Linking.openURL(`tel:${pharmacy.phone}`);
  };

  return (
    <Card style={{ margin: 8, elevation: 4 }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title style={{ color: theme.colors.primary, flex: 1 }}>{pharmacy.pharmacyName}</Title>
          <IconButton
            icon={favorited ? 'heart' : 'heart-outline'}
            color={favorited ? theme.colors.primary : '#666'}
            size={24}
            onPress={() => toggleFavorite(pharmacy)}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
          <Icon name="map-marker" size={20} color={theme.colors.primary} />
          <Paragraph style={{ marginLeft: 8 }}>{pharmacy.address}</Paragraph>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
          <Icon name="phone" size={20} color={theme.colors.primary} />
          <Paragraph style={{ marginLeft: 8 }}>{pharmacy.phone}</Paragraph>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
          <Icon name="clock" size={20} color={theme.colors.primary} />
          <Paragraph style={{ marginLeft: 8 }}>Pharmacy on Duty</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={callPharmacy}>
          Call
        </Button>
        <Button mode="outlined" onPress={openMap} style={{ marginLeft: 8 }}>
        See on Map
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default PharmacyCard;