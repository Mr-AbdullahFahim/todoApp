export default class Todo {

    constructor(title, description, priority , category , date) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.completed = false;
        this.date = new Date(date).toUTCString()
        this.completedTime = null;
    }

}