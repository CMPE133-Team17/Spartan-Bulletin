const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


////////////////////////////////////SIGNUP////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

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

//////////////////////////////////////////////////LOG IN/////////////////////////////////////////////////////////////////////////////////////
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = "SELECT id, name, email, password FROM login WHERE `email` = ?";
        const values = [email];

        db.query(sql, values, async (err, data) => {
            if (err) {
                console.error("Error querying database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            if (data.length > 0) {
                const isPasswordValid = await bcrypt.compare(password, data[0].password);

                if (isPasswordValid) {
                    return res.json({ status: "Success", user: { name: data[0].name } });
                } else {
                    return res.json("Failure1");
                }
            } else {
                return res.json("Failure12");
            }
        });
    } catch (error) {
        console.error("Error processing login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//////////////////////////////////////////////////DM PAGE///////////////////////////////////////////////////////////////////////////////////////////
app.post('/api/getMsg', async (req, res) => {

    const roomId = req.body.id;

    console.log(roomId);

    const q = "SELECT * FROM messages WHERE roomId = ?";

            db.query(q, [roomId], (err, data) => {
                if (err) {
                console.log(err);
                return res.json(err);
            }
                return res.json(data);
            })
});

app.get('/api/getFriends', (req, res) => {
    const q = "SELECT * FROM friend_list WHERE user1 = ? OR user2 = ?";

    const user = req.query.username;

    db.query(q, [user, user],(err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    })
});

app.post('/api/addMsg', (req, res) => {
    const message = req.body.message;
    const current = req.body.username;
    const friend = req.body.friend;
    const room = req.body.id;
    console.log(room);

    db.query(
        'INSERT INTO messages (sender, recipient, date, message, roomId) VALUES (?, ?, NOW(), ?, ?)', 
        [current, friend, message, room], 
        (err, result) => {
            if(err) {
                console.log(err);
            } else {
                console.log('Values Inserted');
            }
    });
});
///////////////////////////////////////////////////////FORUM PAGE/////////////////////////////////////////////////////////////////////////

app.get('/api/getForumPosts', (req, res) => {
    const q = 'SELECT * FROM forum_post ORDER BY timestamp DESC';

    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

app.get('/api/getForums', (req, res) => {
    const q = "SELECT * FROM forums ORDER BY date";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
    
})

app.get('/api/getClubs', (req, res) => {
    const q = "SELECT * FROM clubs";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
})

app.put('/api/checkFriendList', (req, res) => {
    const user = req.body.user;
    const friend = req.body.fren;
    console.log(user, friend);

    const q = "SELECT * FROM friend_list WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)";
    db.query(q, [user, friend, friend, user], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log(data);
            if (data.length > 0) {
                const friendship = true;
                res.json({friendship});
            } else {
                const friendship = false;
                res.json({friendship});
            }
            
        }
    });
});

app.post('/api/getInterests', (req, res) => {
    const curr = req.body.curr;

    const q = "SELECT clubname FROM interests WHERE username = ?";
    db.query(q, [curr], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error fetching interests' });
        } else {
            res.json(data);
        }
    });
});

app.post('/api/addForumPost', (req, res) => {
    const user = req.body.user;
    const content = req.body.text;
    const url = req.body.img;
    if (url) {
        const q = 'INSERT INTO forum_post (id, username, content, image, timestamp) VALUES (0, ?, ?, ?, NOW())';
        db.query(q, [user, content, url], (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.json(data);
            }
        })
    } else {
        const q = 'INSERT INTO forum_post (username, content, timestamp) VALUES (?, ?, NOW())';
        db.query(q, [user, content], (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.json(data);
            }
        })
    }
})

app.post('/api/addNewForum', (req, res) => {
    const user = req.body.user;
    const club = req.body.club;
    const title = req.body.title;

    const q = 'INSERT INTO forums (title, clubname, date) VALUES (?, ?, CURDATE())';
    db.query(q, [title, club], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error inserting data');
        } else {
            res.json(data);
        }
    });
    
});

app.post('/api/addFriend', (req, res) => {
    const user = req.body.user;
    const friend = req.body.fren;

    const q = 'INSERT INTO friend_list (user1, user2) VALUES (?, ?)';
    db.query(q, [user, friend], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error inserting data');
        } else {
            res.json(data);
        }
    })
})

app.post('/api/deleteFriend', (req, res) => {
    const user = req.body.user;
    const friend = req.body.fren;

    const q = "DELTE FROM friend_list WHERE (user1 = ? AND user2 = ?) OR (user1 = ? AND user2 = ?)";
    db.query(q, [user, friend, friend, user], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting data');
        } else {
            res.json(data);
        }
    })
})
///////////////////////////////////////////////////////////BULLETIN////////////////////////////////////////
app.get('/bulletin/posts', async (req, res) => {
    try {
        const { name } = req.query;

        // Assuming the request contains all necessary information including club_name
        const postsQuery = "SELECT post_id, content, user_id, timestamp, building, room_number, club_name, name FROM posts";

        db.query(postsQuery, '', async (err, postsData) => {
            if (err) {
                console.error("Error querying posts from database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }

            const postsWithDetails = postsData.map(post => ({
                post_id: post.post_id,
                content: post.content,
                user_id: post.user_id,
                timestamp: post.timestamp,
                building: post.building,
                room_number: post.room_number,
                club_name: post.club_name,
                name: post.name
            }));

            res.status(200).json({ posts: postsWithDetails });
        });
    } catch (error) {
        console.error("Error processing posts request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/bulletin/createPost', async (req, res) => {
    try {
        console.log(req.body); 
        const { content, building, roomNumber, email, userId, name, clubName } = req.body;
        const sql = "INSERT INTO posts (content, building, room_number, user_id, name, club_name) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [content, building, roomNumber, userId, name, clubName];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting post into database:", err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                console.log("Post created successfully");
                res.status(201).json({ message: "Post created successfully" });
            }
        });
    } catch (error) {
        console.error("Error processing createPost request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.get('/bulletin/clubs', async (req, res) => {
    try {
        const sql = "SELECT id, name FROM clubs";  
        db.query(sql, (err, data) => {
            if (err) {
                console.error("Error querying clubs from database:", err);
                res.status(500).json({ error: "Internal Server Error" });
            } else {
                res.status(200).json({ clubs: data });
            }
        });
    } catch (error) {
        console.error("Error processing clubs request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

///////////////////////////////////////////////////////////OTHER STUFFS////////////////////////////////////////
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'test'
});
  
module.exports = db;

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });

    socket.on('chat message', (msg) => {
        console.log('Received message:', msg);
        io.emit('chat message', msg);
    });

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_mssage', (data) => {
        socket.to(data.room).emit('receive_message', data);
    })
});

const PORT = 4000; // Backend routing port
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

