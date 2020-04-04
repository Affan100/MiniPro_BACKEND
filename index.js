let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
var session = require('express-session')
let app = express();
var request = require('request');
const FB = require('./fackbook');
const env = require('dotenv').config()
const authRoutes = require('./routes/auth')
const fbRoutes = require('./routes/fb')

app.use(cors({ origin: ['http://localhost:3000'], methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));

/* session*/
app.use(session({
    secret: 'keyboard cat', cookie: { maxAge: 60000 },
    resave: false, saveUninitialized: false
}))

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let products = [
    {
        'id': 0, 'Productname': 'Mask', 'price': 300, 'img': 'https://scontent.fhdy4-1.fna.fbcdn.net/v/t1.0-9/90188733_2504026246477812_2792406922031005696_o.jpg?_nc_cat=101&_nc_sid=110474&_nc_eui2=AeGzHVIjCOv0byztGAw-RLXDuOf3Zavebae45_dlq95tpwiTGcQWz18HRZrZhEoSJ0RjvfzgANnARg6KX8krpgZb&_nc_oc=AQmQLUY1Szmt2DAYP9BKD-xSdYf6hBOOaQ8tefik__KgGxqUTOlqGEdlQGLfPTX7_bQ&_nc_ht=scontent.fhdy4-1.fna&oh=e151e78f9549b6f607660e475ef8e72b&oe=5EAE696E'
    },
    {
        'id': 1, 'Productname': 'Compression fabric', 'price': 200, 'img': 'https://scontent.fhdy4-1.fna.fbcdn.net/v/t1.0-9/11295688_1616882231858889_3733436626993473123_n.jpg?_nc_cat=109&_nc_sid=dd9801&_nc_eui2=AeF2r3cUxU722YElM85BABJcg5AAZtcSpZKDkABm1xKlkjM1q8auBJ7xF4pEZjHEVvQ0XEMFGAA3DFzp_pcLTWbY&_nc_oc=AQlo3kQG2IBZbDmSFibdo22i1f3wYSTkk-KgVczdx4AxbjBRKG8X854_8VlJOToZ47o&_nc_ht=scontent.fhdy4-1.fna&oh=4b13583e1e275defcecae66c3f8ca6f4&oe=5EACD0CC'
    },
];

router.route('/product')
    // get all bears
    .get((req, res) => res.json(products))
    // insert a new bear
    .post((req, res) => {
        var product = {};
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 0;
        product.name = req.body.name
        product.weight = req.body.weight
        product.img = req.body.img
        products.push(product);
        res.json({ message: 'Product created!' })
    })
router.route('/product/:product_id')
    .get((req, res) => {
        let id = req.params.product_id
        let index = products.findIndex(product => (product.id === +id))
        res.json(products[index])                   // get a bear
    })
    .put((req, res) => {                               // Update a bear
        let id = req.params.product_id
        let index = products.findIndex(product => (product.id === +id))
        products[index].name = req.body.name;
        products[index].weight = req.body.weight;
        products[index].img = req.body.img;
        res.json({ message: 'Product updated!' + req.params.product_id });
    })
    .delete((req, res) => {                   // Delete a bear
        // delete     bears[req.params.bear_id]
        let id = req.params.product_id
        let index = products.findIndex(product => product.id === +id)
        products.splice(index, 1)
        res.json({ message: 'Product deleted: ' + req.params.product_id });
    })

router.route('/auth')
    .get(authRoutes.index);
router.route('/auth/logout')
    .get(authRoutes.logout);
router.route('/auth/facebook')
    .get(fbRoutes.loginUrl);
router.route('/auth/facebook/login/callback')
    .get(fbRoutes.loginCallback);


app.use("*", (req, res) => res.status(404).send('404 Not found'));
// app.listen(process.env.PORT, () => console.log(process.env.PORT));
app.listen(80, () => console.log("Server is running"));