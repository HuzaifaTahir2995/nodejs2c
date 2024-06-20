const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const users = [];

app.use(express.static(path.join(__dirname, 'files')));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Enter Name</title>
                <link rel="stylesheet" type="text/css" href="/styles.css">
            </head>
            <body>
                <form action="/users" method="POST">
                    <input type="text" name="username" placeholder="Enter your name">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `);
});

app.post('/users', (req, res) => {
    const username = req.body.username;
    if (username) {
        users.push(username);
        res.redirect('/users');
    } else {
        res.send('Error: Username cannot be empty');
    }
});

app.get('/users', (req, res) => {
    let userList = '<ul>';
    for (const user of users) {
        userList += `<li>${user}</li>`;
    }
    userList += '</ul>';

    res.send(`
        <html>
            <head>
                <title>User List</title>
                <link rel="stylesheet" type="text/css" href="/styles.css">
            </head>
            <body>
                <h1>User List</h1>
                ${userList}
                <a href="/">Go back</a>
            </body>
        </html>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});