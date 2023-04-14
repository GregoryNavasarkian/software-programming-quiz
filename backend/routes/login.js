const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Login page');
});

router.post('/', (req, res) => {
	res.status(200).json({ message: 'Login successful' });
});

module.exports = router;