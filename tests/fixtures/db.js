const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();

// could be used later for test cases for login, etc
const userOne = {
    _id: userOneId,
    name: "Arryan Malik",
    email: "arryanmalik135@gmail.com",
    password: "thisisthecoolestpass",
    tokens:[{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "Jessica",
    email: "jessica@jess.com",
    password: "thisisjess",
    tokens:[{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id : mongoose.Types.ObjectId(),
    description: "First task",
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id : mongoose.Types.ObjectId(),
    description: "Second task",
    completed: true,
    owner: userOne._id
}

const taskThree = {
    _id : mongoose.Types.ObjectId(),
    description: "Third task",
    completed: true,
    owner: userTwo._id
}


const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
};