import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const VerificationScreen = () => {

  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);

  return (
    <View style={styles.screenContainer}>
      <Text> Map view </Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coordinates[0].latitude, 
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        showsMyLocationButton={true}
        zoomControlEnabled={true}
        mapType={'standard'}
        style={styles.mapStyle}>
            <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey="AIzaSyAFZOWYluBM8YB1Oi3_4c2cDvXXgBPDxfo" // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
       
      </MapView>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    width: 370,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
