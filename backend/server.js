const express = require("express");
const server = express();
const bcrypt = require("bcrypt");
const secretKey = "secretKey123";
const jwt = require('jsonwebtoken');
const cors = require('cors');
server.use(cors());
require('./index')
server.use(express.json());
const mongo_url = "mongodb://localhost:27017/SMS";
const mongoose = require("mongoose");
mongoose.connect(mongo_url)
    .then(() => console.log("mongodb connection established "))
    .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    pswd: String,
    role: String
});
const studentModel = mongoose.model("user", userSchema);

function authenticator(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken) {
        req.user = decodedToken; // Save the decoded token in the request object
        next();
    } else {
        next(new Error("Not a Valid user"));
    }
}


server.post("/signup", async (req, res) => {
    let { name, pswd, role } = req.body;

    const alreadyExist = await studentModel.findOne({ name: req.body.name });
    if (alreadyExist)
        res.status(500).send("User already Exists");
    else {
        const hashedPassword = await bcrypt.hash(pswd, 10);
        let user = new studentModel({ name: name, pswd: hashedPassword, role: role });
        user.save();
        const token = jwt.sign({ name: user.name, role: user.role }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    }
});



server.post('/login', async (req, res) => {
    const { name, pswd } = req.body;
    const user = await studentModel.findOne({ name: name });

    if (!user) {
        return res.status(404).send('User not found');
    }

    try {
        const passwordMatch = await bcrypt.compare(pswd, user.pswd);

        if (passwordMatch) {
            const token = jwt.sign({ name: user.name, role: user.role }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ token, user });
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

server.use(authenticator);


server.get("/api", authenticator, (req, res) => {
    const userRole = req.user.role;
    if (userRole === "student") {
        // Student-specific functionality
        res.send("Student functionality");
    } else if (userRole === "teacher") {
        // Teacher-specific functionality
        res.send("Teacher functionality");
    } else if (userRole === "administrator") {
        // Administrator-specific functionality
        res.send("Administrator functionality");
    } else if (userRole === "parent") {
        // Parent-specific functionality
        res.send("Parent functionality");
    } else {
        res.status(403).send("Forbidden");
    }
});


// // Routes
// const academicRouter = require('./Routes/academicRouter');
// const feeRouter = require('./Routes/feeRouter');
// const gradeRouter = require('./Routes/gradeRouter');
// const staffRouter = require('./Routes/staffRouter');
// const studentRouter = require('./Routes/studentRouter');

// server.use('/api/academic', academicRouter);
// server.use('/api/fee', feeRouter);
// server.use('/api/grade', gradeRouter);
// server.use('/api/staff', staffRouter);
// server.use('/api/student', studentRouter);

server.listen(3007, () => {
    console.log("Server has Started");
});