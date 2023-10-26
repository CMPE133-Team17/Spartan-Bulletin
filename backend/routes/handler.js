const express = require('express');
const router = express.Router();

router.get('/forum', (req, res) => {
	const str = [{
		"name": "Ari",
		"msg": "Forum Post Test",
		"username": "ari.grady"
	}];
	res.end(JSON.stringify(str));
});

router.post('/addPost', (req,res) => {
	res.end('NA');
});

module.exports = router;