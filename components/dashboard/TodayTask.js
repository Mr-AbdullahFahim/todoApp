import React, {useContext, useEffect, useState} from 'react';
import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import TaskItem from '../TaskItem';
import {TodoContext} from '../../store/store';
import EditTaskModal from '../modals/EditTaskModal';


export default function TodayTask({task, list}) {
    let today=new Date();
    const { state } = useContext(TodoContext);
    const [selectedItem , setSelectedItem] = useState(null);
    const [editModalVisible , setEditModalVisible] = useState(false)

    const setSelectedItemForModal = (item)=> {
        setEditModalVisible(true)
        setSelectedItem(item)
    }

    const closeEditModal = () => {
        setEditModalVisible(false)
        setSelectedItem(null)
    }

    return (
        <View style={styles.task}>
            <View style={{marginBottom: 10, flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={[styles.taskText , {fontSize: 20 , marginVertical: 'auto'}]}>{task==1?"Today's tasks":task==2?"Tomorrow's tasks":"Upcoming Tasks"}</Text>
                <TouchableOpacity style={{marginVertical: 'auto'}}>
                    {/* <Text style={[styles.taskComplete , {color : '#BA83DE'}]}>See All</Text> */}
                </TouchableOpacity>
            </View>

        
            {task === 1 ? 
                state.tasks.map((singletask) => {
                    const taskDate = new Date(singletask.date); 
                    return taskDate.toLocaleDateString() === today.toLocaleDateString() ? (
                        <TaskItem  pressEvent={() => setSelectedItemForModal(singletask)} item={singletask} key={singletask.id} />
                    ) : null;
                }) 
            : 
            task===2?
                state.tasks.map((singletask) => {
                    const taskDate = new Date(singletask.date);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate()+1)
                    return taskDate.toLocaleDateString() === tomorrow.toLocaleDateString() ? (
                        <TaskItem  pressEvent={() => setSelectedItemForModal(singletask)} item={singletask} key={singletask.id} />
                    ) : null;
                })
            :
                state.tasks.map((singletask) => {
                    const taskDate = new Date(singletask.date);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate()+1)
                    return taskDate.toLocaleDateString()>tomorrow.toLocaleDateString() ? (
                        <TaskItem  pressEvent={() => setSelectedItemForModal(singletask)} item={singletask} key={singletask.id} />
                    ):null;
                })
            }

            <EditTaskModal item={selectedItem} closeModal={() => closeEditModal()} modalVisible={editModalVisible} />

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