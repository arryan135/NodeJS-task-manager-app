require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndDelete("60f1cc41208ee392f967d083").then(task => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(count => {
    console.log("Incomplete Tasks", count);
}).catch(error => {
    console.log(error);
});

