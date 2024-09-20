import Task from '../models/Todo'
import AsyncStorageService from './AsyncStorageService';
import AyncStorageService from './AsyncStorageService'
import { isSameDay } from 'date-fns';

export default {

    createNewTask : async (title, description, priority , category , date) => {
        
        if(title == '' || description == '' || priority == '' || category == '' || date == null){
            return {
                success: false,
                message: 'All fields are required'
            }
        }
        
        const newTask = new Task(title, description, priority, category , date)
        
        await AyncStorageService.saveNewTask(newTask)
        
        return {
            success: true,
            message: newTask
        }
    },

    deleteTask: async function (taskId) {
        if (taskId) {
            await AsyncStorageService.deleteTask(taskId);
            return {
                success: false,
                message: 'Task deleted successfully'
            }
        }
    },

    updateTask: async (task , tasks) => {

        if(task.title == '' || task.description == '' || task.priority == '' || task.category == '' || task.date == null){
            return {
                success: false,
                message: 'All fields are required'
            }
        }

        await AyncStorageService.updateTask(task)

        return {
            success: true,
            message: tasks
        }

    },

    getTodosByDate : (date , tasks) => {
        const filteredTodos = tasks.filter(task => 
            isSameDay(new Date(task.date), date)
        );

        return filteredTodos

    }

}