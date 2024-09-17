import Task from '../models/Todo'
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


    deleteTask: async(id , tasks) => {
        const updatedTasks = tasks.filter(t => t.id !== id);
        await AyncStorageService.deleteTask(id)
        return {
            success: true,
            message: updatedTasks
        }
    },

    updateTask: async (task , tasks) => {

        if(task.title == '' || task.description == '' || task.priority == '' || task.category == '' || task.date == null){
            return {
                success: false,
                message: 'All fields are required'
            }
        }
        

        for(let i = 0; i < tasks.length; i++){

            if(tasks[i].id == task.id){
                tasks[i] = task
                break
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