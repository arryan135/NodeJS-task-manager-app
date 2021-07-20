const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");
const { response } = require("express");

const userOneId = new mongoose.Types.ObjectId();

// could be used later for test cases for login, etc
const userOne = {
    _id: userOneId,
    name: "Arryan Malik",
    email: "arryanmalik135@gmail.com",
    password: "thisisthecoolestpass",
    tokens:[{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

// this function run before each test case in this test suite
beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test("Should sign up a new user", async () => {
    const response = await request(app)
        .post("/users")
        .send({
            name: "Arryan",
            email: "arryan@umich.edu",
            password: "thisisagoodpass"
        })
        .expect(201);

        // Assert that the database was changed correctly
        const user = await User.findById(response.body.user._id);
        expect(user).not.toBeNull(); // -> tests that this user exists in db

        // Assertions about the response
        expect(response.body).toMatchObject({
            user: {
                name: "Arryan",
                email: "arryan@umich.edu"
            },
            token: user.tokens[0].token
        });

        // Assestion that the password is not stored as plain text password
        expect(user.password).not.toBe("thisisagoodpass");
        
});

test("Should login existing user", async () => {
    // the user we are trying to log in already exists in the db
    // So when we log in again the `generateAuthToken()` user model method adds a new token to the token object
    const response = await request(app)
        .post("/users/login")
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const user = await User.findById(userOneId);

    // Assert that token in response matches users second token
    expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login non-existant user", async () => {
    await request(app)
        .post("/users/login")
        .send({
            email: "test@test.com",
            password: "thisissomecode"
        })
        .expect(400);
});

test("Should get profile for user", async () => {
    await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`) // to add Authorization header
        .send()
        .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
    await request(app)
        .get("/users/me")
        .send()
        .expect(401);
        // did not set authentication header so the auth middleware will not know if user is authenticated
});

test("Should delete account for user", async () => {
    await request(app)
        .delete("/users/me")
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test("Should not delete account for unauthenticated user", async () => {
    await request(app)
        .delete("/users/me")
        .send()
        .expect(401)
});