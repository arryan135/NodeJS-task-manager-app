const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth")
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save(); 
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
router.get("/tasks", auth, async (req, res) => {
    const match = {};

    if (req.query.completed){
        match.completed = req.query.completed === "true";
    }

    try {
        // normal way
        // const tasks = await Task.find({owner: req.user._id});

        // virtual function way
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit), // if limit not provided it is ignored by mongoose
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch(error){
        res.status(500).send(error);
    }
});

router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id});

        if (!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch(error){
        res.status(500).send(error);
    }
});

router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed", "description"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).send({"error": "Invalid Updates"});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task)
            return res.status(404).send();

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        res.send(task);
    } catch(error){
        res.status(500).send(error);
    }
});

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete( {_id: req.params.id, owner: req.user._id});
        if (!task){
            res.status(404).send();
        }
        res.send(task);
    } catch (error){
        res.status(500).send();
    }
});

module.exports = router;