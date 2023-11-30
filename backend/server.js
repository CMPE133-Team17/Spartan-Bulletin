const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'sbulletin',
})


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting user into database:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(201).json({ message: "User registered successfully" });
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    const values = [
        req.body.email,
        req.body.password
    ];
    db.query(sql, [req.body.email, req.body.password ], (err, data) => {
        if (err) {
            console.error("Error inserting user into database:", err);
        }
        if(data.length > 0){
            return res.json("Success");
        } else{
            return res.json("Failure");
        }
    });
});



app.listen(4000, () => {
    console.log('listening on port 4000');
});
