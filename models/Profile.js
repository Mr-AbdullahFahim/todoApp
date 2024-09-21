export default class Profile {

    constructor(name , color) {
        this.id = Date.now();
        this.name = name;
        this.color = color;
        this.tasks = [];
    }

}