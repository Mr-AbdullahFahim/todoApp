import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CheckButton from "./CheckButton";
import { format } from "date-fns";
import { Swipeable } from "react-native-gesture-handler";
import TodoService from "../services/TodoService";
import { TodoContext } from "../store/store";

export default function TaskItem({
  item,
  pressEvent,
  onTaskUpdate,
  onDelete,
  onUpdate,
  swipedTaskId,
  setSwipedTaskId
}) {
  const { state, dispatch } = useContext(TodoContext);
  const [task, setTask] = useState(item);
  const [modalVisible, setModalVisible] = useState(false);
  const swipeableRef = useRef(null);

  useEffect(() => {
    if (swipedTaskId !== item.id && swipeableRef.current) {
      swipeableRef.current.close();
    }
  }, [swipedTaskId]);

  const toggleStatus = async () => {
    setTask({ ...task, completed: !task.completed });
    const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    await TodoService.updateTask(task, updatedTasks);
    dispatch({ type: "LOAD_TASKS", payload: updatedTasks });
    onTaskUpdate(true);
  };

  const handleDelete = async (id) => {
    const res = await TodoService.deleteTask(task.id);

    if (!res.success) {
      alert(res.message);
    }

    dispatch({ type: "REMOVE_TASK", payload: task.id }); 
    onTaskUpdate(true);
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.actionContainer}>
        <Animated.View
          style={[styles.actionButton, { transform: [{ scale }] }]}
        >
          <TouchableOpacity onPress={() => onUpdate(task)}>
            <Text style={styles.actionText}>Update</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.actionButton,
            { backgroundColor: "#8875FF", transform: [{ scale }] },
          ]}
        >
          <TouchableOpacity onPress={() => handleDelete(task.id)}>
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        rightThreshold={-150}
        overshootRight={false}
        onSwipeableWillOpen={() => setSwipedTaskId(item.id)} 
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{ flex: 1 }}
          >
            <View style={{ display: "flex", flex: 1 }}>
              <Text style={[styles.taskText, { color: "white", fontSize: 17 }]}>
                {item.title}
              </Text>
              <View
                style={{ display: "flex", marginTop: 5, flexDirection: "row" }}
              >
                <AntDesign
                  name="calendar"
                  size={18}
                  color="gray"
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={[
                    styles.taskText,
                    { fontWeight: "bold", color: "gray", fontSize: 14 },
                  ]}
                >
                  {format(item.date, "dd MMM")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <CheckButton
            pressEvent={toggleStatus}
            taskItem={
              state.tasks.find((gotTask) => gotTask.id === task.id) || {}
            }
          />
        </View>
      </Swipeable>
     {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{task.title}</Text>
            <Text style={styles.modalText}>
              Description: {task.description}
            </Text>
            <Text style={styles.modalText}>
              Date: {format(task.date, "dd MMM yyyy")}
            </Text>
            <Text style={styles.modalText}>Priority: {task.priority}</Text>
            <Text style={styles.modalText}>Category: {task.category}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>*/}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingVertical: 20,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#1F1F1F",
    borderLeftWidth: 15,
    borderLeftColor: "#8875FF",
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 15,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    borderRadius: 5,
    backgroundColor: "#8875FF",
    marginLeft: 10,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
  taskText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 15,
    backgroundColor: "#CFC7E2",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8875FF",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
