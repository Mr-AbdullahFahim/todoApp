import React from 'react';
import { View,  StyleSheet , Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CheckButton({pressEvent , taskItem}){
    return (
        <Pressable onPress={pressEvent} style={[styles.checkButton , {backgroundColor: '#1F1F1F'}]}>
            {taskItem && taskItem.completed == true && (<AntDesign name="check" size={16} color={"white" } />) }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    checkButton: {
        borderRadius: 30,
        width : 30,
        height : 30,
        padding: 5,
        borderWidth: 1,
        borderColor: '#BA83DE',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 'auto'
    }
})