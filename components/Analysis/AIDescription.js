import { useEffect , useContext, useState } from 'react';
import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView} from 'react-native';
import { TodoContext } from '../../store/store';

export default function AIDescriptionCard({date}){
    const {state, dispatch} = useContext(TodoContext);
    const [list , setList] = useState(0);
    const [completed , setCompleted] = useState(0);

    useEffect(() => {
        const filteredList = state.tasks.filter(task =>  new Date(date).toLocaleDateString()  === new Date(task.date).toLocaleDateString())
        setList(filteredList.length)
        setCompleted(filteredList.filter(task => task.completed === true).length)
    }, [date])

    return (
        <View style={styles.card}>
            <Text style={styles.title}>Statistics</Text>

            <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' }}>
                <Text style={[styles.description , {marginVertical : 'auto' , fontWeight : 'bold'}]}>📋 Total tasks:</Text>
                <Text style={[styles.description , {marginVertical : 'auto', fontWeight : 'bold'}]}>{list}</Text>
            </View>
           
            <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' }}>
                <Text style={[styles.description , {marginVertical : 'auto' , fontWeight : 'bold'}]}>✅ Tasks Completed:</Text>
                <Text style={[styles.description , {marginVertical : 'auto', fontWeight : 'bold'}]}>{completed}</Text>
            </View>

            <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' }}>
                <Text style={[styles.description , {marginVertical : 'auto' , fontWeight : 'bold'}]}>⏳  Pending Tasks:</Text>
                <Text style={[styles.description , {marginVertical : 'auto' , fontWeight : 'bold'}]}>{list - completed}</Text>
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    }
})