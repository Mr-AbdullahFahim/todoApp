import React , {useState , useContext, useEffect } from 'react';
import {TouchableOpacity, View,  StyleSheet , Text, Modal, Pressable , TextInput} from 'react-native';

export default function SelectableButton({selected , text , pressEvent , padding}){
    return (
        <Pressable onPress={pressEvent} style={{ backgroundColor: selected ? '#FAD9FF' : "black" , borderRadius : 5 , paddingHorizontal : padding != undefined ? padding : 35  , paddingVertical : 5 , borderWidth : 1 , borderColor : '#FAD9FF' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
            <Text style={{ fontSize : 18 , color : selected ? 'black' : 'white' }}>{text}</Text>
        </Pressable>
    )
}
