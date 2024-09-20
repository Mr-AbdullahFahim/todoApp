import { View , StyleSheet , Text , TextInput} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressTracker from '../../components/dashboard/ProgressComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import TodayTask from '../../components/dashboard/TodayTask';
import CreateNewTaskModal from '../../components/modals/CreateNewTaskModal';
import { useEffect, useState , useContext } from 'react';
import AsyncStorageService from '../../services/AsyncStorageService';
import SearchModal from '../../components/modals/SearchModal'
import { TodoContext } from '../../store/store';

export default function DashboardScreen() {
    const { state } = useContext(TodoContext);
    const [isAdded,setIsAdded]=useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [loadedTasks,setLoadedTasks]=useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [todayTasks,setTodayTasks] = useState([]);
    const [statusOfTasks,setStatusOfTasks] = useState(false);
    const [updateingTask,setUpdatingTask] = useState(null);

    const loadTaskData = async () => {
        try {
            const tasks = await AsyncStorageService.loadTasks();
            setLoadedTasks(tasks);
            if(tasks){
                setIsLoading(true);
                setIsAdded(false);
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    useEffect(()=>{
        if(isAdded){
            loadTaskData();
            setIsAdded(false);
        }
    },[isAdded , state.tasks])

    useEffect(()=>{
        if(isLoading || isAdded){
            const tasksForToday=loadedTasks.filter((task)=>{
                const taskDate = new Date(task.date);
                const today = new Date();
                return (taskDate.toLocaleDateString()===today.toLocaleDateString() && !task.completed);
            });
            setTodayTasks(tasksForToday);
            if(tasksForToday.length>0){
                setStatusOfTasks(true);
            }
        }
    },[loadedTasks])

    const today = new Date();

    return (
        <SafeAreaView style={styles.container} onLayout={loadTaskData}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.headerText}>You have got {state.tasks.filter((task) => {
                        const taskDate = new Date(task.date);
                        const today = new Date();
                        return (taskDate.toLocaleDateString() === today.toLocaleDateString() && task.completed == false);
                    }).length} tasks</Text>
                    <Text style={styles.headerText}>today to complete 🖍️</Text>
                </View>
                <CreateNewTaskModal />
            </View>

            <SearchModal />

            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={{ flexDirection : 'row' , justifyContent: 'space-between' }}>
                    <Text style={[styles.headerText , {fontSize: 20}]}>Progress</Text>
                </View>

                {isLoading && <ProgressTracker  taskList={state.tasks.filter((task) => {
                    const taskDate = new Date(task.date);
                    const today = new Date();
                    return (taskDate.toLocaleDateString() === today.toLocaleDateString());
                })}/>}

                {/* {isLoading && <TodayTask task={1} list={loadedTasks} searchedText={searchValue} onTaskUpdate={loadTaskData}/>}
                {isLoading && <TodayTask task={2} list={loadedTasks} searchedText={searchValue} onTaskUpdate={loadTaskData}/>}
                {isLoading && <TodayTask task={3} list={loadedTasks} searchedText={searchValue} onTaskUpdate={loadTaskData}/>} */}

                {isLoading && <TodayTask task={1} list={loadedTasks} searchedText={searchValue} onTaskUpdate={loadTaskData} onUpdatingTask={setUpdatingTask}/>}
                {isLoading && <TodayTask task={2} list={loadedTasks} searchedText={searchValue} onTaskUpdate={loadTaskData} onUpdatingTask={setUpdatingTask}/>}
                {isLoading && <TodayTask task={3} list={loadedTasks} searchedText={searchValue} onTaskUpdate={loadTaskData} onUpdatingTask={setUpdatingTask}/>}
                
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
        color: 'white',
        fontWeight: 'bold',
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
    },
    searchIntput: {
        color:'#fff',
        marginLeft:10,
        width:'100%',
    }

})