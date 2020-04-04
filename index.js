let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
var session = require('express-session')
let app = express();
var request = require('request');


app.listen(80, () => console.log("Server is running"));