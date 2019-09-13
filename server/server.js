const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors())
//STATIC FOLDER
app.use(express.static(path.join(__dirname,'../client/build')));

// Body Parser Middleware
app.use(bodyParser.json());

//app.get('/', (req, res) => res.send('Hello World!'));

app.get('/hello', (req, res) => res.json({ greeting: "hello how are you today?" }));

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
})