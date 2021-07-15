// MongoClient = gives us access to the function that allows us to perform the CRUD operations
const {MongoClient, ObjectID} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// connect to the local server
// args: connectionURL, object that parses that URL, async callback function that returns error and client
// pass useUnifiedTopology to ensure that new server discover and monitor engine is used
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    console.log("find task by _id")
    db.collection("tasks").findOne({ _id: new ObjectID("60f0948d7b14fa4a26d7128d") }, (error, task) => {
        if (error) console.log("Unable to find document");

        console.log(task);
    });

    console.log("find task by document attribute `completed`")
    // find returns a cursor instead of having a callback
    db.collection("tasks").find({completed: false}).toArray((error, tasks) => {
        if (error) console.log("Unable to find document");

        console.log(tasks);
    })
}); 





