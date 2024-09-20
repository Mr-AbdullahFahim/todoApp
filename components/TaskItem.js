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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function TaskItem({
  item,
  pressEvent,
  onTaskUpdate,
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
        setTask({ ...task, completed: !task.completed , completedTime : !task.completed ? new Date().toUTCString() : null });
        console.log("==========================")
        const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
        await TodoService.updateTask(task, updatedTasks);
        dispatch({ type: "LOAD_TASKS", payload: updatedTasks });
        console.log("toggling status:" , task)
        onTaskUpdate(true);
    };

    const handleDelete = async (id) => {
        const res = await TodoService.deleteTask(id);

        if (!res.success) {
            alert(res.message);
        }

        dispatch({ type: "REMOVE_TASK", payload: id }); 
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
                    <TouchableOpacity onPress={() => pressEvent(item)} style={styles.editDelete}>
                        <FontAwesome6 name="edit" color="white" size={20}/>
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.actionButton,
                        { transform: [{ scale }] },
                    ]}
                >
                    <TouchableOpacity onPress={() => handleDelete(task.id)} style={styles.editDelete}>
                        <FontAwesome6 name="trash-can" color="white" size={20}/>
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
                rightThreshold={70}
                overshootRight={false}
                onSwipeableWillOpen={() => setSwipedTaskId(item.id)} 
                dragOffsetFromRightEdge={30}
            >
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => pressEvent(item)}
                        style={{ flex: 1 }}
                    >
                        <View style={{ display: "flex", flex: 1 }}>
                            <Text style={[styles.taskText, { color: "white", fontSize: 17 }]}>
                                {item.title} [{item.priority}]
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
                                    {format(item.date, "dd MMM")} #{item.category}
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
    width: 40,
    marginLeft:8,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize:12,
    marginTop:4,
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
  editDelete:{
    justifyContent:'center',
    alignItems:'center',
  }
});
