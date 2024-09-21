import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  saveNewTask: async function (newTask) {
    let id = await this.getCurrentProfile()
    let currentUser = await this.getProfileObjectById(id)
    const tasks = await this.loadTasks();
    currentUser.tasks.push(newTask);
    await this.updateProfiles(currentUser);
  },

  loadTasks: async function () {
    let id = await this.getCurrentProfile()
    let currentUser = await this.getProfileObjectById(id)
    console.log("currenrt user is => " , currentUser)
    if (currentUser) {
      return currentUser.tasks;
    }
    return [];
  },

  resetTasks: async function () {
    await AsyncStorage.removeItem("taskList");
    await AsyncStorage.removeItem("newUser");
    let id = await this.getCurrentProfile()
    await this.deleteProfile(id)
    await AsyncStorage.removeItem("currentUser");
  },

  deleteTask: async function (taskId) {
    let currentUser = await this.getProfileObjectById((await this.getCurrentProfile()))
    currentUser.tasks = currentUser.tasks.filter((task) => task.id !== taskId);
    await this.updateProfiles(currentUser);
  },

  deleteTask: async function(taskId){
    let currentUser = await this.getProfileObjectById((await this.getCurrentProfile()))
    
    for(let i = 0; i < currentUser.tasks.length; i++){
      if(currentUser.tasks.tasks[i].id == taskId){
        currentUser.tasks.splice(i, 1);
        break
      }
    }

    await this.updateProfiles(currentUser);

  },

  updateTask: async function (updatedTask) {
    let currentUser = await this.getProfileObjectById((await this.getCurrentProfile()))


    for (let i = 0; i < currentUser.tasks.length; i++) {
      if (currentUser.tasks[i].id == updatedTask.id) {
        currentUser.tasks[i] = updatedTask;
        break;
      }
    }
    await this.updateProfiles(currentUser);
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

  getCurrentProfile: async function(){
    const profileId = await AsyncStorage.getItem('currentUser');
    if(profileId){
      return +profileId;
    }
    return null;
  },

  getAllProfiles: async function(){
    const profiles = await AsyncStorage.getItem('profiles');
    if(profiles){
      return JSON.parse(profiles);
    }
    return [];
  },

  setCurrentProfile: async function(id){
    await AsyncStorage.setItem('currentUser', id+"");
  },

  addNewProfile: async function(newProfile) {
    const profiles = await this.getAllProfiles();
    profiles.push(newProfile);
    await AsyncStorage.setItem('profiles', JSON.stringify(profiles));
  },

  deleteProfile: async function(id) {
    const profiles = await this.getAllProfiles();
    const updatedProfiles = profiles.filter((profile) => profile.id!== id);
    await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  },

  getProfileObjectById: async function(id) {
    const profiles = await this.getAllProfiles();
    for(let i = 0; i < profiles.length; i++){
      if(profiles[i].id == id){
        return profiles[i];
      }
    }
    return null;
  },

  updateProfiles: async function(updatedProfile){
    const profiles = await this.getAllProfiles();
    for(let i = 0; i < profiles.length; i++){
      if(profiles[i].id == updatedProfile.id){
        profiles[i] = updatedProfile;
        break
      }
    }
    await AsyncStorage.setItem('profiles', JSON.stringify(profiles));

  }

};
