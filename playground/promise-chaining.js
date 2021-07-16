require("../src/db/mongoose");
const User = require("../src/models/user");

// chaining example

// User.findByIdAndUpdate("60f1c8caeabcaa873048b83c", {age: 1}).then(user => {
//     console.log(user);
//     return User.countDocuments({age: 1});
// }).then(result => {
//     console.log(result);
// }).catch(error => {
//     console.log(error);
// });


// async-await example

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return {user, count};
}

updateAgeAndCount("60f1c8caeabcaa873048b83c", 18).then(result => {
    console.log("User updated: ", result.user);
    console.log("count with age : ", result.count);
}).catch(error => {
    console.log(error);
})



