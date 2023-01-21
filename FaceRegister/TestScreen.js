import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class TestScreen extends Component {
  render() {
    return (
      <View>
        <MapView style={styles.map}
    region={{
        latitude: 4.895168,
        longitude: 52.370216,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    }}
>

<MapView.Marker
    coordinate={{
        latitude: 4.895168,
        longitude: 52.370216
        }}
        title={"titel"}
        description={"descriptie"}
        />
</MapView>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    map: {
          ...StyleSheet.absoluteFillObject,
          height: Dimensions.get("window").height,
      },
     });
     