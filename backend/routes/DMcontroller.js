import {db} from '../index.js';

import express from 'express';
const router = express.Router();

router.get('/DM', (req, res) => {
    const q = "SELECT * FROM messages";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
});

router.post('/addMsg', (req, res) => {
    const message = req.body.message;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.query(
        'INSERT INTO messages (id, sender, recipient, message, date) VALUES (?, ?, ?, ?, ?)', 
        [0,'hana', 'ari', message, date], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Values Inserted');
            }
    });

});

export default router;