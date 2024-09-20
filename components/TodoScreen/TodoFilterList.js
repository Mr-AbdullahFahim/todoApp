import { View,  StyleSheet , Text , TouchableOpacity } from 'react-native';
import TaskItem from '../TaskItem';
import EditTaskModal from '../modals/EditTaskModal';
import { useEffect, useState } from 'react';

export default function TodoFilterList({task , list}) {
    const [modalVisible , setModalVisible] = useState(false);
    const [selectedItem , setSelectedItem] = useState(null);
    const [swipedTaskId, setSwipedTaskId] = useState(null);
    const [taskUpdateStatus, setTaskUpdateStatus] = useState(false);

    const setSelectedItemForModal = (item)=> {
        setModalVisible(true)
        setSelectedItem(item)
    }

    const closeModal = () => {
        setModalVisible(false)
        setSelectedItem(null)
    }

    return(
        <View style={styles.task}>
            <View style={{marginBottom: 10, flexDirection : 'row' , justifyContent: 'space-between' }}>
                <Text style={[styles.taskText , {fontSize: 20 , marginVertical: 'auto'}]}>{task}</Text>
            </View>
            {list.map((taskItem , index) => (<TaskItem
                item={taskItem}
                key={taskItem.id}
                swipedTaskId={swipedTaskId} 
                setSwipedTaskId={setSwipedTaskId}
                onTaskUpdate={setTaskUpdateStatus}
              />))}
            <EditTaskModal item={selectedItem} closeModal={() => closeModal()} modalVisible={modalVisible} />
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