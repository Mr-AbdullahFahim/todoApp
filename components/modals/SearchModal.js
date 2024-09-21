import { View,  StyleSheet , Text, Modal, Pressable , SafeAreaView , TextInput} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React , {useEffect, useState , useContext} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorageService from '../../services/AsyncStorageService';
import { TodoContext } from '../../store/store';
import TaskItem from '../TaskItem';
import EditTaskModal from './EditTaskModal';


export default function SearchModal(){
    const { state } = useContext(TodoContext); 
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery , setSearchQuery] = useState("");
    const [searchList , setSearchList] = useState([])
    const [selectedItem , setSelectedItem] = useState(null);
    const [editModalVisible , setEditModalVisible] = useState(false)
    const [swipedTaskId, setSwipedTaskId] = useState(null);

    useEffect(() => {
        setSearchList(state.tasks)
    } , [modalVisible , editModalVisible])
    
    const openModal = () => {
        setModalVisible(true);
    };
    
      const closeModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const filteredTasks = state.tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            setSearchList(filteredTasks)
        }else{
            setSearchList(state.tasks)
        }
    }, [searchQuery])

    const setSelectedItemForModal = (item)=> {
        setEditModalVisible(true)
        setSelectedItem(item)
    }

    const closeEditModal = () => {
        setEditModalVisible(false)
        setSelectedItem(null)
    }

    return (
        <View>

            <Pressable onPress={openModal} style={styles.search}>
                
                <View>
                    <FontAwesome name={"search"} size={24} color="#a2a2a2" />
                </View>

                <TextInput
                    style={{width : '90%' , color: 'white', marginLeft: 10}}
                    placeholder="Search Task Here"
                    placeholderTextColor={'white'}
                    readOnly
                    onPress={openModal}
                />

            </Pressable>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeModal}
            >

                <SafeAreaView style={styles.container}>

                    <View style={styles.header} >
                        
                        <Pressable style={{ display : 'flex' , justifyContent: 'flex-start' }} onPress={closeModal}>
                            <Ionicons name="close-circle" size={28} color="white" />
                        </Pressable>

                        <Text onPress={() => AsyncStorageService.resetTasks()} style={styles.headerText}>Search tasks</Text>
                    </View>

                    <View style={{ display : 'flex' , width  :'100%' , paddingHorizontal : 15, marginTop : 15 }} >
                        <Pressable style={styles.search}>
                    
                            <View>
                                <FontAwesome name={"search"} size={24} color="#a2a2a2" />
                            </View>

                            <TextInput
                                style={{width : '90%' , color: 'white', marginLeft: 10}}
                                placeholder="Search Task Here"
                                placeholderTextColor={'white'}
                                onChangeText={(text) => setSearchQuery(text)}
                                value={searchQuery}
                            />

                        </Pressable>    
                        
                        <Text style={[styles.titleText , { marginTop : 10}]}>Search results</Text>
                    </View>
                    
                    <View style={styles.body}>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            

                            <View style={{ marginVertical : 20 }}>
                                {searchList.map((taskItem , index) => (<TaskItem swipedTaskId={swipedTaskId} setSwipedTaskId={setSwipedTaskId} onTaskUpdate={() => console.log('task updated!')} pressEvent={() => setSelectedItemForModal(taskItem)} item={taskItem} key={index} />))}
                            </View>

                            <EditTaskModal item={selectedItem} closeModal={() => closeEditModal()} modalVisible={editModalVisible} />

                        </ScrollView>

                    </View>

                </SafeAreaView>

            </Modal>
                
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    header: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal : 15
    },

    headerText: {
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
        marginVertical: 'auto',
        marginLeft: 50,
    },

    titleText: {
        color: 'white',
        fontSize: 20,
    },

    body: {
        paddingHorizontal : 15,
        marginVertical: 0,
    },

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

})