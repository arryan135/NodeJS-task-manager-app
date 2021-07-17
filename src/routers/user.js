const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch(error){
        res.status(400).send(error);
    }
});

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        if (!user)
            return res.status(404).send();
        res.send(user);
    } catch(error){
        res.status(500).send(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(error){
        res.status(500).send(error);
    }
});

router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation){
        return res.status(400).send({"error": "Invalid Updates"});
    }

    try {
        // to ensure that we run our middleware while updating 
        const user = await User.findById(req.params.id);
        updates.forEach(update => user[update] = req.body[update]);

        // mongoose way that bypasses the middleware
        // // new:true returns the new user as opposed to the existing one found before the update 
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // no user with the given id
        if (!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (error){
        res.status(500).send(error);
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user){
            res.status(404).send();
        }
        res.send(user);
    } catch(error){
        res.status(500).send();
    }
});


module.exports = router;