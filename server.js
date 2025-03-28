const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(logger);

const users = [];
const SECRET_KEY = 'your-secret-key';

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/Public/index.html");
});

app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(function(u) {
        return u.username === username;
    });

    if (userExists) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
    users.push({
        username: username,
        password: password,
        token: token
    });

    res.json({
        message: "You are signed up",
        token: token
    });
});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(function(u) {
        return u.username === username && u.password === password;
    });

    if (user) {
        const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
        user.token = token;
        res.json({
            message: "You are signed in",
            token: token
        });
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
});

app.get("/me", authenticateToken, function(req, res) {
    res.json({ username: req.user.username });
});

app.use(function(req, res) {
    res.status(404).send(`<!DOCTYPE html>...`);
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
