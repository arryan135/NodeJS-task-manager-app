const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // gives us access to the fucntion that allows us to perform the CRUD operations

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// connect to the local server
// args: connectionURL, object that parses that URL, async callback function that returns error and client
// pass useUnifiedTopology to ensure that new server discover and monitor engine is used
MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) return console.log("Unable to connect to database");
    
}); 





