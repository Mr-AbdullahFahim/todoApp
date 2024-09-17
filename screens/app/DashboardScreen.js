import { View , StyleSheet , Text , TextInput} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TodayTask from '../../components/dashboard/TodayTask';
import CreateNewTaskModal from '../../components/modals/CreateNewTaskModal';
import { useEffect, useState } from 'react';
import AsyncStorageService from '../../services/AsyncStorageService';
import SearchModal from '../../components/modals/SearchModal'

export default function DashboardScreen() {
    const [isAdded,setIsAdded]=useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [loadedTasks,setLoadedTasks]=useState([]);
    const loadTaskData = async () => {
        try {
            const tasks = await AsyncStorageService.loadTasks(); // Await for loading tasks
            setLoadedTasks(tasks);
            if(tasks){
                setIsLoading(true);
                setIsAdded(false);
            }
            // You can now use the loaded tasks
        } catch (error) {
            console.error('Error loading tasks:', error); // Handle any errors
        }
    };
    useEffect(()=>{
        if(isAdded){
            loadTaskData();
            setIsAdded(false);
        }
    })
    const today = new Date();
    const print=()=>{
        console.log(today);
    }
    return (
        <SafeAreaView style={styles.container} onLayout={loadTaskData}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>You have got 5 tasks</Text>
                    <Text style={styles.headerText}>today to complete 🖍️</Text>
                </View>
                <CreateNewTaskModal update={setIsAdded}/>
                {/* <EditTaskModal /> */}
            </View>

            <SearchModal />

            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                    <Text style={[styles.headerText , {fontSize: 20}]}>Progress</Text>
                    <TouchableOpacity>
                        <Text style={[styles.taskComplete , {color : '#BA83DE'}]}>See All</Text>
                    </TouchableOpacity>
                </View>

                {isLoading && <ProgressTracker taskList={[]} />}

                {isLoading && <TodayTask task={1} list={loadedTasks}/>}
                {isLoading && <TodayTask task={2} list={loadedTasks}/>}
                {isLoading && <TodayTask task={3} list={loadedTasks}/>}

            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : 'black',
        paddingHorizontal : 15,
    } ,

    header : {
        width : '100%',
        display : 'flex',
        flexDirection: 'row',
        paddingVertical : 10,
        justifyContent : 'space-between',
    },

    // headerText : {
    //     fontSize : 30,
    //     fontWeight : 'bold',
    //     color : 'white'
    // },

    search: {
        display : 'flex',
        flexDirection : 'row',
        borderColor : '#ccc',
        paddingHorizontal : 10,
        paddingVertical : 13,
        borderRadius : 5,
        marginVertical : 10,
        backgroundColor : '#1E1E1E'
    },

    headerText: {
        marginVertical: 'auto',
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

})