const request = require("supertest");
const app = require("../src/app");

test("Should sign up a new user", async () => {
    await request(app).post("/users").send({
        name: "Arryan",
        email: "arryan@umich.edu",
        password: "thisisagoodpass"
    }).expect(201)
});

