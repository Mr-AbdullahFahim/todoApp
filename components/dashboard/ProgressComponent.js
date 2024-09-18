import React, { useEffect , useState , useContext } from 'react';
import { View,  StyleSheet , Text } from 'react-native';
import { ProgressBar } from '@ui-kitten/components';
import { TodoContext } from '../../store/store';


export default function ProgressTracker({date}){

    const [completed , setCompleted] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const { state } = useContext(TodoContext);
    const [taskList , setTaskList] = useState([]);

    useEffect(() => {
        const filteredTasks = state.tasks.filter(task => new Date(task.date).toDateString() === date.toDateString());
        setTaskList(filteredTasks);
    }, [state.tasks, date]);


    useEffect(() => {
        let counter = 0;
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].completed) {
                counter++;
            }
        }
        setCompleted(counter);
    } , [state.tasks , date ])

    useEffect(() => {
        const progress = (completed / (taskList.length > 0 ? taskList.length : 1)) * 100;
        if (progress === 100) {
            setProgressMessage("You've completed all tasks! 🎉");
        } else if (progress >= 75) {
            setProgressMessage("You're almost there! Just a few more tasks!");
        } else if (progress >= 50) {
            setProgressMessage("You're halfway through! Keep going!");
        } else if (progress >= 25) {
            setProgressMessage("Good start! Keep pushing forward.");
        } else {
            setProgressMessage("Start completing tasks to see your progress.");
        }
    }, [state.tasks , completed, taskList]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Daily Task</Text>
            <Text style={styles.taskComplete}>{completed}/{taskList.length} Task Completed</Text>
            
            <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={styles.smallText}>{progressMessage}</Text>
                <Text style={styles.taskComplete}>{ taskList.length > 0 ? (completed / taskList.length) * 100 : 0 }%</Text>
            </View>
            <ProgressBar
                progress={taskList.length > 0 ?(completed / taskList.length) : 0}
                size='giant'
                trackColor='#BA83DE'
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        borderRadius: 8,
        backgroundColor: '#181818',
        padding: 20,
        color: 'white'
    },

    headerText: {
        fontSize: 18,
        color: 'white'
    },

    taskComplete: {
        marginVertical: 10,
        fontSize: 15,
        color: 'white'
    },

    smallText: {
        marginVertical: 'auto',
        fontSize: 13,
        color: 'gray'
    }

});