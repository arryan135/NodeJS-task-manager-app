require("../src/db/mongoose");
const Task = require("../src/models/task");

// chaining example
// Should throw error as this id doesn't exist
Task.findByIdAndDelete("60f1cc41208ee392f967d083").then(task => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(count => {
    console.log("Incomplete Tasks", count);
}).catch(error => {
    console.log(error);
});

// async await example
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed : false});
    return count;
}

deleteTaskAndCount("60f203dc3391c03a4d8c539d").then(count => {
    console.log("Incomplete tasks :" , count);
}).catch(error => {
    console.log(error);
})
