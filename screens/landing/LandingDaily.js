import React from 'react';
import { View,  StyleSheet , Image, Alert , Text } from 'react-native';
import CommonButton from '../../components/CommonButton';


export default function LandingDaily({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
            source={require('../../assets/landing/daily.png')}
            style={styles.logo}
            resizeMode="contain"
        />

        <Text style={[styles.mainText , {textAlign : 'center'}]}>Create daily routine</Text>
        <Text style={styles.smallText}>In Uptodo  you can create your personalized routine to stay productive</Text>

        <View style={styles.buttonContainer}>
            <CommonButton pressEvent={() => navigation.replace('LandingOrganize')} />
        </View>
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
        width: 250,
        height: 250,
    },
        buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '90%',
    },
    mainText : {
        fontSize: 35,
        color : '#ffffff',
        marginVertical : 30,
        fontWeight : 'bold'
    },
    smallText : {
        fontSize: 15,
        color : '#ffffff',
        marginVertical : 10,
        fontWeight : '400',
        textAlign : 'center',
        marginHorizontal : 20,
    }
})