const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbPath = path.join(__dirname, 'db.json');

const usersDb = () => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw new Error(err);
        console.log(JSON.parse(data));
    })
}

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
    res.json(
        {

        }
    )
})




const PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server has successfully started on port ${PORT}!`)
})