const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbPath = path.join(__dirname, 'db.json');


const updateDb = (object) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw new Error(err);
        const users = JSON.parse(data) || [];
        users.push(object);

        fs.writeFile(dbPath, JSON.stringify(users), (err) => {
            if (err) throw new Error(err);
        })
    })
}

app.get('/users', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw new Error(err);

        if (JSON.parse(data).length) {
            res.json(
                {
                    data: JSON.parse(data)
                }
            )
        } else {
            console.log('No users!');
            res.json(
                {
                    data: 'No Users!'
                }
            )
        }
    })
})

app.post('/users', (req, res) => {
    const user = req.body;
    if (user.name.length > 3 && user.age > 0) {
        console.log('Valid')
        updateDb(user);
        res.status(201).json({
            message: `User created!`,
            body: user
        })
    } else {
        res.status(401).json({
            message: 'Invalid!'
        })
    }
})

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    fs.readFile(dbPath, (err, data) => {
        if (err) throw new Error(err);

        let users = JSON.parse(data) || [];
        if (users.length && users[+id - 1]) {
            users.splice(+id - 1, 1);

            fs.writeFile(dbPath, JSON.stringify(users), (err) => {
                if (err) throw new Error(err);
                res.status(201).json({
                    message: 'User deleted!'
                })
            })
        } else {
            res.status(401).json({
                message: 'Bad request!'
            })
        }

    })
})

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    fs.readFile(dbPath, (err, data) => {
        if (err) throw new Error(err);

        const users = JSON.parse(data);
        if (users[+id - 1]) {
            users[+id - 1] = req.body

            fs.writeFile(dbPath, JSON.stringify(users), (err) => {
                if (err) throw new Error(err);
                res.status(201).json({
                    message: 'User updated!'
                })
            })
        } else {
            res.status(401).json({
                message: 'Bad request!'
            })
        }
    })
})

const PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server has successfully started on port ${PORT}!`)
})