import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  saveNewTask: async function (newTask) {
    const tasks = await this.loadTasks();
    tasks.push(newTask);
    await AsyncStorage.setItem("taskList", JSON.stringify(tasks));
  },

  loadTasks: async function () {
    const tasks = await AsyncStorage.getItem("taskList");
    if (tasks) {
      return JSON.parse(tasks);
    }
    return [];
  },

  resetTasks: async function () {
    await AsyncStorage.removeItem("taskList");
    await AsyncStorage.removeItem("newUser");
  },

  deleteTask: async function (taskId) {
    const taskList = await this.loadTasks();
    const updatedTasks = taskList.filter((task) => task.id !== taskId);

    await AsyncStorage.setItem("taskList", JSON.stringify(updatedTasks));
  },

  deleteTask: async function(taskId){
    const tasks = await this.loadTasks();
    
    for(let i = 0; i < tasks.length; i++){
      if(tasks[i].id == taskId){
        tasks.splice(i, 1);
        break
      }
    }

    await AsyncStorage.setItem('taskList', JSON.stringify(tasks));

  },

  updateTask: async function (updatedTask) {
    const tasks = await this.loadTasks();

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == updatedTask.id) {
        tasks[i] = updatedTask;
        break;
      }
    }

    await AsyncStorage.setItem("taskList", JSON.stringify(tasks));
  },

  isNewUser: async function () {
    const isNewUser = await AsyncStorage.getItem("newUser");
    if (!isNewUser) {
      await AsyncStorage.setItem("newUser", "false");
      return true;
    } else {
      return false;
    }
  },
};
