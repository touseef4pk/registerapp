// Example of Image Picker in React Native
// https://aboutreact.com/example-of-image-picker-in-react-native/

// Import React
import React, {useState} from 'react';
// Import required components
import {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Appold = () => {
  const [filePath, setFilePath] = useState({});
  const [userName, seUserName] = useState('ali');
  const [isLoading, setIsLoading] = useState(false);
  

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, result => {
      console.log(result);
      if (result.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (result.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (result.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (result.errorCode == 'others') {
        alert(result.errorMessage);
        return;
      }

      response = result.assets[0];
      console.log(response);
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  const captureImage = async type => {
    console.log('capture image');
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, result => {
        console.log(result);
        
        if (result.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (result.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (result.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (result.errorCode == 'others') {
          alert(result.errorMessage);
          return;
        }

        const response = result.assets[0];
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.fileName);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const submitImage = async () => {
    console.log('submit image');

    if (userName == '' || userName == undefined || userName == null) {
      alert('Please Enter the Username');
    } else if (filePath == '' || filePath == undefined || filePath == null) {
      alert('Please Capture the Image');
    } else {
      RegisterFace();
    }
  };

  const RegisterFace = async () => {

  }
  
  const RegisterFaceOld = async () => {
    //const RegisterFace = () => {
    setIsLoading(true);
    console.log('register');

    const request = new Request(
      'https://rf6u4sgm2j.execute-api.us-east-1.amazonaws.com/teststage/addtest',
      {
        method: 'POST',
        body: JSON.stringify({
          Image: filePath.base64,
          name: userName,
        }),
      },
    );

    fetch(request)
      .then(response => {
        setIsLoading(false);
        if (response.status === 200) {
          console.log('succesfully registered');
          alert('Face has been registered!');
          return response.json();
        } else {
          throw new Error('Something went wrong on API server!');
        }
      })
      .then(response => {
        console.log('in then');
        console.log(response);
        // …
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error');
        console.error(error);
      });

    /*
    fetch('https://rf6u4sgm2j.execute-api.us-east-1.amazonaws.com/teststage/addtest', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body : JSON.stringify({ 
            Image: filePath.base64,
            name: userName
        })
    });*/

    /*
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Image: filePath.base64,
        name: userName,
      }),
    };
    try {
      const fetchResponse = await fetch(
        'https://rf6u4sgm2j.execute-api.us-east-1.amazonaws.com/teststage/addtest',
        settings,
      );
      const data = await fetchResponse.json();
      console.log(data);
      setIsLoading(false);
      alert('Face has been registered!');
      return data;
    } catch (e) {
      setIsLoading(false);
      alert('Error occured while registering the image!');
      console.log(e);
      return e;
    }
    */
  };

  

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#ccffff'}}>
      {isLoading? (
      <View>
      <ActivityIndicator style={styles.loaderStyle} size={'large'}/>
      </View> 
      ):(
      <View style={styles.container}>     
      
      <Text style={styles.titleText}>Registration</Text>
        <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => captureImage('photo')}>
          <Text style={styles.textStyle}>Launch Camera for Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile('photo')}>
          <Text style={styles.textStyle}>Choose Image Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.registerStyle}
          onPress={() => submitImage()}>
          <Text style={styles.textStyle}>Register</Text>
        </TouchableOpacity>
      </View> 
      )}
    </SafeAreaView>
  );
};

export default Appold;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  loaderStyle: {
    minHeight: '100%',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center'
  },
  registerStyle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 5,
    top: 50,
    position: 'relative',
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
