const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const {userOneId, userOne, setupDatabase} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
    const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "From my jest task tests file"
        })
        .expect(201);
    //check if task is present in db
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false)
});



