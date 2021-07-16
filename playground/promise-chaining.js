require("../src/db/mongoose");
const User = require("../src/models/user");

User.findByIdAndUpdate("60f1c8caeabcaa873048b83c", {age: 1}).then(user => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});


