const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");

// could be used later for test cases for login, etc
const userOne = {
    name: "Arryan Malik",
    email: "arryanmalik135@gmail.com",
    password: "thisisthecoolestpass"
}

// this function run before each test case in this test suite
beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test("Should sign up a new user", async () => {
    await request(app).post("/users").send({
        name: "Arryan",
        email: "arryan@umich.edu",
        password: "thisisagoodpass"
    }).expect(201)
});

test("Should login existing user", async () => {
    await request(app).post("/users/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test("Should not login non-existant user", async () => {
    await request(app).post("/users/login").send({
        email: "test@test.com",
        password: "thisissomecode"
    }).expect(400);
});

