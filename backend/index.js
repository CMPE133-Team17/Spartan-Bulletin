// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const { Server } = require('socket.io');

// const routesHandler = require('./routes/handler.js');
// const dmRoute = require('./routes/DMcontroller.js');

import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from 'cors';

import routesHandler from './routes/handler.js';
import dmRoute from './routes/DMcontroller.js';

export const db = mysql.createPool({
	host: 'localhost',
	user: 'root', // default username
	password: 'root123',//password of your choice
	database: 'test' //name of the schema/database
})

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routesHandler);
app.use('/', dmRoute);


const PORT = 4000; // Backend routing port
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});