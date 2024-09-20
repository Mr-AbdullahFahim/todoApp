import React, { useState, useContext, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarPicker from "./CalendarView";
import { ScrollView } from "react-native-gesture-handler";
import TodoService from "../../services/TodoService";
import { TodoContext } from "../../store/store";
import SelectableButton from "../SelectableButton";
import MagicWandButton from "../MagicWandButton";
import LoadingModal from "./LoadindModal";
import AIService from "../../services/AIService";

export default function CreateNewTaskModal() {
  const { state, dispatch } = useContext(TodoContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading , setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    date:new Date(),
  });

  useEffect(() => {
    // console.log("state date : ", state.tasks);
  }, [state]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAISuggestion = async () => {
    if (formData.title == '') return;
    setIsLoading(true)
    const res = await AIService.giveTaskCreationSuggestions(formData.title)
    const resultObj = JSON.parse(res.output)
    setFormData({ ...formData, priority: resultObj.priority , description : resultObj.description , category: resultObj.category});
    setIsLoading(false)
  }

  const handleCreateTask = async () => {
    const res = await TodoService.createNewTask(
      formData.title,
      formData.description,
      formData.priority,
      formData.category,
      formData.date
    );

    if (!res.success) {
      alert(res.message);
      return;
    }
    dispatch({ type: "ADD_TASK", payload: res.message });
    alert("New task added successfully");
    setFormData({
      title: "",
      description: "",
      category: "",
      priority: "",
      date: new Date(),
    });

  };

  const selectPriority = (text) => {
    setFormData({ ...formData, priority: text });
  };

  const selectCategory = (text) => {
    setFormData({ ...formData, category: text });
  };

  const selectDate = (newDate) => {
    const correctedDate = new Date(newDate);
    setFormData({ ...formData, date: correctedDate });
  };

  return (
    <View>
      <Pressable
        style={{ marginVertical: "auto", marginRight: 10 }}
        onPress={openModal}
      >
        <Ionicons name="add-circle" size={28} color="white" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={{ display: "flex", justifyContent: "flex-start" }}
              onPress={closeModal}
            >
              <Ionicons name="close-circle" size={28} color="white" />
            </Pressable>
            <Text style={styles.headerText}>Create New Task</Text>
          </View>

          <ScrollView style={{ paddingBottom: 20 }}>
            <View style={styles.calendarArea}>
              <CalendarPicker setDate={selectDate} />
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={[styles.titleText , {marginVertical : 'auto'}]}>Schedule</Text>
            </View>

            <View style={{ marginTop: 20 }}>
              
              <View style={{ display : 'flex' , flexDirection : 'row' , justifyContent : 'space-between' , width : '100%' }}>
                <TextInput
                  style={{
                    backgroundColor: "#181818",
                    padding: 10,
                    color: "white",
                    borderRadius: 5,
                    height: 40,
                    width : '80%',
                    marginVertical : 'auto',
                  }}
                  size="large"
                  placeholder="Title"
                  onChangeText={(text) =>
                    setFormData({ ...formData, title: text })
                  }
                  value={formData.title}
                />                
                <MagicWandButton pressEvent={handleAISuggestion}  />
              </View>
              

              <View style={{ marginTop: 20 }}>
                <TextInput
                  style={{
                    color: "white",
                    backgroundColor: "#181818",
                    minHeight: 120,
                    paddingHorizontal: 10,
                    padding: 15,
                    borderRadius: 5,
                  }}
                  size="large"
                  placeholder="Description"
                  multiline={true}
                  numberOfLines={10}
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                  value={formData.description}
                />
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.titleText}>Priority</Text>
            </View>

            <View style={styles.priority}>
              <SelectableButton
                pressEvent={() => selectPriority("High")}
                selected={formData.priority == "High"}
                text={"High"}
              />
              <SelectableButton
                pressEvent={() => selectPriority("Medium")}
                padding={30}
                selected={formData.priority == "Medium"}
                text={"Medium"}
              />
              <SelectableButton
                pressEvent={() => selectPriority("Low")}
                selected={formData.priority == "Low"}
                text={"Low"}
              />
            </View>

            <View style={{ marginTop: 40 }}>
              <Text style={styles.titleText}>Category</Text>
            </View>

            <View style={styles.priority}>
              <SelectableButton
                pressEvent={() => selectCategory("Work")}
                selected={formData.category == "Work"}
                text={"Work"}
              />
              <SelectableButton
                pressEvent={() => selectCategory("Study")}
                selected={formData.category == "Study"}
                text={"Study"}
              />
              <SelectableButton
                pressEvent={() => selectCategory("Personal")}
                padding={20}
                selected={formData.category == "Personal"}
                text={"Personal"}
              />
            </View>

            <TouchableOpacity
              onPress={handleCreateTask}
              style={{
                backgroundColor: "#D682B9",
                padding: 15,
                marginTop: 35,
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>Create Task</Text>
            </TouchableOpacity>
          </ScrollView>
            
          <LoadingModal modalVisible={isLoading}  />

        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 15,
  },

  header: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 50,
  },

  headerText: {
    justifyContent: "center",
    color: "white",
    fontSize: 20,
    marginVertical: "auto",
    marginLeft: 50,
  },

  calendarArea: {
    marginVertical: 30,
  },

  titleText: {
    color: "white",
    fontSize: 20,
  },
  priority: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
});
