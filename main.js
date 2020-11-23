//install libs
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//declare const
const cart = [
	{ id: 1, name: 'apple', quantity: 6 },
	{ id: 2, name: 'pear', quantity: 3 },
	{ id: 3, name: 'banana', quantity: 66 },
	{ id: 4, name: 'peach', quantity: 23 },
	{ id: 5, name: 'watermelon', quantity: 1 },
	{ id: 6, name: 'pineapple', quantity: 45 },
	{ id: 7, name: 'orange', quantity: 32 },
];

//declare env
const PORT =
	(parseInt(process.argv[2]) > 1024 && parseInt(process.argv[2])) ||
	(parseInt(process.env.PORT) > 1024 && parseInt(process.env.PORT)) ||
	3000;

//declare express instance
const app = express();

// allow CORS
app.use(cors());

//return cart data in json
app.get('/cart', (_req, res) => {
	res.format({
		'application/json': () => {
			res.status(200);
			res.type('application/json');
			res.json(cart);
		},
		default: () => {
			res.status(406);
			res.type('text/plain');
			res.send('406 Not Acceptable');
		},
	});
});

app.get('/cart/:id', (req, res) => {
	res.format({
		'application/json': () => {
			res.status(200);
			res.type('application/json');
			res.json(cart.find(({ id }) => id === parseInt(req.params.id)) || {});
		},
		default: () => {
			res.status(406);
			res.type('text/plain');
			res.send('406 Not Acceptable');
		},
	});
});

app.put('/cart/:id', express.json(), (req, res) => {
	console.log(req.body);
});

app.listen(PORT, () => {
	console.log(`App started on ${PORT} at ${new Date()}`);
});
