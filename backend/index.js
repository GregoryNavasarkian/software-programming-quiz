const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const login = require('./routes/login.js');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	// display index.html
	res.sendFile('./public/index.html');
});

app.use('/login', login);

app.listen(process.env.PORT || 5000, () => {
	console.log('Server started on port 5000');
});
