const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mongoose wraps the second object argument in a schema by itself 
// We are doing this here explicitly
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user.id.toString()}, "thisismynewproject");
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user)
        throw new Error("Unable to login");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        throw new Error("Unable to login");

    return user;
}

// middleware is a function that runs before or after a mongoose fucntionality takes place.
// in our case we want to run our password hashing function before a new user is saved
// functions available methods on `userSchema`: pre -> before an event; post -> after an event
// the second argument should use a normal function as we need `this` and the arrow fucntion doesn't bind `this`
userSchema.pre("save", async function(next){
    // the particular user being saved
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    // if next is not called mongoose thinks that we are still performing an opertion 
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;