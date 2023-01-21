import React from 'react';
import {Text, View} from 'react-native';
import OtpScreen from './OtpScreen';
import RegistrationWizard from './RegistrationWizard';
import VerificationScreen from './VerificationScreen';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <OtpScreen></OtpScreen>
    </View>
  );
};

export default App;
