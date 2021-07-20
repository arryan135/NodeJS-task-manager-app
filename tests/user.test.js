const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user")

// this function run before each test case in this test suite
beforeEach(async () => {
    await User.deleteMany();
});

test("Should sign up a new user", async () => {
    await request(app).post("/users").send({
        name: "Arryan",
        email: "arryan@umich.edu",
        password: "thisisagoodpass"
    }).expect(201)
});

