// MongoClient = gives us access to the function that allows us to perform the CRUD operations
const {MongoClient, ObjectID} = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

// connect to the local server
// args: connectionURL, object that parses that URL, async callback function that returns error and client
// pass useUnifiedTopology to ensure that new server discover and monitor engine is used
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) return console.log("Unable to connect to database");

    const db = client.db(databaseName);

    // insertOne is not asynchronous. Helps insert one document to db
    // db.collection("users").insertOne({
    //     name: "Jenna",
    //     age: "22"
    // }, (error, result) => {
    //     if (error) return console.log("Unable to insert user");

    //     // result.ops gives the array of documents in db
    //     console.log(result.ops);
    // });

    // db.collection("users").insertMany([
    //     {
    //         name: "Jen",
    //         age: 28
    //     },
    //     {
    //         name: "Gunther",
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) return console.log("Unable to insert document");

    //     console.log(result.ops);
    // });

    // db.collection("tasks").insertMany([
    //     {
    //         description: "Feed the cows",
    //         completed: true
    //     },
    //     {
    //         description: "Completed the LSA english language institute requirements",
    //         completed: false
    //     },
    //     {
    //         description: "Plan for personal website2.0",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) console.log("Unable to insert documents");

    //     console.log(result.ops);
    // });
}); 





