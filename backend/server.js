const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database: 'sbulletin',
});

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
        const values = [name, email, hashedPassword];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting user into database:", err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(201).json({ message: "User registered successfully" });
            }
        });
    } catch (error) {
        console.error("Error processing signup:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = "SELECT * FROM login WHERE `email` = ?";
        const values = [email];

        db.query(sql, values, async (err, data) => {
            if (err) {
                console.error("Error querying database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (data.length > 0) {
                // Compare the hashed password
                const isPasswordValid = await bcrypt.compare(password, data[0].password);

                if (isPasswordValid) {
                    return res.json("Success");
                } else {
                    return res.json("Failure");
                }
            } else {
                return res.json("Failure");
            }
        });
    } catch (error) {
        console.error("Error processing login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});
