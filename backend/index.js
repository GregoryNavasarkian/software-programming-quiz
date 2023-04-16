require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const connectDB = require('./config/db.js');

connectDB(); 

const login = require('./routes/login.js');
const newsletter = require('./routes/newsletter.js');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	// display index.html
	res.sendFile('./public/index.html');
});

app.use('/login', login);
app.use('/newsletter', newsletter);

app.listen(process.env.PORT || 5000, () => {
	console.log('Server started on port 5000');
});
