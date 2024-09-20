import React, { useEffect , useState , useContext } from 'react';
import { View,  StyleSheet , Text } from 'react-native';
import { ProgressBar } from '@ui-kitten/components';
import { TodoContext } from '../../store/store';

export default function ProgressTracker({ taskList , date }) {
    const [complete, setComplete] = useState(0);
    const [todayTaskCount, setTodayTaskCount] = useState(0);
    const [progressMessage, setProgressMessage] = useState('');
    const { state } = useContext(TodoContext);

    useEffect(() => {
        let counter = 0;
        state.tasks.forEach((item) => {
            const day = date || new Date();
            const taskDate = new Date(item.date);
            if ( (taskDate.toLocaleDateString() === day.toLocaleDateString()) && item.completed) {
                counter++;
            }
        });
        setComplete(counter);
        setTodayTaskCount(taskList.length)
    }, [taskList]);

    useEffect(() => {
        const progress = todayTaskCount > 0 ? (complete / todayTaskCount) * 100 : 0;
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
    }, [complete, todayTaskCount]);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Daily Task</Text>
            <Text style={styles.taskComplete}>{complete}/{taskList.length} Task Completed</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.smallText}>{progressMessage}</Text>
                <Text style={styles.taskComplete}>
                    {todayTaskCount > 0 ? Math.round((complete / todayTaskCount) * 10000) / 100 : 0}%
                </Text>
            </View>

            <ProgressBar
                progress={taskList.length > 0 ?(complete / taskList.length) : 0}
                size='giant'
                trackColor='#BA83DE'
            />
        </View>
    );
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
