const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mysql = require('mysql');
const { Server } = require('socket.io');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root', // default username
	password: 'root123',//password of your choice
	database: 'test' //name of the schema/database
})

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);


const PORT = 4000; // Backend routing port
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});