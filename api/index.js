
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cors());

// Middleware

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));


const rutas = require('./routes/rutas.js');

app.use('/', rutas);


module.exports = app;

/*
module.exports = (req, res) => {
    res.send('Hola Mundo!')
}
*/
