import React , {useState , useContext} from 'react';
import {  View,  StyleSheet , Text, TouchableWithoutFeedback  } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CheckButton from './CheckButton';
import { format } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TodoService from '../services/TodoService';
import { TodoContext  } from '../store/store';

export default function TaskItem({item , pressEvent}) {
    const { state , dispatch } = useContext(TodoContext);
    const [task , setTask] = useState(item)

    const toggleStatus = async() => {
        setTask({...task ,  completed : !task.completed })
        const updatedTasks = state.tasks.map(t => t.id === task.id ? task : t);
        // console.log("updated ones are -> " , updatedTasks)
        const res = await TodoService.updateTask(task , updatedTasks)
        console.log("output => " , task )
        dispatch({ type: 'LOAD_TASKS', payload: res.message });
    }

    return (
        <View style={styles.container}>
            
            <TouchableOpacity  onPress={pressEvent} style={{}}>
                
                <View style={{ display : 'flex' , flex: 1 }} >
                    <Text style={[styles.taskText , {color:'white' , fontSize: 17 , marginVertical: 'auto'}]}>{item.title}</Text>
                    <View style={{ display : 'flex', marginTop : 5, flexDirection : 'row'}}>
                        <AntDesign name="calendar" size={18} color="gray" style={{ marginVertical: 'auto', marginRight : 5 }} />
                        <Text style={[styles.taskText , { fontWeight: 'bold',  color:'gray' , fontSize: 14 , marginVertical: 'auto'}]}>{format(new Date(item.date), 'd MMM')}</Text>
                    </View>
                </View >
            </TouchableOpacity>
            
            <CheckButton pressEvent={toggleStatus} taskItem={task} />
        
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        padding: 15,
        paddingVertical: 20,
        marginVertical: 8,
        borderRadius: 8,
        backgroundColor: '#1F1F1F',
        borderLeftWidth: 15,
        borderLeftColor: '#8875FF',
        elevation: 2,
        flexDirection : 'row' ,
        justifyContent: 'space-between' 
    },

})