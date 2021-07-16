const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});

// User model
const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ("Email is invalid")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
        trim: true,
        validate(value){
            if (value.toLowerCase().includes("password")){
                throw new Error("password cannot contain \"password\"")
            }
        }
    }
});

// const me = new User({
//     name: "    Aryan   ",
//     email: "ARRYAN@UMICH.EDU    ",
//     password: "Password123"
// });

// //save the new user
// me.save().then(() => {
//     console.log(me);
// }).catch(error => {
//     console.log("Error", error)
// })

//task model
const Task = mongoose.model("Task", {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// task creation
// const task = new Task({
//     description: "   Eat lunch"
// });

// task.save().then(() => {
//     console.log("Done ")
// }).catch(error => {
//     console.log(error);
// })