const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");

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

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
};