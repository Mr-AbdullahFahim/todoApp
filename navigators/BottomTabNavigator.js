import  React , {useEffect , useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/app/DashboardScreen';
import { DarkTheme } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TodoScreen from '../screens/app/TodoScreen';
import { TodoContext } from '../store/store';
import AsyncStorageService from '../services/AsyncStorageService';
import AboutAppAScreen from '../screens/app/AboutScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProfileService from '../services/ProfileService';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const {state, dispatch} = useContext(TodoContext);

  const loadLocalTasks = async () => {
    try{
      let todos = await AsyncStorageService.loadTasks()
      console.log("data is -> " , todos)
      if(todos){
        dispatch({ type: 'LOAD_TASKS', payload: todos });
      }

      const res = await AsyncStorageService.getCurrentProfile()
      let currentUser = await AsyncStorageService.getProfileObjectById(res)
      
      dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });

      const profiles = await ProfileService.loadProfiles()
      dispatch({ type: 'LOAD_PROFILES', payload: profiles });

      console.log("==============================")
      console.log("profiles -> " , state.profiles )
      
    }catch(err){
      console.log("Error while loading local tasks => ", err)
    }

  }

  useEffect(() => {
    loadLocalTasks();
  } , [])

  useEffect(() => {
    console.log(state)
  } , [state])

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: DarkTheme.colors.card,
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#888888',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="dashboard" size={26} color={color} />
          ),
        }}
        
      />

      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarLabel: 'Todo',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tasks" size={26} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={AboutAppAScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="manage-accounts" size={26} color={color} />
          ),
        }}
      />
    
    </Tab.Navigator>
  );
}
