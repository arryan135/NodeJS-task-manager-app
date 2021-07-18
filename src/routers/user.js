const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload files with formats of .jpg, jpeg, .png"));
        }

        // accept the file upload
        cb(undefined, true);
    }
});

// sign up route
router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(error){
        res.status(400).send(error);
    }
});

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch(error){
        res.status(400).send();
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch(error){
        res.status(500).send();
    }
});

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(error){
        res.status(500).send();
    }
});

// /users/me has to be before /users/:id to prevent conflict in route name matching
router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation){
        return res.status(400).send({"error": "Invalid Updates"});
    }

    try {
        // to ensure that we run our middleware while updating 
        const user = req.user;
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        // mongoose way that bypasses the middleware
        // // new:true returns the new user as opposed to the existing one found before the update 
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // no user with the given id
        res.send(user);
    } catch (error){
        res.status(500).send(error);
    }
});

router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(404).send({error: error.message});
});

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(error){
        res.status(500).send();
    }
});


module.exports = router;