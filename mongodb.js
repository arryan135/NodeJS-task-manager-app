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

    //update one
    // db.collection("users").update({
    //     _id : new ObjectID("60f0922965e6b742c617c619")
    // }, {
    //     $set: {
    //         name: "Harry"
    //     },
    //     $inc:{
    //         age: 11
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error);
    // });

    // update many 
    db.collection("tasks").updateMany({}, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}); 





