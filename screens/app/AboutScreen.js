import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AboutAppAScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={{ paddingHorizontal: 15 }}>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerText}>About App</Text>
                        <Text style={styles.headerText}>App Settings and Info 🌍</Text>
                    </View>
                </View>

                <View style={{ marginBottom : 10 , padding : 13 , backgroundColor : '#181818' , borderRadius : 8 }}>
                    <View style={{ display : 'flex' , flexDirection: 'row' , gap : 10 }}>
                        <AntDesign name="delete" size={24} color="white" />
                        <Text style={styles.titleText}>Delete your Data</Text>
                    </View>
                    <Text style={styles.bodyText}>This action is irreversible. It will delete your data including tasks and other data.</Text>

                    <View style={{ display :'flex' , width : '100%' ,  flexDirection : 'row' , justifyContent : 'flex-end' }}>
                        <TouchableOpacity style={{ marginTop : 10 , borderRadius : 8,  padding : 12 , paddingHorizontal : 25 , backgroundColor : 'rgba(63,19,22,1)' }}>
                            <Text style={{ color :'#EE716D' , fontSize : 16 }}>Delete Data</Text>
                        </TouchableOpacity>
                    </View>


                </View>
                
                <Text style={styles.bodyText}>App Info</Text>

                <View style={{ borderWidth : 1 , borderColor : 'rgba(255,255,255,0.2)' , marginTop : 13  , backgroundColor : '#181818' , borderRadius : 8 }}>
                    
                    <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , padding : 10 , paddingVertical : 10  , borderBottomWidth : 1 , borderBottomColor : 'rgba(255,255,255,0.2)' }}>
                        <Text style={{ color : 'white' , fontSize :16 }}>App Version</Text>
                        <Text style={{ color : 'white' , fontSize :12 , marginVertical : 'auto' }}>V1.0.0</Text>
                    </View>
                    
                    <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , padding : 10 , paddingVertical : 10  , borderBottomWidth : 1 , borderBottomColor : 'rgba(255,255,255,0.2)' }}>
                        <Text style={{ color : 'white' , fontSize :16 }}>React Native Version</Text>
                        <Text style={{ color : 'white' , fontSize :12 , marginVertical : 'auto' }}>V0.74.5</Text>
                    </View>

                    <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , padding : 10 , paddingVertical : 10  , borderBottomWidth : 1 , borderBottomColor : 'rgba(255,255,255,0.2)' }}>
                        <Text style={{ color : 'white' , fontSize :16 }}>Expo Version</Text>
                        <Text style={{ color : 'white' , fontSize :12 , marginVertical : 'auto' }}>V51.0.31</Text>
                    </View>

                    <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , padding : 10 , paddingVertical : 10  }}>
                        <Text style={{ color : 'white' , fontSize :16 }}>OpenAI model</Text>
                        <Text style={{ color : 'white' , fontSize :12 , marginVertical : 'auto' }}>gpt-4o-mini</Text>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom : 20,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    titleText : {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        marginVertical : 'auto'
    },

    bodyText: {
        color: 'gray',
        marginTop: 15
    }

});