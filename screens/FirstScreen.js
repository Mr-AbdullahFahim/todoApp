import React , {useEffect} from 'react';
import { View,  StyleSheet , Image } from 'react-native';
import AsyncStorageService from '../services/AsyncStorageService';

export default function FirstScreen({ navigation }) {

    useEffect(() => {
        const checkAsyncStorage = async () => {
          try {
            const isNewUser = await AsyncStorageService.isNewUser();
            const currentUser = await AsyncStorageService.getCurrentProfile();
            console.log("is new user -> " , isNewUser , currentUser)
            if (isNewUser || currentUser == null) {
              navigation.replace('LandingPage'); 
            } else {
              navigation.replace('Main');
            }
              
          } catch (e) {
            console.error(e);
          }
        };
        checkAsyncStorage();
    }, []);



  return (
    <View style={styles.container}>
    </View>
  );
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor : '#121212'
    },
    logo: {
        width: 200,
        height: 200,
    },
        buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '90%',
    },
})