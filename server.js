const express = require('express');
const session = require('express-session')
const env = require('dotenv').config()

const app = express();
const routes = require('./routes/fb')


app.listen(process.env.PORT, () => console.log('server ready'));
