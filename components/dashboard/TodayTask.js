import React, {useContext, useEffect, useState} from 'react';
import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import TaskItem from '../TaskItem';
import {TodoContext} from '../../store/store';


export default function TodayTask({task, list, searchedText, onTaskUpdate}) {
    function checkSearch(text){
        return text.includes(searchedText.toLowerCase().trimStart());
    }

    let today=new Date();
    return (
        <View style={styles.task}>
            <View style={{marginBottom: 10, flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={[styles.taskText , {fontSize: 20 , marginVertical: 'auto'}]}>{task==1?"Today's tasks":task==2?"Tomorrow's tasks":"Upcoming Tasks"}</Text>
                <TouchableOpacity style={{marginVertical: 'auto'}}>
                    <Text style={[styles.taskComplete , {color : '#BA83DE'}]}>See All</Text>
                </TouchableOpacity>
            </View>

        
            {task === 1 ? 
                list.map((singletask) => {
                    const taskDate = new Date(singletask.date); 
                    return taskDate.toLocaleDateString() === today.toLocaleDateString() && checkSearch((singletask.title).toLowerCase())? (
                        <TaskItem item={singletask} key={singletask.id} onTaskUpdate={onTaskUpdate} />
                    ) : null;
                }) 
            : 
            task===2?
                list.map((singletask) => {
                    const taskDate = new Date(singletask.date);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate()+1)
                    return taskDate.toLocaleDateString() === tomorrow.toLocaleDateString() && checkSearch(singletask.title.toLowerCase()) ? (
                        <TaskItem item={singletask} key={singletask.id} onTaskUpdate={onTaskUpdate}/>
                    ) : null;
                })
            :
                list.map((singletask) => {
                    const taskDate = new Date(singletask.date);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate()+1)
                    return taskDate.toLocaleDateString()>tomorrow.toLocaleDateString() && checkSearch(singletask.title.toLowerCase()) ? (
                        <TaskItem item={singletask} key={singletask.id} onTaskUpdate={onTaskUpdate} />
                    ):null;
                })
            }


        <Text onTextLayout={print}></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    task: {
        marginVertical: 10,
        borderRadius: 5
    },
    taskText: {
        color: 'white',
        fontSize: 20,
    }
 
})