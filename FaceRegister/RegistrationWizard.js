import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const RegistrationWizard = () => {
  return (
    <View style={{flex: 1}}>
      <ProgressSteps>
        <ProgressStep label="First Step">
          <View style={{flex: 1, height:400}}>
            <Text>Map View</Text>
            <Text>This is map</Text>
            <Text>This is map</Text>
            <Text>This is map</Text>

            <MapView
              style={styles.map}
              showsMyLocationButton={true}
              showsUserLocation={true}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />

           
          </View>
        </ProgressStep>
        <ProgressStep label="Second Step">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 2!</Text>
          </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
          <View style={{alignItems: 'center'}}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default RegistrationWizard;
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
});
