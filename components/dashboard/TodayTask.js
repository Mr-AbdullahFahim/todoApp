import React, { useState , useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import TaskItem from '../TaskItem';
import {TodoContext} from '../../store/store';
import EditTaskModal from '../modals/EditTaskModal';

export default function TodayTask({ task, list, searchedText, onTaskUpdate, onUpdatingTask }) {

  const [swipedTaskId, setSwipedTaskId] = useState(null); 
  const [editModalVisible , setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null)
  const { state } = useContext(TodoContext);

  function checkSearch(text) {
    return text.includes(searchedText.toLowerCase().trimStart());
  }

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setSelectedItem(null);
  }

  const selectTaskItemEvent = (item) => {
    setEditModalVisible(true);
    setSelectedItem(item);
  }

  let today = new Date();
  return (
    <View style={styles.task}>
      <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.taskText, { fontSize: 20, marginVertical: 'auto' }]}>
          {task == 1 ? "Today's tasks" : task == 2 ? "Tomorrow's tasks" : 'Upcoming Tasks'}
        </Text>
      </View>

      <EditTaskModal item={selectedItem} modalVisible={editModalVisible} closeModal={handleCloseEditModal} />

      {task === 1
        ? state.tasks.map((singletask) => {
            const taskDate = new Date(singletask.date);
            return taskDate.toLocaleDateString() === today.toLocaleDateString() && checkSearch((singletask.title).toLowerCase()) ? (
              <TaskItem
                pressEvent={selectTaskItemEvent}
                item={singletask}
                key={singletask.id}
                onTaskUpdate={onTaskUpdate}
                swipedTaskId={swipedTaskId} 
                setSwipedTaskId={setSwipedTaskId} 
                onUpdate={(task)=>onUpdatingTask(task)}
              />
            ) : null;
          })
        : task === 2
        ? state.tasks.map((singletask) => {
            const taskDate = new Date(singletask.date);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return taskDate.toLocaleDateString() === tomorrow.toLocaleDateString() && checkSearch(singletask.title.toLowerCase()) ? (
              <TaskItem
                pressEvent={selectTaskItemEvent}
                item={singletask}
                key={singletask.id}
                onTaskUpdate={onTaskUpdate}
                swipedTaskId={swipedTaskId}
                setSwipedTaskId={setSwipedTaskId}
                onUpdate={(task)=>onUpdatingTask(task)}
              />
            ) : null;
          })
        : state.tasks.map((singletask) => {
            const taskDate = new Date(singletask.date);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return taskDate.toLocaleDateString() > tomorrow.toLocaleDateString() && checkSearch(singletask.title.toLowerCase()) ? (
              <TaskItem
                pressEvent={selectTaskItemEvent}
                item={singletask}
                key={singletask.id}
                onTaskUpdate={onTaskUpdate}
                swipedTaskId={swipedTaskId}
                setSwipedTaskId={setSwipedTaskId}
                onUpdate={(task)=>onUpdatingTask(task)}
              />
            ) : null;
          })}
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    marginVertical: 10,
    borderRadius: 5,
  },
  taskText: {
    color: 'white',
    fontSize: 20,
  },
});
