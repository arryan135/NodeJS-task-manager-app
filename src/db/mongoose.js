const mongoose = require("mongoose");

// Connect mongoose to the local database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
});