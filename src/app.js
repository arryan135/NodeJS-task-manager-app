const express = require("express");
// makes sure that mongoose connexts to the database
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// parse incoming json to js object 
app.use(express.json());
app.use(userRouter); // to register the new router
app.use(taskRouter);

module.exports = app;