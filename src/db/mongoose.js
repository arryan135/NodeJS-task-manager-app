const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

// User model
const User = mongoose.model("User", {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

// create new user
// const me = new User({
//     name: "Arryan",
//     age: 22
// });

// save the new user
// me.save().then(() => {
//     console.log(me);
// }).catch(error => {
//     console.log("Error", error)
// })

//task model
const Task = mongoose.model("Task", {
    description: {
        type: String
    },
    completed: {
        type: Boolean 
    }
});

const task = new Task({
    description: "Do chores",
    completed: false
}).save().then(() => {
    console.log("Done ")
}).catch(error => {
    console.log(error);
})