// import express from 'express';
const express = require('express');
const router = express.Router();
const db = require('../index.js');
// import { db } from '../index.js';



router.get('/forum', (req, res) => {
	const str = [{
		"username": "Ari",
		"post": "There is a cool even happening in front of the SU, on 7th Street! Come and check it out!",
		"date": "11-30-2023"
	}];
	res.end(JSON.stringify(str));
});

router.post('/addPost', (req,res) => {
	res.end('NA');
});

// export default router;
module.exports = router;